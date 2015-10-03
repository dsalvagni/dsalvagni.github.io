---
layout: post
title:  "Start by don't repeating yourself in CSS"
date:   2015-10-03 14:50:00
categories: Front-end CSS
---
CSS is a convenient programming language, we can be as lazy developer as we want and it will still works. I assume that you know what the results will be if you choose the lazy way. We share techniques and philosophy with software engineering principles, like [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), [Single Responsibility](https://en.wikipedia.org/wiki/Single_responsibility_principle), [Open/closed principal](https://en.wikipedia.org/wiki/Open/closed_principle), [Separations of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) among others. DRY is a useful principle to get start with in CSS if you aren't yet.

First of all, we must be aware that DRY is used to keep code maintenance easy and simple as its main activity. It is not about the amount of code, which could be easily confused. The bases of DRY is that you shouldn't make the same change several times. This is one thing that makes a code hard to maintain. If you have the same piece of code duplicated all along of your application, every time you need to make a change, you'll need to remember - or read a document of, which I don't see as a good practice - where those declarations are used too. It's painful to have to work like this, you must know.

However, it doesn't mean that you can't have CSS declarations repeated coincidentally. Sometimes you will have and you won't need to refactor it. Don't overthink about it. Repetition is better than the wrong abstraction.

### Wrong abstraction
Below is an example which is easy to see where you won't need to try to dry it out. These three css classes are sharing the same `font-weight: bold;` declaration, which isn't related with them, it is purely coincidental. Trying abstract the common declaration between them will makes worst to maintain because it will easily obfuscate what are the impacts that a change could make. 
{% highlight css %}
.page-title {
    font-size: 32px;
    font-weight: bold;
}
.btn {
    font-size: 14px;
    font-weight: bold;
}
.form-label {
    font-weight: bold;
}
{% endhighlight %}

### Abstracting with [SASS](http://sass-lang.com/) `mixin`
[SASS](http://sass-lang.com/) is a powerful CSS preprocessor which I like to work with. I've been working with LESS for the past years, but now SASS is my current option. I think that SASS might have been the "current CSS" if CSS had been designed to build large web applications. If you don't use a CSS preprocessor you must start to use one.

Below is our SCSS file before DRY-ing it out.
{% highlight css %}
.page-title 
{
    font-family: 'OpenSans', sans-serif;
    font-weight: bold;
    font-size: 32px;
    color: #333;
}
.feed-title
{
    font-family: 'OpenSans', sans-serif;
    font-weight: bold;
    font-size: 16px;
    text-decoration: underline;
}
.btn
{
    font-family: 'OpenSans', sans-serif;
    font-weight: bold;
    font-size: 16px;
    display: inline-block;
    padding: 5px 10px;
    text-align: center;
}
{% endhighlight %}

Here's an approach using DRY principles.
{% highlight css %}
@mixin primary-font() {
    font-family: 'OpenSans', sans-serif;
    font-weight: bold;
}

.page-title 
{
    font-size: 32px;
    color: #333;
    @include primary-font();
}
.feed-title
{
    font-size: 16px;
    text-decoration: underline;
    @include primary-font();
}
.btn
{
    font-size: 16px;
    display: inline-block;
    padding: 5px 10px;
    text-align: center;
    @include primary-font();
}
{% endhighlight %}

Notice that we are repeating the mixin all along the example and it is ok doing this way because we aren't repeating our CSS declarations. So, when a change is required we still have just one place to make the change, what makes this DRY approach effective.

### DRY CSS with pure CSS
We can refactor our CSS code to dry it out without using a CSS preprocessor, as well. One great example is for a collection of icons which are organized in a single image file and we use the CSS sprites approach to get them. 

##### Original code
{% highlight css%}
.icon-disk {
    background: url('../img/icon-sprites.png') no-repeat 0 0;
}
.icon-times {
    background: url('../img/icon-sprites.png') no-repeat -18px 0;
}
.icon-trash {
    background: url('../img/icon-sprites.png') no-repeat -32px 0;
}
{% endhighlight %}

How we use it on HTML.
{% highlight html %}
    <i class="icon-disk"></i>
{% endhighlight %}


##### Refatoring it
{% highlight css%}
.icon {
    background-image: url('../img/icon-sprites.png');
    background-repeat: no-repeat;
}
.icon-disk {
    background-position: 0 0;
}
.icon-times {
    background-position: -18px 0;
}
.icon-trash {
    background-position: -32px 0;
}
{% endhighlight %}

How we use it on HTML.
{% highlight html %}
    <i class="icon icon-disk"></i>
{% endhighlight %}

---

This was a very simple explanation about using the DRY principle in your CSS files. If you aren't aware about it, I hope it was useful for you. Take a look on this post's reference to read more about it.

---

### References
> - [Don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
> - [CSS Guidelines - Dry](http://cssguidelin.es/#dry)
> - [Dry-in out your sass mixins](http://alistapart.com/article/dry-ing-out-your-sass-mixins)

