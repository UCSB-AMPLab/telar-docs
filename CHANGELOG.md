# Changelog

All notable changes to Telar Documentation will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [v0.6.1] - 2025-12-01

### Fixed

- **Outdated URLs** - Updated "Need Help?" links from ampl.clair.ucsb.edu/telar-docs to telar.org
- **Broken internal links** - Removed non-existent `getting-started/planning/` and `/docs/developers/build-pipeline/` links
- **Directory structure documentation** - Updated all references from `components/images/objects/` to `components/images/` (v0.5.0 flattening), added pdfs/, audio/, 3d-models/ placeholder directories
- **Column name consistency** - Updated remaining `iiif_manifest` references to `source_url` (v0.5.0 rename)
- **Spanish index links** - Fixed broken relative paths in docs/index.es.md
- **Version history redundancy** - Replaced incomplete version history in upgrading pages with link to main CHANGELOG

## [v0.6.0] - 2025-11-28

### Added

- **Custom docs theme** - Replaced Just the Docs with a custom bilingual theme
- **Pagefind search** - Fast, bilingual static search with automatic language filtering
- **New landing page** - Bilingual landing page with video demo and sponsor acknowledgments
- **Version callout** - Documentation index pages now show current version with CHANGELOG link
- **Section 8: For Developers** - New developer-focused section with four subsections:
  - 8.1 Local Development workflow guide
  - 8.2 GitHub Actions reference (moved from Section 7)
  - 8.3 Demo System Architecture
  - 8.4 Embedding System Architecture
- **Story ID documentation** - Optional `story_id` column for semantic story names (7-reference/2-csv-reference.md)
- **Bilingual CSV documentation** - Spanish column headers and dual header row support (7-reference/2-csv-reference.md)
- **Object credits documentation** - Display object attribution in viewer with dismiss option (5-configuration.md)
- **Custom pages documentation** - Create user-editable pages with widgets and glossary support (3-content-structure.md, new 3-5-custom-pages.md)
- **Configurable navigation documentation** - Data-driven menu via navigation.yml (new 3-6-navigation.md)
- **Site logo configuration** - How to add a logo to replace site title in header (5-configuration.md)

### Changed

- **Documentation reorganization** - Split Section 7 into "Reference" (Section 7) and "For Developers" (Section 8)
- **Domain migration** - Site now hosted at telar.org (from ampl.clair.ucsb.edu/telar-docs)
- **URL structure** - Removed /telar-docs baseurl for cleaner URLs
- **Navigation** - Sidebar now filters by current language with toggle navigation
- **Active page highlighting** - Uses Paisajes purple accent for current page only (no parent highlighting)
- **Section 7: Reference** - Now focused on user reference material (CSV reference, markdown syntax)
- **CSV reference expanded** - Added optional columns, bilingual support, dual headers (7-reference/2-csv-reference.md)
- **Content structure updated** - Added custom pages and navigation sections (3-content-structure.md)
- Fixed hardcoded image paths in documentation
- Fixed internal cross-references to match new Section 8 structure

### Styling

- **Responsive layout** - Sidebar width and content width scale with viewport
- **Wide images** - Documentation images extend beyond text column (150px each side on large screens)
- **Search box** - Rounded corners matching Telar site style
- **Blockquote callouts** - Yellow background with gold border for better visibility
- **Navigation typography** - Larger font sizes (16px parent, 15px children), tighter line spacing

### Infrastructure

- Custom docs layout with inline CSS/JS (no external dependencies)
- Pagefind integration in GitHub Actions workflow
- Updated README with search development instructions
- Backwards-compatibility redirects at ampl.clair.ucsb.edu/telar-docs for all moved documentation

See the [main Telar CHANGELOG](https://github.com/UCSB-AMPLab/telar/blob/main/CHANGELOG.md#060-beta) for full v0.6.0-beta framework feature list.

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
