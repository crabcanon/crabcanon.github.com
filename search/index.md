---
layout: post
---

<section id="search-results">
	<h4>Search Results.</h4>
	<div class="entries"></div>
</section>
{% raw %}
<script id="search-results-template" type="text/mustache">
  <ul class="list">
  {{#entries}}
  	<li class="" style="margin-bottom: 20px;">
  		<a href="{{ url }}">
      	{{ title }}
    	</a>
    </li>
  {{/entries}}
  </ul>
</script>
{% endraw %}
