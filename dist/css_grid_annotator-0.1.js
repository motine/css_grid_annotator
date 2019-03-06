"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// NOTE: Unfortunately, we can not move this script to its own file because somehow the transpiling does not work then anymore.
//
// Only applied when IE11 is found.
// Annotates the children of elements that have display-type grid.
// Based on the grid-template-columns style attribute, it annotates the children with grid-column and grid-row.
// NOTE: This script does not work if there is only grid-template-rows specified, it needs grid-template-rows-columns.
// NOTE: This annotation is quite expensive (only for IE11), because check every element on the page for its display type. Furthermore, for each grid container we look through all style definitions.
var GridItemAnnotator =
/*#__PURE__*/
function () {
  function GridItemAnnotator() {
    _classCallCheck(this, GridItemAnnotator);
  }

  _createClass(GridItemAnnotator, null, [{
    key: "annotate",

    /* eslint-disable lines-between-class-members, no-console */
    value: function annotate() {
      if (!this.isIE11()) {
        return;
      } // we have to go through every single element to check the computed style
      // this is very performance heavy


      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = document.querySelectorAll("*")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var elm = _step.value;

          if (this.isGridContainer(elm)) {
            this.annotateElement(elm);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "annotateElement",
    value: function annotateElement(elm) {
      var colCount = this.getTemplateColCount(elm);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Array.from(elm.children).entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              i = _step2$value[0],
              child = _step2$value[1];

          child.style[this.CSS_COL] = i % colCount + 1;
          child.style[this.CSS_ROW] = Math.floor(i / colCount) + 1;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } // returns the number of elements in a computed grid-template-columns attribute.
    // We do not need to consider functions such as repeat or minmax, because they are not supported by IE11 anyway (so either the autoprefixer resolves them or the style definition is broken for IE11 anyway).

  }, {
    key: "getTemplateColCount",
    value: function getTemplateColCount(elm) {
      var styles = window.getComputedStyle(elm);
      return styles.getPropertyValue(this.CSS_TEMPLATE_COLS).split(" ").length;
    }
  }, {
    key: "isGridContainer",
    value: function isGridContainer(elm) {
      var styles = window.getComputedStyle(elm);
      return styles.display === this.CSS_DISPLAY_GRID;
    }
  }, {
    key: "isIE11",
    value: function isIE11() {
      var agent = navigator.userAgent;
      return agent.indexOf("Trident") >= 0 && agent.indexOf("rv:11") >= 0;
    }
  }]);

  return GridItemAnnotator;
}();

_defineProperty(GridItemAnnotator, "CSS_DISPLAY_GRID", "-ms-grid");

_defineProperty(GridItemAnnotator, "CSS_TEMPLATE_COLS", "-ms-grid-columns");

_defineProperty(GridItemAnnotator, "CSS_ROW", "-ms-grid-row");

_defineProperty(GridItemAnnotator, "CSS_COL", "-ms-grid-column");

window.addEventListener("load", function () {
  GridItemAnnotator.annotate();
});