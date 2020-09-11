---
layout: layout/home
pagination:
    data: collections.post
    size: 6
    reverse: true
    alias: posts
permalink: "{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber | plus: 1 }}.html{% else %}index.html{% endif %}"
stories: false
---