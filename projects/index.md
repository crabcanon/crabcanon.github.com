---
layout: post
---

{% for post in site.posts %}
{% if post.categories[0] == "project" %}
<div class="demo-card-wide mdl-card mdl-shadow--2dp">
  <div class="mdl-card__title" style=" background: url('{{post.image}}') center / cover;">
    <h2 class="mdl-card__title-text grad">{{ post.title }}</h2>
  </div>
  <div class="mdl-card__supporting-text" style="border-top: 1px solid rgba(0,0,0,0.1);">
    {{ post.description }}
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      {{ post.duration }}
    </a>
    {% if post.link %}
    <a href="{{ post.link }}" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style="float: right;">
      Check it out
    </a>
    {% endif %}
  </div>
  
<!-- <div class="mdl-card__menu">
     <a href="{{ post.link }}" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
      <i class="material-icons" style="color: rgba(0,0,0,0.65);">&#xE895;</i>
    </a> 
</div> -->

</div>
{% endif %}
{% endfor %}