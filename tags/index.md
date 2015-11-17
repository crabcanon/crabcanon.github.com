---
layout: post
---

<p class="sidebar-title" style="margin-top: 0px;">Blogs by tags.</p>
<ul class="list">
{% for tag in site.tags %}
  <p class="blog-title">-- {{ tag[0] }} --</p>
  {% for post in tag[1] %}
  <li class="blog-li">
    <a href="{{ site.baseurl }}{{ post.url }}">
      {{ post.title }}
    </a><br />
    <small>{{ post.date | date_to_string }}</small>
  </li>
  {% endfor %}
{% endfor %}
</ul>
