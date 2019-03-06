# CSS Grid Annotator

Automatically annotate CSS Grid items, so they are correctly positioned in IE11.

![Demo: before, after](demo.gif)

Input for the blog post (and this readme):

```txt
- cells = items):
Problem:
- Grid is Great to work with and Great to learn for junior front end developers. After having watched Wes Bos tutorial I was in love (see free alternative in mdn grid-template-columns#see_also)
- ie 10 & 11 support only an older specification (we only need to support IE11)
- among other shortcomings, ie requires explicit setting of the grid-column and grid-row or it will default to 1 and each grid cell will be slapped on top of each other
possibilities:
- annotate each cell with col & row manually -> cumbersome
- unfortunately we can not use Autoprefixer’s annotation feature, because it has no info on which element goes where and sometimes one element might even go into different cols/rows. https://github.com/postcss/autoprefixer/blob/master/README.md#grid-autoplacement-support-in-ie
- so we ended up writing a little js that is only executed when ie is detected. It reads the computed style of all elements and then uses this info to annotate.
- what is supported... (not repeat, fitcontent, etc. because IE does not understand it anyway)
- event: we need to use load, because we need to access the calculated styles which are only available after the styles were loaded
```

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
