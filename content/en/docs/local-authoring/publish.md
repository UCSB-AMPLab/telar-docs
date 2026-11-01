---
title: Publish and maintain a local project
url: /docs/local-authoring/publish/
translationKey: docs-local-authoring-publish
type: guide
docs_draft: true
docs_section: local
---

# Publish and maintain a local project {#publish-and-maintain-a-local-project}

Keep the editable source and the published output distinct. Your source lets you revise the exhibition; the generated site is the edition visitors read.

## Publish through GitHub Actions {#publish-through-github-actions}

Confirm `url` and `baseurl` in the configuration. Enable GitHub Pages with **GitHub Actions** as its source.

Review the files you changed, commit the intended source files and push them to your repository. The template's deployment workflow processes content, generates media assets, builds the site and applies private-story encryption before deploying.

Open **Actions**, inspect the run and wait for successful deployment. Then test the public address. A local preview is not evidence that deployment finished.

Keep virtual environments, dependencies and temporary output out of the source commit. Review `git status` before committing.

## Publish to another static host {#publish-to-another-static-host}

The local helper generates IIIF addresses for its local preview. Do not upload that preview unchanged to a public host.

For a standalone deployment, first run the complete build pipeline, then regenerate hosted-image addresses with the full public site address and rebuild:

```bash
python3 scripts/build_local_site.py --build-only
python3 scripts/generate_iiif.py --base-url https://example.org/my-exhibition
bundle exec jekyll build
python3 scripts/encrypt_protected_stories.py
```

Replace the example address with the actual domain and path. Set `url` and `baseurl` to match. Upload the resulting `_site/` directory to your host after the encryption command succeeds. Check any destination-conflict warnings before treating the build as ready.

If you rebuild Jekyll afterwards, run encryption again before publishing private stories. See [private stories](/docs/site-features/private-stories/) for the full model.

## Keep a reproducible source copy {#keep-a-reproducible-source-copy}

Back up configuration, content, media and custom themes. Keep the dependency files and a note of the Telar version. External IIIF sources remain external dependencies; retain their catalogue and manifest addresses.

## Upgrade in a separate step {#upgrade-in-a-separate-step}

Back up or commit your current work, read the release notes and follow [upgrading Telar](/docs/setup/upgrading/). Review changes before publishing, then retest a representative image, story, panel, glossary entry and any private story.

Separate an upgrade from a large content revision where possible. That makes a failure easier to trace.
