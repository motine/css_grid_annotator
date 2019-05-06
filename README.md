# CSS Grid Annotator

[CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) is great, but IE11 assumes that all items are in the first row and first column. Please check out this [blog post](http://tomrothe.de/posts/css_grid_and_ie11.html) by Valentina and me.
So, you have to add a lot of styles to explicitly position your grid items.
This script automatically adds the positioning attributes for IE11.

![Demo: before, after](demo.gif)

It looks through all elements on the page and checks if the `display` property equals `-ms-grid`.
If so it will annotate each visible child with explicit `-ms-grid-column` / `-ms-grid-row` based on `-ms-grid-columns` (`-ms-grid-rows` are ignored).

Please check back under the releases tab for recent releases.

## Gotchas

- The script is only applied when IE11 is found.
- The script does checks only for the prefixed grid property `-ms-grid`.
- The script currently only supports `grid-template-columns`. This script does not work if there is only grid-template-rows specified.
- If there are more items/children specified than columns in the the template, new rows will be created.
- If there any of the children is annotated with an explicit `-ms-grid-column` or `-ms-grid-row`, the whole container will be skipped.
- Hidden elements are skipped (`type="hidden"` or `display: none`).
- The script also annotates containers which are dynamically inserted via JavaScript. But, items are only annotated if a grid container is inserted, inserting individual items stay unannotated.

## More to do

- Consider template rows.
- Annotate items if they are dynamically added individually.

## Contribute

Please feel free to add issues, to contribute via pull requests or to reach out to [me](github@motine.de).
