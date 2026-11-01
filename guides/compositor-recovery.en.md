---
layout: docs
title: "Resolve problems and recover stories"
lang: en
permalink: /docs/the-compositor/troubleshooting/
docs_section: compositor
en_url: /docs/the-compositor/troubleshooting/
es_url: /guia/el-compositor/solucionar-problemas/
docs_draft: true
---

# Resolve problems and recover stories

First identify which version you are looking at: the editor's saved content, the files on GitHub or the built public site. Each has a different route to a correction.

## The editor changed but the site did not

Saving content keeps it in the Compositor. Publish the changes, then wait for the site's build to finish. If the publication succeeded but the build failed, read the build error rather than repeatedly publishing the same changes.

Check the repository and language in the header, then open the public address from the project. A browser tab may still show an older page; reload it after the successful build.

## An object or framing is wrong

Open the object and check its source address. A catalogue page is not an IIIF manifest. Use **Fetch Manifest** to check the address and verify the preview before adding a new object.

If the story shows the wrong image, select the intended object in that step. If it shows the right image at the wrong view, choose the correct document page where relevant, adjust the framing and use **Capture position**. Wait for the captured confirmation, then revisit the step.

## GitHub has different content

Use [Changes on GitHub](/docs/the-compositor/sync-updates/) and review the affected items. Choose which version to keep for each one. The review preserves editor-only unpublished work; it is not a command to discard everything in the editor.

If Google Sheets is enabled, check whether a build fetched content from the sheet. Decide which authoring method will supply future builds before editing both copies again.

## Restore an unlisted story

When story files exist on GitHub but are missing from the Compositor, **Start** can offer the convenor **Restore as drafts**.

Restoration reads those files and brings the stories into the editor as drafts. Read any warnings, open the restored story and inspect its steps and panel references before making it publishable.

**Ignore** dismisses this recovery route for the detected stories. It is not the same as deleting their files from GitHub.

## A control is missing or an action is refused

Check your project role and the [team and repository access guide](/docs/the-compositor/team/). Some controls belong to the convenor, and course membership controls come from the course.

For help, record the project address, the action you attempted, the visible error and whether the problem affects the editor, publication or build. Share those details with the maintainer or in a [Telar issue](https://github.com/UCSB-AMPLab/telar/issues). Exclude access keys and private content.
