# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal blog built with **Jekyll** and hosted on **GitHub Pages** (https://wangyubo.github.io). The blog contains personal essays, reading notes, and thoughts on culture, literature, philosophy, and technology, primarily in Chinese.

**Site Name**: 钰博的博客
**Author**: 王钰博 (Wang Yubo)
**URL**: http://muguangling.com
**Technologies**: Jekyll, Liquid templating, GitHub Pages

## Repository Structure

This is a standard Jekyll static site generator structure:

```
/
├── _config.yml          # Jekyll configuration and site settings
├── _posts/              # Blog posts in Markdown (95+ articles from 2016-2026)
├── _layouts/            # HTML templates (default, post, page, keynote)
├── _includes/           # Reusable HTML components (nav, footer, head)
├── css/                 # Stylesheets
├── js/                  # JavaScript files
├── img/                 # Images and header images
├── fonts/               # Web fonts
├── index.html           # Home page (paginated post list)
├── about.html           # About page
├── tags.html            # Tag archive page
├── 404.html             # Error page
├── feed.xml             # RSS feed
├── sw.js                # Service worker for PWA
└── pwa/                 # Progressive Web App assets
```

## Development Commands

### Local Development

```bash
# Preview the site locally
jekyll serve

# Preview with auto-rebuild on changes
jekyll serve -w

# Preview with drafts
jekyll serve --drafts

# Build the site (output to _site/)
jekyll build
```

### Using npm Scripts (from package.json)

```bash
# Preview built site with Python 3
npm run py3view

# Watch and rebuild + preview
npm run py3wa

# Git push to origin master with tags
npm run push
```

### Frontend Build (Grunt)

```bash
# Watch for changes and rebuild assets
grunt watch
```

## Creating New Posts

Posts live in `_posts/` and follow strict naming conventions:

**Filename Format**: `YYYY-MM-DD-title-in-english.md`

**Required Front Matter**:
```yaml
---
layout:     post
title:      文章标题
subtitle:   副标题（可选）
date:       YYYY-MM-DD
author:     钰博
header-img: img/image-name.jpg
catalog:    true
tags:
   - 标签1
   - 标签2
---
```

**Content**:
- Use Markdown (GitHub Flavored Markdown via kramdown)
- Headers start at `##` (since `#` is the post title)
- Code blocks support syntax highlighting via rouge

**Example**:
```markdown
---
layout:     post
title:      让世界去卷,我们来读诗
date:       2026-01-22
author:     钰博
header-img: img/190211_snow_3.jpg
catalog:    true
tags:
   - 诗歌
---

## 第一部分标题

文章内容...
```

## Site Configuration (_config.yml)

Key settings to be aware of:

- **Pagination**: 20 posts per page
- **Markdown**: kramdown (GFM input)
- **Syntax highlighting**: rouge (NOT pygments)
- **Permalink style**: pretty (e.g., `/2024/01/22/post-title/`)
- **Comments**: Gitalk enabled (currently disabled in config)
- **PWA**: Service worker enabled

**Important**: After changing `_config.yml`, you must restart `jekyll serve`.

## Layouts

Four main layouts in `_layouts/`:

1. **default.html** - Base layout with HTML structure
2. **page.html** - For standalone pages (about, tags, index)
3. **post.html** - For blog posts (includes catalog, tags, comments)
4. **keynote.html** - For presentation-style posts with iframes

All layouts use Liquid templating and include files from `_includes/`.

## Images and Assets

- **Header images**: Store in `img/` (e.g., `img/190211_snow_3.jpg`)
- **Avatar**: `img/mgl.jpg`
- **Post images**: Reference as `![alt text](/img/image.png)` or full URL
- **Fonts**: Webfonts in `fonts/`

## Deployment

**GitHub Pages automatically builds and deploys** when you push to the `master` branch.

**No manual build step required** - just commit and push:

```bash
git add .
git commit -m "commit message"
git push origin master
```

The site will rebuild automatically within 1-2 minutes.

## Common Tasks

### Adding a new blog post
1. Create `_posts/YYYY-MM-DD-title.md` with proper front matter
2. Write content in Markdown
3. Add header image to `img/` if needed
4. Test locally with `jekyll serve`
5. Commit and push to master

### Changing site settings
1. Edit `_config.yml`
2. Restart Jekyll server to see changes
3. Test thoroughly before pushing

### Updating navigation
1. Edit `_includes/nav.html`
2. Follow existing pattern for new links

### Modifying layout/design
1. Edit files in `_layouts/` and `_includes/`
2. Use Liquid templating syntax
3. Test across different pages

## Important Notes

- **Chinese content**: Most posts and UI text are in Chinese
- **No build artifacts in git**: The `_site/` directory is excluded (in `.gitignore`)
- **Progressive Web App**: Service worker enabled for offline access
- **Tags are manual**: No automatic tag generation - must be added to post front matter
- **Original theme**: Based on BY Blog theme (qiubaiying/qiubaiying.github.io)
- **Deprecated features**: Some package.json scripts reference old git workflows (gitcafe, boilerplate)

## Troubleshooting

### Jekyll build fails
- Check `_config.yml` syntax (YAML is whitespace-sensitive)
- Ensure post filenames match `YYYY-MM-DD-name.md` format
- Verify all front matter has closing `---`

### Posts don't appear
- Check filename date is not in the future
- Verify front matter has `layout: post`
- Ensure file is in `_posts/` directory

### Images don't load
- Use `/img/filename.jpg` (absolute path from site root)
- Verify image file exists in `img/` directory
- Check `_config.yml` baseurl setting

### Local preview looks different from GitHub Pages
- GitHub Pages uses specific gem versions
- Check you're using kramdown (not redcarpet)
- Verify rouge for syntax highlighting (not pygments)
