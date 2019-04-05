# CSS Grid Annotator

Automatically annotate CSS Grid items, so they are correctly positioned in IE11.

![Demo: before, after](demo.gif)

Please check back under the releases tab for recent releases.

## Test Pages

Aside from the `css_grid_annotation.html` page, which is a test page in itself, we derived test pages in the `test-page` folder.
Use Chrome to save the full page to the folder (along with all assets)[^poly].
Leave the HTML in tact. Just open all CSS files and search for all occurrences of `grid-row:` and `grid-row:` (mind the colon, and also remove prefixed versions such as `-ms-grid-row:`).
This will change the style as if the page was styled without the annoying IE11 row/col annotations.

[^poly]: We assume that the [Babel Polyfill](https://babeljs.io/docs/en/babel-polyfill) is already included.

## Transpile

The script in `dist` is derived via copy past of the script in `css_grid_annotation.html` to the [Babel website](https://babeljs.io/repl).
Make sure to select `es2015` and `stage-2`.

## TODO

- Make sure it also works when we add new elements via Javascript.
