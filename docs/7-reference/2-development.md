---
layout: default
title: 7.2. Development
parent: 7. Reference
grand_parent: Documentation
nav_order: 2
lang: en
---

# Development Reference

Complete reference for local development, build commands, and troubleshooting.

## Prerequisites

### Required Software

- **Ruby 3.0+**: Jekyll runtime
- **Bundler**: Ruby dependency management
- **Python 3.9+**: IIIF generation and CSV processing
- **Git**: Version control

### Installation Guides

**macOS (Homebrew):**
```bash
brew install ruby python git
gem install bundler
```

**Ubuntu/Debian:**
```bash
sudo apt-get install ruby-full python3 python3-pip git build-essential
gem install bundler
```

**Windows:**
- Install [RubyInstaller](https://rubyinstaller.org/)
- Install [Python](https://www.python.org/downloads/)
- Install [Git for Windows](https://gitforwindows.org/)

## Project Setup

### Initial Setup

```bash
# Clone repository
git clone https://github.com/username/your-telar-site.git
cd your-telar-site

# Install Ruby dependencies
bundle install

# Install Python dependencies
pip install -r requirements.txt
```

### Configuration

Edit `_config.yml` for local development:

```yaml
baseurl: ""  # Empty for local development
url: "http://localhost:4000"
```

## Build Commands

### Core Commands

```bash
# Convert CSVs to JSON
python3 scripts/csv_to_json.py

# Generate IIIF tiles
python3 scripts/generate_iiif.py --source-dir components/images/objects --base-url http://localhost:4000

# Serve with live reload
bundle exec jekyll serve --livereload

# Build only (output to _site/)
bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean
```

### Command Options

**Jekyll Serve Options:**
```bash
# Serve on custom port
bundle exec jekyll serve --port 4001

# Serve on local network
bundle exec jekyll serve --host 0.0.0.0

# Incremental build (faster)
bundle exec jekyll serve --incremental

# Disable live reload
bundle exec jekyll serve
```

**IIIF Generation Options:**
```bash
# Specify different source directory
python3 scripts/generate_iiif.py --source-dir path/to/images

# Specify custom base URL
python3 scripts/generate_iiif.py --base-url https://mysite.org

# Process specific image only
python3 scripts/generate_iiif.py --image textile-001.jpg
```

## Development Workflow

### Daily Workflow

```bash
# 1. Start Jekyll server
bundle exec jekyll serve --livereload

# 2. Make changes to content
# - Edit CSVs in components/structures/
# - Edit markdown in components/texts/
# - Add images to components/images/objects/

# 3. Rebuild data (when CSVs change)
python3 scripts/csv_to_json.py

# 4. Regenerate tiles (when images change)
python3 scripts/generate_iiif.py

# 5. Jekyll auto-reloads browser
# Site updates automatically
```

### Working with Google Sheets Locally

For local development with Google Sheets:

1. Create `_config_local.yml`:
   ```yaml
   google_sheets:
     enabled: true
     shared_url: "YOUR_SHARED_URL"
     published_url: "YOUR_PUBLISHED_URL"
   ```

2. Fetch sheets manually:
   ```bash
   python3 scripts/fetch_google_sheets.py
   ```

3. Process as normal:
   ```bash
   python3 scripts/csv_to_json.py
   bundle exec jekyll serve
   ```

See [`docs/google_sheets_integration/README.md`](https://github.com/UCSB-AMPLab/telar/blob/main/docs/google_sheets_integration/README.md) in the main Telar repository for details.

## Directory Structure

```
your-telar-site/
├── _config.yml              # Site configuration
├── _data/                   # Generated JSON data
│   ├── objects.json
│   ├── project.json
│   └── stories/
├── _jekyll-files/           # Auto-generated collections
│   ├── _stories/
│   ├── _objects/
│   └── _glossary/
├── _layouts/                # Page templates
│   ├── default.html
│   ├── story.html
│   └── object.html
├── _includes/               # Reusable components
│   ├── header.html
│   └── footer.html
├── assets/                  # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── components/              # SOURCE CONTENT (edit here!)
│   ├── structures/          # CSV files
│   ├── images/objects/      # Source images
│   └── texts/               # Markdown files
├── iiif/                    # Generated IIIF tiles
├── scripts/                 # Build scripts
│   ├── csv_to_json.py
│   └── generate_iiif.py
└── _site/                   # Built site (don't edit!)
```

## Troubleshooting

### Common Issues

**Jekyll won't start:**
```bash
# Update dependencies
bundle update

# Clean and retry
bundle exec jekyll clean
bundle exec jekyll serve
```

**Changes not appearing:**
```bash
# Restart Jekyll (Ctrl+C, then restart)
bundle exec jekyll serve --livereload

# Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
```

**IIIF tiles not generating:**
```bash
# Check Python dependencies
pip install -r requirements.txt

# Verify image files exist
ls -la components/images/objects/

# Check for error messages
python3 scripts/generate_iiif.py --source-dir components/images/objects
```

**CSV to JSON conversion fails:**
```bash
# Check CSV syntax
cat components/structures/story-1.csv

# Verify markdown files exist
ls -la components/texts/stories/

# Run with verbose output
python3 scripts/csv_to_json.py --verbose
```

### Dependency Issues

**Bundle install fails:**
```bash
# Update RubyGems
gem update --system

# Clear bundle cache
bundle clean --force
bundle install
```

**Pip install fails:**
```bash
# Upgrade pip
pip install --upgrade pip

# Use virtualenv
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Performance Issues

**Slow build times:**
```bash
# Use incremental builds
bundle exec jekyll serve --incremental

# Disable IIIF regeneration if images haven't changed
# (Just don't run generate_iiif.py)

# Reduce file watching
echo "_site" >> .gitignore
```

**High memory usage:**
```bash
# Clean build artifacts
bundle exec jekyll clean
rm -rf _site/

# Restart Jekyll server
```

## Testing

### Local Testing Checklist

Before deploying:

- [ ] All pages load without errors
- [ ] Stories scroll smoothly
- [ ] IIIF viewer zooms correctly
- [ ] Object thumbnails display
- [ ] Navigation works
- [ ] Links are correct
- [ ] Mobile responsive
- [ ] Cross-browser compatible

### Browser Testing

Test in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Validation

```bash
# Check HTML validity
bundle exec htmlproofer ./_site --disable-external

# Check for broken links
bundle exec jekyll doctor
```

## Publishing

### Prepare for Publishing

```bash
# 1. Test locally
bundle exec jekyll serve

# 2. Update _config.yml for production
baseurl: "/your-repo-name"
url: "https://username.github.io"

# 3. Commit changes
git add .
git commit -m "Update content"

# 4. Push to GitHub
git push origin main

# 5. GitHub Actions builds automatically
```

### Manual Publishing

If not using GitHub Actions:

```bash
# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Publish _site/ directory to your host
```

## Best Practices

1. **Commit frequently**: Small, focused commits
2. **Test locally first**: Always preview before pushing
3. **Use branches**: Feature branches for major changes
4. **Document changes**: Clear commit messages
5. **Backup content**: Keep copies of important files
6. **Version control**: Track all content in git
7. **Clean builds**: Periodic `jekyll clean` helps

## Getting Help

- [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [IIIF Documentation](https://iiif.io/get-started/)

## Next Steps

- [GitHub Actions Reference](/docs/reference/github-actions/)
- [Customization Guide](/docs/customization/)
- [Configuration Reference](/docs/configuration/)
