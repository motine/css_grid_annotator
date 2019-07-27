// CSS Grid Annotator for IE 11
//
// Version: 0.2.1
// Author: Tom Rothe
// URL: https://github.com/motine/css_grid_annotator
//
// Please see notes in README.md.
// NOTE: This annotation is quite expensive (only for IE11), because check every element on the page for its display type.
//       Furthermore, for each grid container we look through all style definitions.
/* eslint-disable */
function cssGridAnnotate() {
  // check if we have IE11
  var agent = navigator.userAgent;
  var isIE11 = (agent.indexOf("Trident") >= 0) && (agent.indexOf("rv:11") >= 0);
  if (!isIE11) {
    return;
  }

  var CSS_DISPLAY_GRID = "-ms-grid";
  var CSS_TEMPLATE_COLS = "-ms-grid-columns";
  var CSS_ROW = "-ms-grid-row";
  var CSS_COL = "-ms-grid-column";

  function annotateAll(parentElement) {
    // we have to go through every single element to check the computed style
    // this is very performance heavy
    var elements = parentElement.querySelectorAll("*");
    var elementsLength = elements.length;
    for (var i = 0; i < elementsLength; i++) {
      var elm = elements[i];
      if (isGridContainer(elm) && !containsAnnotations(elm)) { // we only check grid container, but we ignore the ones with pre-defined annotations
        annotateContainer(elm);
      }
    }
  }

  // it annotates the children with grid-column and grid-row, based on the grid-template-columns style attribute.
  function annotateContainer(container) {
    // determine columns
    var colCount = getTemplateColCount(container);
    if (!colCount) { return; }
    // annotate children
    var children = container.children;
    var childrenLength = children.length;
    for (var i = 0, visibleIndex = 0; i < childrenLength; i++) { // i: which child do currently address?, visibleIndex: how many children were visible up until now? these two only differ if there are hidden elements
      var child = children[i];
      if (isHiddenElement(child)) { continue; }
      child.style[CSS_COL] = (visibleIndex % colCount) + 1;
      child.style[CSS_ROW] = Math.floor(visibleIndex / colCount) + 1;
      visibleIndex++;
    }
  }

  function handleInsert(ev) {
    if ((ev.target) && (ev.target.parentElement)) {
      annotateAll(ev.target.parentElement);
    }
  }

  function isGridContainer(elm) {
    var styles = window.getComputedStyle(elm);
    return styles.display === CSS_DISPLAY_GRID;
  }

  function isHiddenElement(elm) {
    return (elm.type === "hidden") || (window.getComputedStyle(elm).getPropertyValue("display") === "none");
  }

  // returns true if any of the direct children has CSS_COL or CSS_ROW in their computed style.
  function containsAnnotations(elm) {
    var children = elm.children;
    var childrenLength = children.length;
    for (var i = 0; i < childrenLength; i++) {
      var child = children[i];
      var styles = window.getComputedStyle(child);
      if (styles.getPropertyValue(CSS_COL) != "1" || styles.getPropertyValue(CSS_ROW) != "1") { // IE will automatically determine that all elements are at (1, 1)
        return true;
      }
    }
    return false;
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
  window.addEventListener("DOMNodeInserted", handleInsert, false);
}

window.addEventListener("load", cssGridAnnotate);
