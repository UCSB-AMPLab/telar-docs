---
layout: docs
title: 2.3. Upgrading Telar
parent: 2. Set Up Your Site
grand_parent: Documentation
nav_order: 3
lang: en
permalink: /docs/setup/upgrading/
---

# Upgrading Telar

Keep your Telar site up to date with the latest features, bug fixes, and improvements.

## Overview

Telar v0.3.4 introduced an automated upgrade system that makes updating your site simple and safe. The upgrade process depends on which version you're currently running:

- **v0.3.4 or later**: Use the automated upgrade workflow (one-click upgrades)
- **v0.2.0 to v0.3.3**: Manual setup required first (one-time only)

## Automated Upgrades (v0.3.4+)

If your site is already running Telar v0.3.4 or later, upgrading is fully automated.

### How It Works

The upgrade system:
1. Detects your current Telar version from `_config.yml`
2. Applies all necessary migrations incrementally (e.g., v0.3.4 → v0.3.5 → v0.3.6). Note: there is a known gap in the migration chain at v0.4.2-beta — sites pinned at that exact version may not upgrade cleanly. A fix is in progress; if you are affected, [open an issue](https://github.com/UCSB-AMPLab/telar/issues).
3. Updates framework files and configurations
4. Creates an upgrade branch and issue with detailed summary
5. Highlights any manual steps you need to complete

### Running an Automated Upgrade

{: .note }
> **Forked repositories only**: If you forked your site from another repository, you'll need to enable issues in your repository settings (**Settings** → **General** → check **Issues**). Sites created using the "Use this template" button already have issues enabled.

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Select the **"Upgrade Telar"** workflow from the left sidebar
4. Click **Run workflow** (green button on the right)
5. Click the green **Run workflow** button in the dropdown
6. Wait for the workflow to complete (usually 1-2 minutes)
7. Review the automatically created upgrade issue
8. Click the link in the issue to create a pull request
9. Review changes and merge the pull request to complete the upgrade

{: .note }
> **Safe and Reversible**
> The upgrade creates an issue and branch, giving you full control. Review the changes via the compare link, create a PR when ready, and merge only after verification.

### After Upgrading

1. Visit your site to verify it's working correctly
2. **Check the upgrade issue** for any manual steps (visible in the "After Merging" section)
3. If you have custom themes or modifications, test them thoroughly
4. **Close the upgrade issue** once everything is working - this marks the upgrade as complete
5. If you encounter issues, check the [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues) or report a bug

### v1.4.0 Upgrade Notes

v1.4.0 is a runtime-only upgrade. Existing stories, objects, and configuration continue to work unchanged — no CSV edits, no config changes, and no workflow updates are required.

**Viewer change — Tify replaced by OpenSeadragon:**

The IIIF image viewer has changed from Tify (loaded from a CDN) to a custom OpenSeadragon wrapper (vendored locally). For most sites this is invisible: IIIF images continue to display and zoom. If your site has a customized `_sass/_viewer.scss` that overrode Tify styles, those overrides are now inert and can be removed, but they will not break the build.

**Language pack — six new `object.viewer.*` keys:**

Six new keys are added to the built-in language files (`en.yml` and `es.yml`): `object.viewer.prev_page`, `object.viewer.next_page`, `object.viewer.page_input_label`, `object.viewer.page_input_aria`, `object.viewer.image_unavailable_title`, and `object.viewer.image_unavailable_detail`. These drive the multi-page pagination chrome and the error fallback UI in the new viewer.

If you have a customized language file (a copy of `en.yml` or `es.yml` with your own translations), you will need to add these six keys manually after upgrading, or the viewer pagination and error messages will fall back to the built-in English strings. Copy the values from the updated `_data/languages/en.yml` (or `es.yml`) in the Telar repository and translate as needed.

**If you only use GitHub's web interface:**

No manual steps are required. The upgrade handles all file replacements automatically.

### v1.3.0 Upgrade Notes

v1.3.0 fixes i18n coverage across the site and introduces a sister-file convention for localizing user pages. No CSV changes are required.

**Automated content migration — hash-gated page rewrites:**

The upgrade migration rewrites four user-content files (`index.md`, `pages/glossary.md`, `pages/objects.md`, `telar-content/texts/pages/about.md`) to use the new lang-key templates — but only if each file is byte-for-byte identical to the v1.2.1 default. Any customized content is preserved untouched. For Spanish-language sites whose `about.md` is unchanged from the v1.2.1 default, the migration also creates `telar-content/texts/pages/acerca.md` automatically.

**New language keys — `lang.index_page.welcome` and `lang.pages.glossary_intro`:**

Two new keys are added to the built-in language files. If you have a customized language file, you do not need to add them immediately — the layouts use fallback guards — but adding them gives you control over the homepage welcome text and glossary intro sentence in the site's active language.

**If you only use GitHub's web interface:**

No manual steps are required beyond reviewing the automatically created upgrade issue for any files flagged as not matching the default (meaning your customizations were detected and preserved).

### v1.2.1 Upgrade Notes

v1.2.1 is a patch release. No manual steps are required.

The upgrade fixes a silent failure in the demo content fetch script that affected sites whose `_config.yml` carried a v-prefixed version string (e.g. `version: "v1.2.0"`). If your site showed no demo content after a previous upgrade, this patch resolves it. No config edits are needed; the fix is in the build script.

### v1.2.0 Upgrade Notes

v1.2.0 adds a section table of contents, a Back to Start button, and in-story navigation. No manual steps are required.

All new features activate automatically. The section TOC is opt-in per story: add `show_sections: yes` to a story's row in `project.csv` (or `mostrar_secciones: si` for Spanish-language sites) to display it. Sites without this column continue to work without any CSV changes.

**If you only use GitHub's web interface:**

No action required.

### v1.1.0 Upgrade Notes

v1.1.0 adds deep linking, title cards, collection mode, bibliography styling, and a share panel position tab. No manual steps are required.

Deep linking and the updated share panel activate automatically. Collection mode is opt-in: set `collection_mode: true` in `_config.yml` to switch the homepage layout. The default is `false`, so existing sites are unaffected. Title cards use existing CSV rows with an empty object field — no new columns required. Bibliography styling is a new markdown widget (`:::bibliography`) available in panel content.

**If you only use GitHub's web interface:**

No action required.

### v1.0.0-beta Upgrade Notes

v1.0.0-beta adds multimedia support (video and audio objects), an updated build pipeline, and renames the `object_type` CSV column to `medium`.

**Manual step — update the build workflow:**

The `build.yml` workflow has new steps for audio processing, Node.js setup, and JavaScript bundling. Copy the latest version from the Telar repository:

1. Open [build.yml on GitHub](https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/build.yml)
2. Click **Copy raw contents**
3. In your repository, navigate to `.github/workflows/build.yml` and click **Edit**
4. Select all and replace with the copied contents
5. Commit the change

**Manual step — install Node.js dependencies (local development only):**

If you develop locally, run `npm install` in your repository after upgrading. This installs the JavaScript dependencies required by the new build pipeline (lenis, @vimeo/player, esbuild, vitest).

**Optional — audio support:**

If your site includes audio objects, install `ffmpeg` and `audiowaveform` for clip extraction and waveform peak data:

- **macOS:** `brew install ffmpeg audiowaveform`
- **Ubuntu:** `sudo apt install ffmpeg audiowaveform`

Sites without audio objects do not need these tools. GitHub Actions installs them automatically when audio files are detected.

**Column rename — `object_type` to `medium`:**

The `object_type` column in `objects.csv` has been renamed to `medium`. This change is backward compatible — the old column name is still accepted.

**If you only use GitHub's web interface:**
- Copy the updated `build.yml` as described above. No other manual steps are required.

### v0.7.0 Upgrade Notes

v0.7.0 adds Node.js as a requirement for local development builds:

**New requirement for local development:**
- **Node.js 18+** is now required to run `bundle exec jekyll build` or `bundle exec jekyll serve`
- This enables JavaScript module bundling via esbuild during the build process
- **GitHub-based workflows are not affected** — GitHub Actions already includes Node.js

**If you develop locally:**
1. Install Node.js 18+ ([nodejs.org](https://nodejs.org/))
2. Run `npm install` in your repository to install JavaScript dependencies
3. Then proceed with normal Jekyll commands

**If you only use GitHub's web interface:**
- No action required — your site will continue to build automatically

## Manual Setup for Earlier Versions

If your site is running **v0.2.0 through v0.3.3**, you'll need to add the upgrade workflow files to your repository first. This is a **one-time setup**—after this, all future upgrades will be automated.

### Step 1: Add the Upgrade Workflow File

You need to add **two files** to enable automated upgrades: the upgrade workflow and the updated build workflow. The upgrade workflow will automatically fetch all necessary scripts when it runs.

#### Method A: GitHub Web Interface (Recommended)

Work entirely in the browser without installing anything:

1. **Open the upgrade workflow in Telar**:
   - Go to [https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/upgrade.yml](https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/upgrade.yml)
   - Click the **Copy raw contents** button (📋 icon in the top-right corner)

2. **Create the file in your repository**:
   - Go to your repository on GitHub
   - Click **Add file** → **Create new file**
   - Enter the file path: `.github/workflows/upgrade.yml`
   - Paste the copied contents
   - Scroll down and click **Commit changes**
   - Add commit message: "Add automated upgrade workflow"
   - Click **Commit changes**

#### Method B: Desktop/Local Development

If you have your repository cloned locally:

1. **Download the workflow file from Telar**:
   ```bash
   curl -o .github/workflows/upgrade.yml https://raw.githubusercontent.com/UCSB-AMPLab/telar/main/.github/workflows/upgrade.yml
   ```

2. **Commit and push**:
   ```bash
   git add .github/workflows/upgrade.yml
   git commit -m "Add automated upgrade workflow"
   git push
   ```

{: .note }
> **That's it!** The workflow automatically downloads the latest upgrade scripts from the Telar repository each time it runs, so you don't need to copy any Python files manually.

### Step 2: Replace the Build Workflow File

If you're upgrading from **v0.2.0 through v0.3.3**, you also need to replace your `.github/workflows/build.yml` file with the latest version. This removes deprecated features (cron schedule and git push step) that are no longer needed in v0.3.4+.

#### Method A: GitHub Web Interface (Recommended)

Work entirely in the browser:

1. **Open the build workflow in Telar**:
   - Go to [https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/build.yml](https://github.com/UCSB-AMPLab/telar/blob/main/.github/workflows/build.yml)
   - Click the **Copy raw contents** button (📋 icon in the top-right corner)

2. **Replace the file in your repository**:
   - Go to your repository on GitHub
   - Navigate to `.github/workflows/build.yml`
   - Click the **Edit** button (pencil icon)
   - Select all content (Ctrl+A or Cmd+A) and delete
   - Paste the copied contents
   - Scroll down and click **Commit changes**
   - Add commit message: "Update build workflow to v0.3.4"
   - Click **Commit changes**

#### Method B: Desktop/Local Development

If you have your repository cloned locally:

1. **Download the workflow file from Telar**:
   ```bash
   curl -o .github/workflows/build.yml https://raw.githubusercontent.com/UCSB-AMPLab/telar/main/.github/workflows/build.yml
   ```

2. **Commit and push**:
   ```bash
   git add .github/workflows/build.yml
   git commit -m "Update build workflow to v0.3.4"
   git push
   ```

{: .note }
> **Optional Step**: If you skip this step now, the upgrade summary will include instructions to update build.yml manually after your first upgrade. However, doing it now ensures a smoother upgrade experience.

### Step 3: Run Your First Automated Upgrade

That's all the setup needed! Now follow the [Automated Upgrades](#automated-upgrades-v034) instructions above to upgrade to the latest version.

The workflow will automatically:
1. Download the latest upgrade scripts from the Telar repository
2. Detect your current version
3. Apply all necessary migrations
4. Create a pull request with the upgraded files

## Troubleshooting

### Upgrade Workflow Not Appearing

**Problem**: The "Upgrade Telar" workflow doesn't appear in the Actions tab.

**Solution**:
- Make sure you've committed the `.github/workflows/upgrade.yml` file
- Refresh the Actions tab in your browser
- Check that the YAML file is valid (no syntax errors)

### Upgrade Fails with Error

**Problem**: The upgrade workflow fails with an error message.

**Solution**:
- Check the workflow logs in the Actions tab for details
- Verify your `_config.yml` has a `telar.version` field
- The workflow downloads scripts automatically, so network issues could cause failures
- If the error persists, [report an issue](https://github.com/UCSB-AMPLab/telar/issues) with the error message

### Issue Not Created

**Problem**: The upgrade completes but no issue is created.

**Solution**:
- Check if an issue already exists with title "Upgrade Telar to [version]"
- Verify GitHub Actions has `issues: write` permission in your repository
- Check that issues are enabled in your repository settings
- Try running the workflow again

### Merge Conflicts

**Problem**: The upgrade PR has merge conflicts.

**Solution**:
- Review which files have conflicts
- If conflicts are in files you've customized (CSS, layouts), manually resolve them
- If conflicts are in framework files, the upgrade version should usually be preferred
- If unsure, [ask for help](https://github.com/UCSB-AMPLab/telar/issues)

## Version History

For a complete list of changes in each version, see the [Changelog](https://github.com/UCSB-AMPLab/telar/blob/main/CHANGELOG.md) in the Telar repository.

## Need Help?

- **Documentation**: [telar.org/docs](https://telar.org/docs)
- **Example Site**: [telar.org/demo](https://telar.org/demo)
- **Report Issues**: [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues)
