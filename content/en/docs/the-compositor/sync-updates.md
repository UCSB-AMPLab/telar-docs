---
title: Sync and Updates
url: /docs/the-compositor/sync-updates/
translationKey: docs-the-compositor-sync-updates
type: guide
docs_section: compositor
---

# Sync and Updates {#sync-and-updates}

The Compositor checks for changes made on GitHub as well as available Telar updates. A change made outside the editor needs review before it is applied to your draft.

## On return detection {#on-return-detection}

When you open a connected project, the Compositor checks its repository. If GitHub has changed, follow the review prompt. The review covers the affected objects, stories, settings, glossary terms and pages.

## Re-sync {#re-sync}

The **Changes on GitHub** review shows what differs and asks which version to keep where a choice is needed.

1. Read each change and its consequence.
2. Choose GitHub's version or the Compositor's version, as appropriate.
3. Resolve the choices the review requires.
4. Choose **Apply these choices** when the result is the one you intend.

Keeping the Compositor's version means the next publish sends that version to GitHub. Taking GitHub's version applies the corresponding content to the Compositor. Unpublished changes made only in the Compositor are kept.

{{< callout "note" >}}
Sync review and publishing are separate actions. Review the consequences shown for each item; do not use re-importing as a routine way to undo a small editing mistake.
{{< /callout >}}

If files cannot be read or the repository changes while you are reviewing, follow the message and refresh the comparison before applying it.

## Version detection {#version-detection}

The Compositor checks the version of Telar used by your site and may ask you to upgrade before continuing.

## Upgrade page {#upgrade-page}

Review the current and target versions, release notes and grouped file changes. An upgrade can update framework files and migrate settings needed by the new version. Read the proposed changes before accepting them.

{{< media id="upgrade" >}}

## One-click upgrade {#one-click-upgrade}

Follow the upgrade controls, wait for the operation and site build to complete, then follow the return link. Check the site before continuing with the work that prompted the upgrade.

Your repository's history records the changes made by the upgrade. If something does not look right, use the build information and the proposed file list to understand what changed.

## See also {#see-also}

- [Publishing](/docs/the-compositor/publishing/)
- [Start and navigation](/docs/the-compositor/dashboard/)
- [Connect an existing site](/docs/the-compositor/getting-started/)
- [Upgrading Telar](/docs/setup/upgrading/) — Framework upgrade reference
