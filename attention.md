---
layout: page
title: 夺回注意力
description: "用认知科学讲清楚：注意力如何运作、为何在现代工作中崩溃、怎样基于证据重建。写给被分心困扰的知识工作者。"
permalink: /attention/
---

{% include book-css.html %}

{% assign bk = site.data.attention.zh %}
{% assign toc = site.attention | where: "lang", "zh" | sort: "order" %}

<div class="book-hero">
    <!-- 注意 mid-slash：baseurl 为空串时 prepend 出来的是相对路径，
         在 /attention/ 页面下会解析成 /attention/img/… 而 404。
         主题惯例是 baseurl 之后显式再补一个斜杠（见 _layouts/post.html:13），照抄。
         ⚠ 本注释里不要写 Liquid 定界符 —— HTML 注释挡不住 Liquid，写了就会被执行。 -->
    <img class="book-cover" src="{{ site.baseurl }}/{{ bk.cover }}" alt="《夺回注意力》封面">
    <div class="book-hero-text">
        <p class="book-tagline">{{ bk.title }}</p>
        <p class="book-meta">{{ bk.author }} 著 · 中文 · 试读版<br>全书 11 章，其中前言与第 1、2 章全文公开</p>
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
    <h3>完整版即将出版</h3>
    <p>{{ bk.cta }}</p>
</div>
