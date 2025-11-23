# Changelog

All notable changes to Telar Documentation will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- **Site logo configuration documentation** - How to add a logo to replace site title in header (5-configuration.md)

## [v0.5.0] - 2025-11-22

### Added

- **Embed mode documentation** - Complete guide for embedding Telar stories in external websites (2-workflows/5-embedding.md)
- **Embed reference documentation** - Technical reference for embed parameters and iframe integration (7-reference/4-embedding.md)
- Spanish translations for all embedding documentation

### Changed

- Updated IIIF integration guide with clarifications
- Updated GitHub Actions reference documentation
- Updated development reference with additional guidance

See the [main Telar CHANGELOG](https://github.com/UCSB-AMPLab/telar/blob/main/CHANGELOG.md#050-beta---2025-11-17) for full v0.5.0-beta feature list.

## [v0.4.1] - 2025-11-08

### Changed

- Updated documentation to reflect v0.4.1-beta framework release
- Updated version numbers across index and about pages (English and Spanish)
- Added supporter acknowledgments to all pages:
  - Caribbean Digital Scholarship Collective
  - Center for Innovative Teaching, Research, and Learning (CITRAL) at UC Santa Barbara
  - UCSB Library
  - Routes of Enslavement in the Americas University of California MRPI
  - Department of History of The University of Texas at Austin

See the [main Telar CHANGELOG](https://github.com/UCSB-AMPLab/telar/blob/main/CHANGELOG.md#041-beta---2025-11-08) for full v0.4.1-beta feature list (mobile responsive features restoration, object gallery mobile layout, multilingual coordinate picker).

## [v0.4.0] - 2025-11-07

### Added

- **Multilingual UI configuration guide** - Complete documentation for English/Spanish interface support (5-configuration.md)
- **Widget system documentation** - Carousel, tabs, and accordion widget usage with examples (3-content-structure.md)
- **IIIF metadata auto-population guide** - Automatic metadata extraction from IIIF manifests (4-iiif-integration.md)
- **Mobile optimization guide** - Comprehensive mobile responsiveness best practices (6-customization/4-mobile.md)
- **Theme creator attribution documentation** - How to add creator credits to custom themes (6-customization/1-themes.md)
- Spanish translations for all new v0.4.0 documentation

### Changed

- Updated configuration documentation with story interface settings
- Expanded content structure guide with glossary auto-linking syntax
- Enhanced IIIF integration guide with metadata extraction workflow

See the [main Telar CHANGELOG](https://github.com/UCSB-AMPLab/telar/blob/main/CHANGELOG.md#040-beta---2025-11-07) for full v0.4.0-beta feature list.

## [v0.3.3] - 2025-10-28

### Changed
- Updated documentation to reflect v0.3.3-beta changes
- Documented GitHub Actions workflow fix

## [v0.3.2] - 2025-10-28

### Added
- Markdown syntax reference documentation (English)
- Spanish translations for markdown syntax documentation
- Image sizing syntax documentation for panel content
- Documentation for index page customization

### Changed
- Updated documentation to reflect v0.3.2-beta changes

## [v0.3.1] - 2025-10-27

### Fixed
- Typos in themes documentation
- Improved descriptions in themes documentation

### Added
- JavaScript customization documentation
- Validation steps in development guide

## [v0.3.0] - 2025-10-26

### Added
- Initial bilingual Telar documentation site (English/Spanish)
- Manual bilingual structure without jekyll-polyglot plugin
- GitHub Actions workflow for automated Pages deployment
- Comprehensive Getting Started guide
- Workflows documentation:
  - GitHub Web Interface workflow
  - Local Development workflow
- Content Structure guide
- IIIF Integration guide
- Configuration guide
- Customization guide:
  - Themes documentation
  - Custom styling guide
- Reference documentation:
  - GitHub Actions reference
  - CSV format reference
  - Google Sheets integration guide
- Troubleshooting guide
- About page with project credits

### Changed
- Refactored key features section to use bullet points for improved readability
- Fixed navigation and button links to work with baseurl
- Updated baseurl and URL for ampl.clair.ucsb.edu/telar-docs deployment

### Infrastructure
- Set up Jekyll with Just the Docs theme
- Configured GitHub Pages deployment
- Implemented manual language switching system
- Added proper permalinks for Spanish content
