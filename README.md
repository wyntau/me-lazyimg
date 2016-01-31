### me-lazyimg

Yet another image lazyload directive for angular.

With this directive, you can lazyload image in document. You can also lazyload image in specific element which have the `overflow: auto` or `overflow:scroll` css style.

#### What directive this module have?

- lazy-container, add to the container
- lazy-src, add to image tag

#### Basic Usage
1. include me-lazyimg.js as dependence.

        var app = angular.module('myApp', ['me-lazyimg'])

2. add `lazy-container` in scrollable container.

        <div lazy-container>...</div>

3. instead `src` with `lazy-src`.

        <img lazy-src="{{imgUrl}}" alt="" />

4. All Done!

#### Optional Parameters
Additional parameters can be added, example:

         <img lazy-src="{{imgUrl}}" animate-visible="true" animate-speed="0.5s" alt="" />

The following is a list of all the additional parameters:

| Paramater | Remark | Value (Example) | Default Value |
| --- | --- | --- | --- |
| `animate-visible` | If set true, all images (include those initially visible)  will be animated. Please note that by default initial visible images will be displayed immediately without fading | "true" | "false" |
| `animate-speed` | The speed of the animation in seconds or milliseconds | "0.5s" | "1s" |

#### License
MIT