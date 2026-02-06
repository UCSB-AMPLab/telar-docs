---
layout: docs
title: 2.4. Upgrading Telar
parent: 2. Workflows
grand_parent: Documentation
nav_order: 4
lang: en
permalink: /docs/workflows/upgrading/
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
2. Applies all necessary migrations incrementally (e.g., v0.3.4 → v0.3.5 → v0.3.6)
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
