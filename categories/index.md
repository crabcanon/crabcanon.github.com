---
layout: post
---

<p class="sidebar-title" style="margin-top: 0px;">Blogs by categories.</p>
<ul class="list">
{% for cat in site.categories %}
  <p class="blog-title">-- {{ cat[0] }} --</p>
  {% for post in cat[1] %}
  <li class="blog-li">
    <a href="{{ site.baseurl }}{{ post.url }}">
      {{ post.title }}
    </a><br />
    <small>{{ post.date | date_to_string }}</small>
  </li>
  {% endfor %}
{% endfor %}
</ul>
