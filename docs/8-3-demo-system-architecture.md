---
layout: docs
title: "8.3. Demo System Architecture"
parent: "8. For Developers"
grand_parent: Documentation
nav_order: 3
lang: en
permalink: /docs/developers/demo-system/
---

# Demo System Architecture

Technical documentation for Telar's demo content fetching and integration system.

## Overview

The demo system provides pre-built example stories (telar-tutorial, paisajes-demo) that are automatically fetched from content.telar.org during the build process and merged with user content.

**Key components:**
- `scripts/fetch_demo_content.py` - Fetches demo bundle from remote server
- `scripts/csv_to_json.py` - Merges demo content with user content
- `_demo_content/` directory - Temporary storage (gitignored)
- `content.telar.org` - Demo content CDN

## Architecture Diagram

```
Build Process:
1. fetch_demo_content.py runs (if include_demo_content: true)
   ↓
2. Downloads telar-demo-bundle.json to _demo_content/
   ↓
3. csv_to_json.py runs
   ↓
4. load_demo_bundle() reads _demo_content/telar-demo-bundle.json
   ↓
5. merge_demo_content() integrates demos with user content
   ↓
6. Jekyll processes merged content
```

## Fetch Mechanism

### Configuration Check

`fetch_demo_content.py` first reads `_config.yml`:

```python
def should_fetch_demos():
    config = load_config('_config.yml')
    return config.get('story_interface', {}).get('include_demo_content', False)
```

If `include_demo_content: false` or unset:
- Script deletes `_demo_content/` directory
- Exits silently (no demos fetched)
- Build continues normally

### Version Matching Algorithm

The system fetches `versions.json` index to find compatible demo versions:

```json
{
  "versions": ["0.4.0", "0.5.0", "0.6.0"],
  "latest": "0.6.0"
}
```

**Matching logic:**
1. Read `telar.version` from `_config.yml` (e.g., "v0.6.0-beta")
2. Strip `-beta` suffix and `v` prefix → "0.6.0"
3. Find highest available version ≤ site version
4. Construct demo URL: `https://content.telar.org/demos/v{version}/{lang}/telar-demo-bundle.json`

**Example scenarios:**

| Site Version | Available Versions | Selected Version |
|--------------|-------------------|------------------|
| v0.6.0-beta | 0.4.0, 0.5.0, 0.6.0 | 0.6.0 |
| v0.5.5 | 0.4.0, 0.5.0, 0.6.0 | 0.5.0 |
| v0.7.0 | 0.4.0, 0.5.0, 0.6.0 | 0.6.0 |
| v0.3.0 | 0.4.0, 0.5.0, 0.6.0 | None (too old) |

### Language Selection

Language is determined by `telar_language` setting:

```python
def get_demo_language():
    config = load_config('_config.yml')
    return config.get('telar_language', 'en')
```

Maps to demo URLs:
- `en` → `/demos/v0.6.0/en/telar-demo-bundle.json`
- `es` → `/demos/v0.6.0/es/telar-demo-bundle.json`

### HTTP Fetching

```python
def fetch_demo_bundle(url):
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        log_error(f"Failed to fetch demos: {e}")
        return None
```

**Error handling:**
- Network failures: Script exits gracefully, build continues
- 404 errors: Script logs warning, build continues
- Timeout (30s): Script exits gracefully
- Invalid JSON: Script logs error, build continues

All errors are non-fatal. The site builds without demos if fetching fails.

## Bundle Structure

### Single-Bundle Format

As of v0.6.0, demos are delivered as a single JSON file:

```json
{
  "version": "0.6.0",
  "language": "en",
  "generated": "2025-11-28T10:00:00Z",
  "projects": [ ... ],
  "objects": [ ... ],
  "stories": {
    "telar-tutorial": [ ... ],
    "paisajes-demo": [ ... ]
  },
  "glossary": [ ... ]
}
```

### Projects Array

```json
"projects": [
  {
    "number": 1,
    "story_id": "telar-tutorial",
    "title": "Telar Tutorial",
    "subtitle": "Interactive Guide to Telar Features",
    "byline": "Start here to learn Telar"
  },
  {
    "number": 2,
    "story_id": "paisajes-demo",
    "title": "Paisajes Coloniales",
    "subtitle": "Colonial Cartography Excerpt",
    "byline": "Scholarly narrative example"
  }
]
```

### Objects Array

```json
"objects": [
  {
    "object_id": "demo-leviathan",
    "title": "Leviathan Frontispiece (1651)",
    "iiif_manifest": "",
    "iiif_source_url": "https://content.telar.org/iiif/demo-leviathan/info.json",
    "creator": "Abraham Bosse",
    "period": "1651",
    "credit": "Public Domain"
  }
]
```

**IIIF Auto-Population:**
- If `iiif_manifest` is empty and object is self-hosted
- `iiif_source_url` is populated with content.telar.org URL
- `csv_to_json.py` processes this the same as user objects

### Stories Object

```json
"stories": {
  "telar-tutorial": [
    {
      "step": 1,
      "object": "demo-tutorial-iiif",
      "x": 0,
      "y": 0,
      "zoom": 0,
      "question": "What is IIIF?",
      "answer": "...",
      "layer1_button": "Learn More",
      "layer1_file": "iiif-intro",
      "layer1_content": "# What is IIIF?\n\nIIIF (pronounced..."
    }
  ]
}
```

**Content Inclusion:**
- `layer1_content`, `layer2_content` include full markdown
- No file references to resolve
- Content is pre-processed and ready to merge

### Glossary Array

```json
"glossary": [
  {
    "term": "iiif",
    "title": "IIIF",
    "content": "# IIIF\n\nInternational Image Interoperability Framework..."
  }
]
```

## Content Merging

### Integration Point

`csv_to_json.py` handles merging:

```python
def main():
    # Load user content
    user_projects = process_project_csv()
    user_objects = process_objects_csv()
    user_stories = process_story_csvs()

    # Load and merge demo content
    demo_bundle = load_demo_bundle()
    if demo_bundle:
        merge_demo_content(demo_bundle, user_projects, user_objects, user_stories)

    # Write merged results
    write_json_files(user_projects, user_objects, user_stories)
```

### Merge Process

**Projects:**
```python
def merge_projects(user_projects, demo_projects):
    # User projects first, then demos
    merged = user_projects + demo_projects
    # Renumber if needed
    for i, project in enumerate(merged, 1):
        project['number'] = i
    return merged
```

**Objects:**
```python
def merge_objects(user_objects, demo_objects):
    # Simple concatenation, unique object_ids guaranteed
    return user_objects + demo_objects
```

**Stories:**
```python
def merge_stories(user_stories, demo_stories):
    # Demo stories written as separate JSON files
    for story_id, steps in demo_stories.items():
        write_story_json(f"{story_id}.json", steps)
```

**Glossary:**
```python
def merge_glossary(demo_glossary):
    # Written to _data/demo-glossary.json (not components/)
    write_json('_data/demo-glossary.json', demo_glossary)
```

### Widget Processing

Demo content undergoes full processing pipeline:

1. **Widgets**: Accordion, tabs, carousel syntax converted
2. **Image sizing**: Panel images processed for dimensions
3. **Markdown**: Full markdown-to-HTML conversion
4. **Glossary links**: `[term:glossary-term]` syntax converted

This happens in `csv_to_json.py` after merging.

### Demo Badges

Demo content is marked with `demo: true` flag:

```json
{
  "step": 1,
  "object": "demo-tutorial-iiif",
  "demo": true,
  ...
}
```

Templates check this flag to display badges:

```liquid
{% raw %}{% if step.demo %}
  <span class="demo-badge">{{ lang.demo.panel_badge }}</span>
{% endif %}{% endraw %}
```

## File System

### Directory Structure

```
_demo_content/               # Gitignored
└── telar-demo-bundle.json   # Downloaded bundle

_data/
├── demo-glossary.json       # Demo glossary (generated)
├── objects.json             # Merged objects
├── project.json             # Merged projects
├── telar-tutorial.json      # Demo story
└── paisajes-demo.json       # Demo story
```

### Gitignore Rules

```gitignore
# Demo content (ephemeral)
_demo_content/

# Demo glossary files
components/texts/glossary/_demo_*
_data/demo-glossary.json
```

Demo content never enters version control.

## GitHub Actions Integration

### Workflow Step

`.github/workflows/build.yml`:

```yaml
- name: Fetch demo content (if enabled)
  run: python3 scripts/fetch_demo_content.py
  continue-on-error: true

- name: Process CSV to JSON
  run: python3 scripts/csv_to_json.py
```

**Key points:**
- Runs before `csv_to_json.py`
- `continue-on-error: true` - Build continues if fetch fails
- Demo content ready for merge when CSV processing starts

## Error Handling

### Graceful Degradation

All demo fetch errors are non-fatal:

```python
try:
    bundle = fetch_demo_bundle(url)
    if bundle:
        save_bundle(bundle)
except Exception as e:
    logger.warning(f"Demo fetch failed: {e}")
    logger.info("Building without demo content")
    # No raise, no sys.exit()
```

Site builds successfully without demos.

### Common Errors

| Error | Cause | Behavior |
|-------|-------|----------|
| Network timeout | content.telar.org unreachable | Build continues, no demos |
| 404 Not Found | Version not available | Build continues, no demos |
| Invalid JSON | Malformed bundle | Build continues, no demos |
| Version mismatch | No compatible version | Build continues, no demos |
| Config syntax | Invalid YAML | Script may fail, build fails |

Only config syntax errors are fatal.

## Debugging

### Enable Verbose Logging

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Check Fetch Status

```bash
# Run fetch manually
python3 scripts/fetch_demo_content.py

# Check if bundle downloaded
ls -lh _demo_content/
cat _demo_content/telar-demo-bundle.json | python3 -m json.tool | head
```

### Verify Merge

```bash
# Check merged content
cat _data/project.json | grep -i demo
cat _data/objects.json | grep -i demo
ls -1 _data/*demo*.json
```

### Test Version Matching

```python
from scripts.fetch_demo_content import find_compatible_version

site_version = "0.6.0"
available = ["0.4.0", "0.5.0", "0.6.0"]
selected = find_compatible_version(site_version, available)
print(f"Selected: {selected}")  # Should be 0.6.0
```

## Performance

### Bundle Size

Typical bundle sizes:
- English bundle: ~200-300 KB (compressed)
- Spanish bundle: ~200-300 KB (compressed)

### Fetch Time

- Network fetch: 1-3 seconds (good connection)
- JSON parsing: <100ms
- Total overhead: 1-5 seconds added to build

### Caching

No caching currently implemented. Each build fetches fresh content.

**Future consideration:** Cache with TTL for local development.

## Security

### HTTPS Enforcement

All demo URLs use HTTPS:

```python
DEMO_BASE_URL = "https://content.telar.org"  # Not http://
```

### Content Validation

Basic validation on fetched bundle:

```python
def validate_bundle(bundle):
    required_keys = ['version', 'language', 'projects', 'objects', 'stories']
    return all(key in bundle for key in required_keys)
```

### No Code Execution

Demo content is data only (JSON). No executable code in bundles.

## Troubleshooting

### Demos Not Appearing

**Check configuration:**
```bash
grep include_demo_content _config.yml
# Should show: include_demo_content: true
```

**Check fetch log:**
```bash
python3 scripts/fetch_demo_content.py
# Look for errors or warnings
```

**Check bundle exists:**
```bash
ls _demo_content/telar-demo-bundle.json
# Should exist if fetch succeeded
```

### Version Mismatch

**Check versions.json:**
```bash
curl https://content.telar.org/versions.json
# Compare with your site version
```

**Check selected version:**
```bash
python3 scripts/fetch_demo_content.py --verbose
# Shows version selection logic
```

### Network Errors

**Test connectivity:**
```bash
curl -I https://content.telar.org/
# Should return 200 OK
```

**Check firewall:**
- GitHub Actions may block outbound HTTPS
- Check Actions logs for connection errors

## Related Documentation

- [Demo Content (User Guide)](/docs/customization/demo-content/) - User-facing documentation
- [GitHub Actions Reference](/docs/developers/github-actions/) - Build workflow details

---

**New in v0.6.0**: Automated demo fetching with version matching and language support.
