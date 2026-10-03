---
layout: docs
title: "8. For Developers"
parent: Documentation
nav_order: 8
has_children: true
lang: en
permalink: /docs/developers/
---

# For Developers

Technical documentation for developers, contributors, and those maintaining Telar forks.

## Who This Section Is For

This section is designed for:
- **Developers** building features or fixing bugs in Telar
- **Maintainers** of Telar forks for specific institutions
- **Contributors** wanting to understand Telar's architecture
- **Advanced users** troubleshooting build issues or customizing the framework

If you're a storyteller creating content for a Telar site, you probably want the main documentation sections instead.

---

## What's In This Section

### [8.1 Local Dev Setup](/docs/developers/local-development/)
Set up your development environment, run builds locally, and test changes before deploying.

### [8.2 GitHub Actions](/docs/developers/github-actions/)
Understand Telar's automated build workflow and how to customize the deployment pipeline.

### [8.3 Demo System Architecture](/docs/developers/demo-system/)
Learn how the demo content fetching system works, from version matching to bundle integration.

### [8.4 Embedding System](/docs/developers/embedding-system/)
Technical details of Telar's iframe embedding system and how it handles different contexts.

### [8.5 Advanced Styling](/docs/developers/styling/)
Customize Telar's styles with custom CSS, CSS variables and cascade layers.

### [8.6 Layouts and Small Screens](/docs/developers/mobile/)
How the story page chooses between its two layouts, and how the site adapts to small and short windows.

### [8.7 Story Engine Vocabulary](/docs/developers/story-engine/)
The terms the story engine's code and these docs use for a story's parts, its moves and its layouts.

---

## Contributing to Telar

Telar is open source and welcomes contributions. Before contributing:

1. **Set up local development** (8.1) to test your changes
2. **Understand the build system** (8.2, 8.3) to see how content is processed
3. **Follow the existing patterns** in the codebase
4. **Test thoroughly** before submitting pull requests

**Repository**: [UCSB-AMPLab/telar](https://github.com/UCSB-AMPLab/telar)

---

## Getting Help

- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues)
- **Discussions**: Ask questions in [GitHub Discussions](https://github.com/UCSB-AMPLab/telar/discussions)
- **Email**: Contact the maintainers for sensitive issues or institutional partnerships

---

## Quick Links

- [Main Documentation](/docs/) - User-facing docs for storytellers
- [Configuration Reference](/docs/configure/configuration/) - All _config.yml options
- [CSV Reference: Project](/docs/your-data/csv-project/) - CSV column documentation
