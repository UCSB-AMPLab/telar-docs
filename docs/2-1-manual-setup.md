---
layout: docs
title: 2.1. Manual Setup
parent: 2. Set Up Your Site
grand_parent: Documentation
nav_order: 1
lang: en
permalink: /docs/setup/manual/
---

# Manual Setup

Build a complete Telar exhibition in your browser using GitHub and Google Sheets. No software to install.

You will need:
- A [GitHub account](https://github.com/join) (free)
- A [Google account](https://accounts.google.com/) for Google Sheets (free)

---

## Part 1: Set Up All the Technical Bits

This part might feel daunting, but you only have to do it once. Once everything is set up, you won't need to come back here — everything else is creative work in your spreadsheet.

### Create Your Repository

A repository is your project's home on GitHub — it holds your images and configuration files.

1. Visit the [Telar template](https://github.com/UCSB-AMPLab/telar)
2. Click the green **Use this template** button
3. Choose **Create a new repository**
4. Give your repository a name — **use all lowercase letters and avoid spaces (hyphens are fine)** — this will be part of your site's web address
5. Click **Create repository**

![GitHub screenshot: Use this template button](/images/use-this-template.png)

### Enable GitHub Pages

GitHub Pages turns your repository into a live website for free.

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

![Setting up GitHub Pages with GitHub Actions](/images/github-actions.gif)

### Duplicate the Google Sheets Template

Your Google Sheets spreadsheet is where you manage all your content — objects, stories, and text.

1. Go to [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Click **File** → **Make a copy**
3. Save to your Google Drive with a descriptive name (e.g., "My Telar Exhibition")

### Share and Publish Your Sheet

Your spreadsheet needs two types of access so Telar can read it during builds.

**Share your sheet:**

1. Click the **Share** button in Google Sheets
2. Set access to "Anyone with the link" with **Viewer** permissions
3. Copy the shared URL

**Publish your sheet:**

1. Go to **File** → **Share** → **Publish to web**
2. Click **Publish**
3. Copy the published URL

### Configure Your Site

Edit the `_config.yml` file in your repository to connect everything:

1. Navigate to `_config.yml` and click the pencil icon to edit

2. **Site settings** — fill in your site's name and description:

   ```yaml
   title: "My Exhibition"
   description: "A visual narrative about..."
   author: Your Name
   ```

3. **Web address** — set your site's URL:

   ```yaml
   url: "https://yourgithubusername.github.io"
   baseurl: "/your-repository-name"
   ```

   Your site will be available at `https://yourgithubusername.github.io/your-repository-name`.

   {: .warning }
   > It is very important that your baseurl matches the name of your repository exactly. Baseurl must be in all lowercase, so if you gave your repository a name with capitals please go and change it now.

4. **Google Sheets** — paste in the URLs you copied:

   ```yaml
   google_sheets:
     enabled: true
     shared_url: "https://docs.google.com/..."
     published_url: "https://docs.google.com/..."
   ```

5. **Theme** (optional) — choose a visual theme:

   ```yaml
   telar_theme: "paisajes"  # Options: paisajes, neogranadina, santa-barbara, austin
   ```

6. Click **Commit changes** to save

![Editing config: title and URL](/images/config_title.gif)
![Editing config: theme](/images/config_theme.gif)

### Verify Your Setup

After committing, GitHub Actions will automatically build and publish your site. This takes 2–5 minutes.

1. Click the **Actions** tab to watch the build progress
2. When it finishes, visit your site at the URL you configured
3. You should see an empty Telar site with your title and theme

![Telar homepage with title and navigation menu](/images/telar-homepage.png)

{: .warning }
> If the build fails or your site doesn't look right, double-check your `_config.yml` carefully. Common mistakes:
> - **Unclosed quotes** — every `"` needs a matching `"`
> - **Missing space after colon** — write `title: "My Site"`, not `title:"My Site"`
> - **Wrong indentation** — nested settings like `shared_url` must be indented with spaces, not tabs
> - **Mismatched baseurl** — must match your repository name exactly, in all lowercase
> - **Only one Google Sheets URL** — you need both the shared URL and the published URL; they are different
>
> See the [Configuration Reference](/docs/configure/configuration/) for the full list of settings. You can also paste your `_config.yml` into the [Telar Config Validator](/docs/configure/config-validator/) to check for errors, or use the [Config Generator and Editor](/docs/configure/config-generator/) to build one from scratch.



## Next Steps

Your site is configured and running. Continue with the Getting Started tutorial:

- **[Add Your Content](/docs/getting-started/add-content/)** — Upload images, fill in your spreadsheet, and create your first story
- **[Review and Refine](/docs/getting-started/review-refine/)** — Set image coordinates, review your site, and polish
- **[Plan Your Narrative](/docs/getting-started/narrative-structure/)** — Understand how stories, steps, and panels fit together
