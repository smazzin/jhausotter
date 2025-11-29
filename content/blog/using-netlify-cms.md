---
title: Using Netlify CMS with Hugo
date: '2019-06-04T17:36:12-07:00'
description: Getting started with Netlify CMS...with Hugo.
pagetitle: Using Netlify CMS with Hugo
---
## Getting started with Netlify CMS...

Update: Since writing this post, Netlify CMS has since become Decap CMS. The information below is still relevant, but for the latest on Decap CMS, please visit their [official documentation](https://decapcms.org/docs/).

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
