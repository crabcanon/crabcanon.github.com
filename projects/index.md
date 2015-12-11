---
layout: post
---

{% for post in site.posts %}
{% if post.categories[0] == "project" %}
<div class="demo-card-wide mdl-card mdl-shadow--2dp">
  <div class="mdl-card__title" style=" background: url('{{post.image}}') center / cover;">
    <h2 class="mdl-card__title-text grad">{{ post.title }}</h2>
  </div>
  <div class="mdl-card__supporting-text">
    {{ post.description }}
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <a href="{{ post.url }}" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      Check details
    </a>
  </div>
  {% if post.link %}
  <div class="mdl-card__menu">
    <a href="{{ post.link }}" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
      <i class="material-icons" style="color: white;">launch</i>
    </a>
  </div>
  {% endif %}
</div>
{% endif %}
{% endfor %}