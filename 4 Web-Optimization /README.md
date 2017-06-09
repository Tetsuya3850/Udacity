# How to SetUp

1. Download this repo and unzip it.

2. Open pizza.html inside file called views to your browser.


# Changes in index.html

#### Mobile: 92
#### Desktop: 93

* inlined style.css
* Add media="print" to print.css link
* Removed Google Fonts
* Made google analytics script async
* Downloaded all images to img file.
* Resized pizzeria image (created a width 100 version.)
* Optimized all images with [Optimizilla](http://optimizilla.com/).
* Minified HTML, CSS with [HTML minifier](https://kangax.github.io/html-minifier/).


# Changes in views/js/main.js

### For scrolling

* function updatePositions()
Moved the calculation of scrollTop outside of the loop to a var. So that the calculation will only be done once.

* window.addEventListener('scroll', function()
In order for the visual change to occur in the right timing, added updatePositions to requestAnimationFrame.

* document.addEventListener('DOMContentLoaded', function()
Declared elem outside of the loop and simply assigned a new value to it inside.
Reduced the amount of sliding pizza from 256 down to 64. This will be enough to fill the screen even for 27 inch desktop screen.

### For resizing Pizza

* function changePizzaSizes(size)
Put dx and newWidth outside of the for loop so that it does not have to be calculated again and again.
Also, since the value of them are always the same, removed the 'all' and only took the first one.
Saved document.querySelectorAll(".randomPizzaContainer") to a var called cache so that it does not have to be calculated again and again.
Used getElementsByClassName rather then querySelectorAll. This is simply faster.

## Additional Materials
[Tips - Increasing Framerate (FPS)](https://classroom.udacity.com/nanodegrees/nd001/parts/00113454012/modules/273584856175462/lessons/5988439100/concepts/68776485930923#)
[Use requestAnimationFrame for visual changes](https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution#use_requestanimationframe_for_visual_changes)
