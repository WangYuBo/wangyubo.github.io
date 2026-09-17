---
layout: page
title: Take Back Your Attention
nav: false
description: "The cognitive science of how attention works, why it collapses in modern work, and how to rebuild it on evidence — for knowledge workers who can't stop getting distracted."
permalink: /attention/en/
---

{% include book-css.html %}

{% assign bk = site.data.attention.en %}
{% assign toc = site.attention | where: "lang", "en" | sort: "order" %}

<div class="book-hero">
    <!-- 注意 mid-slash，理由见 attention.md 同处注释 -->
    <img class="book-cover" src="{{ site.baseurl }}/{{ bk.cover }}" alt="Take Back Your Attention — cover">
    <div class="book-hero-text">
        <p class="book-tagline">{{ bk.title }}</p>
        <p class="book-meta">by {{ bk.author }} · English · free preview<br>11 chapters; the preface and Chapters 1–2 are online in full</p>
    </div>
</div>

<ul class="book-toc">
{% for ch in toc %}
    <li class="book-toc-item{% if ch.reading == 'stub' %} is-stub{% endif %}">
        <a href="{{ ch.url | prepend: site.baseurl }}"><span class="book-toc-label">{{ ch.chapter_label }}</span><span class="book-toc-title">{{ ch.title }}</span></a>
        {% if ch.reading == 'stub' %}<p class="book-toc-hook">{{ ch.hook }}</p>{% endif %}
    </li>
{% endfor %}
</ul>

<div class="book-cta">
    <h3>The complete book is coming</h3>
    <p>{{ bk.cta }}</p>
</div>
