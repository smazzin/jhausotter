---
title: Using Netlify CMS with Hugo
date: '2019-06-04T17:36:12-07:00'
description: Getting started with Netlify CMS...with Hugo.
pagetitle: Using Netlify CMS with Hugo
---
## Getting started with Netlify CMS...

The steps were pretty straightforward as outlined [here](https://www.netlifycms.org/docs/add-to-your-site/). The part that was confusing for me was mapping the front matter to the "fields" in the `config.yml.`

Below is what part of my config.yml looks like;

```
    fields: # The fields each document in this collection have
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Meta Description", name: "description", widget: "text"}
      - {label: "Page Title", name: "pagetitle", widget: "text"}
      - {label: "Image", name: "image", widget: "image", required: false}
      - {label: "Body", name: "body", widget: "markdown"}
```
