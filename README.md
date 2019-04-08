# CSS Grid Annotator

Automatically annotate [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) items with row and column positions, so they are correctly positioned in IE11.

![Demo: before, after](demo.gif)

It looks through all elements on the page and checks if the `display` property equals `-ms-grid`.
If so it will annotate each visible child with explicit `-ms-grid-column` / `-ms-grid-row`.

Please check back under the releases tab for recent releases.

## Gotchas

- The script is only applied when IE11 is found.
- The script does checks only for the prefixed grid property `-ms-grid`.
- The script currently only supports `grid-template-columns`. This script does not work if there is only grid-template-rows specified.
- If there are more items/children specified than columns in the the template, new rows will be created.
- If there any of the children is annotated with an explicit `-ms-grid-column` or `-ms-grid-row`, the whole container will be skipped.
- Hidden elements are skipped (`type="hidden"` or `display: none`).

## TODO

- Make sure it also works when we add new elements via Javascript.
