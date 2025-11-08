---
title: Echo Reader | Complete List of SEO Posts, Insights & Guides
description: Browse all SEO-focused articles from Echo Reader. From technical audits to content strategies, discover modular insights to boost your search performance.
layout: layout.njk
permalink: "/blog/"
---

# All Posts

<div class="grid gap-2">
{% for post in collections.posts %}
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