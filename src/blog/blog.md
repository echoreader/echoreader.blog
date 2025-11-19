---
title: Echo Reader | Complete List of SEO Posts, Insights & Guides
description: Browse all SEO-focused articles from Echo Reader. From technical audits to content strategies, discover modular insights to boost your search performance.
layout: layout.njk
permalink: "/blog/{{ pagination.pageNumber | plus: 1 }}/"
pagination:
  data: collections.posts
  size: 10
  alias: posts
  reverse: true
---

# All Posts

<div class="grid gap-2">
{% assign sorted = posts | sort: "date" | reverse %}
{% for post in sorted %}
  <div class="bg-white text-black border-2 border-solid border-black rounded-lg p-4 shadow-sm">
    <h2 class="text-xl font-bold mb-1">
      <a href="{{ post.url | toAbsoluteUrl }}" class="text-black no-underline hover:text-blue-600">
        {{ post.data.title }}
      </a>
    </h2>
    <small class="text-sm text-gray-500 block mb-1">{{ post.date | date }}</small>
    <p class="text-base text-gray-700">{{ post.data.excerpt }}</p>
  </div>
{% endfor %}
</div>

<!-- Pagination nav -->
<nav class="flex justify-center gap-2 mt-8">
  {% if pagination.href.previous %}
    <a href="{{ pagination.href.previous }}" class="px-3 py-1 rounded bg-gray-100 text-gray-800 hover:bg-gray-200">← Prev</a>
  {% endif %}

  {% for page in pagination.pages %}
  {% assign index = forloop.index0 %}
    <a href="{{ pagination.hrefs[index] }}" class="px-3 py-1 rounded {% if index == pagination.pageNumber %}bg-blue-600 text-white font-semibold{% else %}bg-gray-100 text-gray-800 hover:bg-gray-200{% endif %}">
      {{ index | plus: 1 }}
    </a>
  {% endfor %}

  {% if pagination.href.next %}
    <a href="{{ pagination.href.next }}" class="px-3 py-1 rounded bg-gray-100 text-gray-800 hover:bg-gray-200">Next →</a>
  {% endif %}
</nav>
