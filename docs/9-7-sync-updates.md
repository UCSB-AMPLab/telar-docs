---
layout: docs
title: "9.7. Sync and Updates"
parent: "9. The Compositor"
grand_parent: Documentation
nav_order: 7
lang: en
permalink: /docs/the-compositor/sync-updates/
---

# Sync and Updates

The Compositor keeps track of changes in your repository and Telar updates. When you return to a project, it checks whether anything has changed remotely and whether a newer version of Telar is available. This page explains how synchronization and upgrades work.

## On return detection

Each time you open the Compositor, it checks whether your GitHub repository has changed since your last session. Changes might come from another collaborator, from direct edits on GitHub, or from a previous session on a different device.

If the repository has not changed, you continue where you left off. If changes are detected, the Compositor prompts you to re-sync before editing.

## Re-sync

Re-syncing imports the latest content from your repository into the Compositor. This ensures you are working with the most current version of your objects, stories, and configuration.

During re-sync, the Compositor:

1. Reads the current state of your repository
2. Updates your local project to reflect any remote changes
3. Warns you if the remote changes conflict with unpublished local edits

{: .warning }
> If you have unpublished changes in the Compositor and the repository has also changed, the Compositor warns you about potential conflicts. Review the warning carefully — you may need to publish your local changes first or accept that the remote version will replace your unpublished edits.

## Version detection

The Compositor checks which version of Telar your site is running. If a newer version is available, it lets you know and offers to upgrade.

Version detection happens automatically when you open your project. If your site is already running the latest version, no action is needed.

## Upgrade page

When an upgrade is available, the Compositor shows an upgrade page with the details you need to make an informed decision:

- **Current version** — The version of Telar your site is currently running
- **Target version** — The latest available version
- **Release notes** — A summary of what changed in the new version — new features, improvements, and fixes
- **Grouped file changes** — A list of the Telar files that will be added, modified, or removed, organized by type

Review this information before proceeding. Upgrades update Telar's code in your repository but do not alter your content — your objects, stories, and configuration remain unchanged.

## One-click upgrade

When you are ready to upgrade, click the upgrade button. The Compositor commits the updated Telar files as a single atomic commit to your repository and tracks the resulting build, just like a regular publish.

After the upgrade completes and the build succeeds, the Compositor continues to the operation that was originally blocked by the version check. For example, if you were about to publish and the Compositor detected an outdated version, the upgrade runs first and then the publish proceeds.

{: .note }
> Upgrading updates only Telar's code files in your repository. Your content — objects, stories, images, and configuration — is never modified by an upgrade.

## See also

- [Publishing](/docs/the-compositor/publishing/) — How publishing and build tracking work
- [Dashboard](/docs/the-compositor/dashboard/) — Return to the project overview
- [Getting Started](/docs/the-compositor/getting-started/) — Initial setup and connecting a repository
