// CSS Grid Annotator for IE 11
//
// Author: Tom Rothe
// URL: https://github.com/motine/css_grid_annotator
//
// Please see notes in README.md.
// NOTE: This annotation is quite expensive (only for IE11), because check every element on the page for its display type.
//       Furthermore, for each grid container we look through all style definitions.
/* eslint-disable */
function cssGridAnnotate() {
  // check if we have IE11
  const agent = navigator.userAgent;
  var isIE11 = (agent.indexOf("Trident") >= 0) && (agent.indexOf("rv:11") >= 0);
  if (!isIE11) {
    return;
  }

  CSS_DISPLAY_GRID = "-ms-grid";
  CSS_TEMPLATE_COLS = "-ms-grid-columns";
  CSS_ROW = "-ms-grid-row";
  CSS_COL = "-ms-grid-column";

  function annotateAll(parentElement) {
    // we have to go through every single element to check the computed style
    // this is very performance heavy
    var elements = parentElement.querySelectorAll("*");
    for (var i = 0; i < elements.length; i++) {
      var elm = elements[i];
      if (isGridContainer(elm)) {
        annotateElement(elm);
      }
    }
  }

  // Based on the grid-template-columns style attribute, it annotates the children with grid-column and grid-row.
  function annotateElement(elm) {
    var colCount = getTemplateColCount(elm);
    if (!colCount) { return; }
    var children = elm.children;
    for (var i = 0, visibleIndex = 0; i < children.length; i++) { // i: which child do currently address?, visibleIndex: how many children were visible up until now? these two only differ if there are hidden elements
      var child = children[i];
      if (isHiddenElemeent(child)) { continue; }
      child.style[CSS_COL] = (visibleIndex % colCount) + 1;
      child.style[CSS_ROW] = Math.floor(visibleIndex / colCount) + 1;
      visibleIndex++;
    }
  }

  function isGridContainer(elm) {
    const styles = window.getComputedStyle(elm);
    return styles.display === CSS_DISPLAY_GRID;
  }

  function isHiddenElemeent(elm) {
    return (elm.type === "hidden") || (window.getComputedStyle(elm).getPropertyValue("display") === "none");
  }

  // returns the number of elements in a computed grid-template-columns attribute.
  // We do not need to consider functions such as repeat or minmax, because they are not supported by IE11 anyway (so either the autoprefixer resolves them or the style definition is broken for IE11 anyway).
  function getTemplateColCount(elm) {
    var styles = window.getComputedStyle(elm);
    var templateColumns = styles.getPropertyValue(CSS_TEMPLATE_COLS);
    if (!templateColumns) { return; }
    return templateColumns.split(" ").length;
  }

  annotateAll(document.body);
}

window.addEventListener("load", cssGridAnnotate);
