jQuery.aight
=========

Aight is a jquery plugin to display images in a lightbox.
You currently can show:

  - single images
  - group images
  - all images on the page 

Version
----

0.0.3

Usage
----
Add some links with pictures to your html
```html
<ul>
    <li><a class="yourClass" href="big-1.jpg"><img src="thumb-1.jpg"></a></li>
    <li><a class="yourClass" href="big-2.jpg"><img src="thumb-2.jpg"></a></li>
    <li><a class="yourClass" href="big-3.jpg"><img src="thumb-3.jpg"></a></li>
    <li><a class="yourClass" href="big-4.jpg"><img src="thumb-4.jpg"></a></li>
</ul>
```

Call the plugin
```javascript
$('a.yourClass').aight();
```

Configuration
----
You can easily customize the div id's of the lightbox
and use your own styling

```javascript
$('a.yourClass')({
    backdrop: 'aight-backdrop',
    closeButton: 'aight-close',
    carousel: false,
    carouselGroup: true,
    imageContainer: 'aight-container',
    imageDescription: 'aight-description',
    nextButton: 'aight-next',
    nextCharacter: '>',
    prevCharacter: '<',
    prevButton: 'aight-prev',
    wrapper: 'aight-wrapper'
});
```

License
----
"THE BEER-WARE LICENSE" (Revision 42):
<axlwaii@gmail.com> wrote this file. As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return.
