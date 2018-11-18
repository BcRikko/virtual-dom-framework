/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.ts");

class App {
    constructor(params) {
        this.el =
            typeof params.el === "string"
                ? document.querySelector(params.el)
                : params.el;
        this.view = params.view;
        this.state = params.state;
        this.actions = this.dispatchAction(params.actions);
        this.resolveNode();
    }
    dispatchAction(actions) {
        const dispatched = {};
        for (let key in actions) {
            const action = actions[key];
            dispatched[key] = (state, ...data) => {
                const ret = action(state, ...data);
                this.resolveNode();
                return ret;
            };
        }
        return dispatched;
    }
    resolveNode() {
        this.newNode = this.view(this.state, this.actions);
        this.scheduleRender();
    }
    scheduleRender() {
        if (!this.skipRender) {
            this.skipRender = true;
            setTimeout(this.render.bind(this));
        }
    }
    render() {
        if (this.oldNode) {
            Object(_view__WEBPACK_IMPORTED_MODULE_0__["updateElement"])(this.el, this.oldNode, this.newNode);
        }
        else {
            this.el.appendChild(Object(_view__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.newNode));
        }
        this.oldNode = this.newNode;
        this.skipRender = false;
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ "./src/app.ts");


const state = {
    tasks: ["virtual dom", "完全に理解する"],
    form: {
        input: "",
        hasError: false
    }
};
const actions = {
    validate: (state, input) => {
        if (!input || input.length < 3 || input.length > 20) {
            state.form.hasError = true;
        }
        else {
            state.form.hasError = false;
        }
        return !state.form.hasError;
    },
    createTask: (state, title) => {
        state.tasks.push(title);
        state.form.input = "";
    },
    removeTask: (state, index) => {
        state.tasks.splice(index, 1);
    }
};
const view = (state, actions) => {
    return Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { style: "padding: 20px;" }, Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("h1", { class: "title" }, "仮想DOM完全に理解したTODOアプリ"), Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "field" }, Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("label", { class: "label" }, "Task Title"), Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("input", {
        type: "text",
        class: "input",
        style: "width: 200px;",
        value: state.form.input,
        oninput: (ev) => {
            const target = ev.target;
            state.form.input = target.value;
            actions.validate(state, state.form.input);
        }
    }), Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
        type: "button",
        class: "button is-primary",
        style: "margin-left: 10px;",
        onclick: () => {
            if (actions.validate(state, state.form.input)) {
                actions.createTask(state, state.form.input);
            }
        }
    }, "create"), Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
        class: "notification",
        style: `display: ${state.form.hasError ? "display" : "none"}`
    }, "3〜20文字で入力してください")), Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("ul", { class: "panel" }, ...state.tasks.map((task, i) => {
        return Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("li", { class: "panel-block" }, Object(_view__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
            type: "button",
            class: "delete",
            style: "margin-right: 10px;",
            onclick: () => actions.removeTask(state, i)
        }, "remove"), task);
    })));
};
new _app__WEBPACK_IMPORTED_MODULE_1__["App"]({ el: "#app", state, view, actions });


/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/*! exports provided: h, createElement, updateElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateElement", function() { return updateElement; });
function isVNode(node) {
    return typeof node !== "string" && typeof node !== "number";
}
function h(nodeName, attributes, ...children) {
    return {
        nodeName,
        attributes,
        children
    };
}
function createElement(node) {
    if (!isVNode(node)) {
        return document.createTextNode(node.toString());
    }
    const el = document.createElement(node.nodeName);
    setAttributes(el, node.attributes);
    node.children.forEach(child => el.appendChild(createElement(child)));
    return el;
}
function updateElement(parent, oldNode, newNode, index = 0) {
    if (!oldNode) {
        parent.appendChild(createElement(newNode));
        return;
    }
    const target = parent.childNodes[index];
    if (!newNode) {
        parent.removeChild(target);
        return;
    }
    const changeType = hasChanged(oldNode, newNode);
    switch (changeType) {
        case ChangedType.Type:
        case ChangedType.Text:
        case ChangedType.Node:
            parent.replaceChild(createElement(newNode), target);
            return;
        case ChangedType.Value:
            updateValue(target, newNode.attributes.value);
            return;
        case ChangedType.Attr:
            updateAttributes(target, oldNode.attributes, newNode.attributes);
            return;
    }
    if (isVNode(oldNode) && isVNode(newNode)) {
        for (let i = 0; i < newNode.children.length || i < oldNode.children.length; i++) {
            updateElement(target, oldNode.children[i], newNode.children[i], i);
        }
    }
}
function setAttributes(target, attrs) {
    for (let attr in attrs) {
        if (isEventAttr(attr)) {
            const eventName = attr.slice(2);
            target.addEventListener(eventName, attrs[attr]);
        }
        else {
            target.setAttribute(attr, attrs[attr]);
        }
    }
}
function updateAttributes(target, oldAttrs, newAttrs) {
    for (let attr in oldAttrs) {
        if (!isEventAttr(attr)) {
            target.removeAttribute(attr);
        }
    }
    for (let attr in newAttrs) {
        if (!isEventAttr(attr)) {
            target.setAttribute(attr, newAttrs[attr]);
        }
    }
}
function updateValue(target, newValue) {
    target.value = newValue;
}
function isEventAttr(attr) {
    return /^on/.test(attr);
}
var ChangedType;
(function (ChangedType) {
    ChangedType[ChangedType["None"] = 0] = "None";
    ChangedType[ChangedType["Type"] = 1] = "Type";
    ChangedType[ChangedType["Text"] = 2] = "Text";
    ChangedType[ChangedType["Node"] = 3] = "Node";
    ChangedType[ChangedType["Value"] = 4] = "Value";
    ChangedType[ChangedType["Attr"] = 5] = "Attr";
})(ChangedType || (ChangedType = {}));
function hasChanged(a, b) {
    if (typeof a !== typeof b) {
        return ChangedType.Type;
    }
    if (!isVNode(a) && a !== b) {
        return ChangedType.Text;
    }
    if (isVNode(a) && isVNode(b)) {
        if (a.nodeName !== b.nodeName) {
            return ChangedType.Node;
        }
        if (a.attributes.value !== b.attributes.value) {
            return ChangedType.Value;
        }
        if (JSON.stringify(a.attributes) !== JSON.stringify(b.attributes)) {
            return ChangedType.Attr;
        }
    }
    return ChangedType.None;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pGQTtBQUFBO0FBQUE7QUFBbUU7QUFTNUQsTUFBTSxHQUFHO0lBU2QsWUFBWSxNQUFzQztRQUNoRCxJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxRQUFRO2dCQUMzQixDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNuQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7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QUMsS0FBSyxPQUFPLENBQUMsRUFBRTtRQUN6QixPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUM7S0FDekI7SUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDO0tBQ3pCO0lBRUQsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzVCLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzdCLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDN0MsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNqRSxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUM7U0FDekI7S0FDRjtJQUVELE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQztBQUMxQixDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBBY3Rpb25UcmVlIH0gZnJvbSBcIi4vYWN0aW9uXCI7XG5pbXBvcnQgeyBWaWV3LCBWTm9kZSwgY3JlYXRlRWxlbWVudCwgdXBkYXRlRWxlbWVudCB9IGZyb20gXCIuL3ZpZXdcIjtcblxuaW50ZXJmYWNlIEFwcENvbnN0cnVjdG9yPFN0YXRlLCBBY3Rpb25zPiB7XG4gIGVsOiBIVE1MRWxlbWVudCB8IHN0cmluZztcbiAgdmlldzogVmlldzxTdGF0ZSwgQWN0aW9uVHJlZTxTdGF0ZT4+O1xuICBzdGF0ZTogU3RhdGU7XG4gIGFjdGlvbnM6IEFjdGlvblRyZWU8U3RhdGU+O1xufVxuXG5leHBvcnQgY2xhc3MgQXBwPFN0YXRlLCBBY3Rpb25zPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHJlYWRvbmx5IHZpZXc6IFZpZXc8U3RhdGUsIEFjdGlvblRyZWU8U3RhdGU+PjtcbiAgcHJpdmF0ZSByZWFkb25seSBzdGF0ZTogU3RhdGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgYWN0aW9uczogQWN0aW9uVHJlZTxTdGF0ZT47XG4gIHByaXZhdGUgb2xkTm9kZTogVk5vZGU7XG4gIHByaXZhdGUgbmV3Tm9kZTogVk5vZGU7XG4gIHByaXZhdGUgc2tpcFJlbmRlcjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IEFwcENvbnN0cnVjdG9yPFN0YXRlLCBBY3Rpb25zPikge1xuICAgIHRoaXMuZWwgPVxuICAgICAgdHlwZW9mIHBhcmFtcy5lbCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyYW1zLmVsKVxuICAgICAgICA6IHBhcmFtcy5lbDtcblxuICAgIHRoaXMudmlldyA9IHBhcmFtcy52aWV3O1xuICAgIHRoaXMuc3RhdGUgPSBwYXJhbXMuc3RhdGU7XG4gICAgdGhpcy5hY3Rpb25zID0gdGhpcy5kaXNwYXRjaEFjdGlvbihwYXJhbXMuYWN0aW9ucyk7XG4gICAgdGhpcy5yZXNvbHZlTm9kZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkaXNwYXRjaEFjdGlvbihhY3Rpb25zOiBBY3Rpb25UcmVlPFN0YXRlPikge1xuICAgIGNvbnN0IGRpc3BhdGNoZWQgPSB7fSBhcyBBY3Rpb25UcmVlPFN0YXRlPjtcbiAgICBmb3IgKGxldCBrZXkgaW4gYWN0aW9ucykge1xuICAgICAgY29uc3QgYWN0aW9uID0gYWN0aW9uc1trZXldO1xuICAgICAgZGlzcGF0Y2hlZFtrZXldID0gKHN0YXRlOiBTdGF0ZSwgLi4uZGF0YTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IGFjdGlvbihzdGF0ZSwgLi4uZGF0YSk7XG4gICAgICAgIHRoaXMucmVzb2x2ZU5vZGUoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBkaXNwYXRjaGVkO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlTm9kZSgpIHtcbiAgICB0aGlzLm5ld05vZGUgPSB0aGlzLnZpZXcodGhpcy5zdGF0ZSwgdGhpcy5hY3Rpb25zKTtcbiAgICB0aGlzLnNjaGVkdWxlUmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHNjaGVkdWxlUmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5za2lwUmVuZGVyKSB7XG4gICAgICB0aGlzLnNraXBSZW5kZXIgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dCh0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vbGROb2RlKSB7XG4gICAgICB1cGRhdGVFbGVtZW50KHRoaXMuZWwsIHRoaXMub2xkTm9kZSwgdGhpcy5uZXdOb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHRoaXMubmV3Tm9kZSkpO1xuICAgIH1cblxuICAgIHRoaXMub2xkTm9kZSA9IHRoaXMubmV3Tm9kZTtcbiAgICB0aGlzLnNraXBSZW5kZXIgPSBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmlldywgaCB9IGZyb20gXCIuL3ZpZXdcIjtcbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuL2FwcFwiO1xuaW1wb3J0IHsgQWN0aW9uVHJlZSB9IGZyb20gXCIuL2FjdGlvblwiO1xuXG50eXBlIFN0YXRlID0gdHlwZW9mIHN0YXRlO1xudHlwZSBBY3Rpb25zID0gdHlwZW9mIGFjdGlvbnM7XG5cbmNvbnN0IHN0YXRlID0ge1xuICB0YXNrczogW1widmlydHVhbCBkb21cIiwgXCLlrozlhajjgavnkIbop6PjgZnjgotcIl0sXG4gIGZvcm06IHtcbiAgICBpbnB1dDogXCJcIixcbiAgICBoYXNFcnJvcjogZmFsc2VcbiAgfVxufTtcblxuY29uc3QgYWN0aW9uczogQWN0aW9uVHJlZTxTdGF0ZT4gPSB7XG4gIHZhbGlkYXRlOiAoc3RhdGUsIGlucHV0OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIWlucHV0IHx8IGlucHV0Lmxlbmd0aCA8IDMgfHwgaW5wdXQubGVuZ3RoID4gMjApIHtcbiAgICAgIHN0YXRlLmZvcm0uaGFzRXJyb3IgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5mb3JtLmhhc0Vycm9yID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICFzdGF0ZS5mb3JtLmhhc0Vycm9yO1xuICB9LFxuICBjcmVhdGVUYXNrOiAoc3RhdGUsIHRpdGxlOiBzdHJpbmcpID0+IHtcbiAgICBzdGF0ZS50YXNrcy5wdXNoKHRpdGxlKTtcbiAgICBzdGF0ZS5mb3JtLmlucHV0ID0gXCJcIjtcbiAgfSxcbiAgcmVtb3ZlVGFzazogKHN0YXRlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgc3RhdGUudGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuY29uc3QgdmlldzogVmlldzxTdGF0ZSwgQWN0aW9ucz4gPSAoc3RhdGUsIGFjdGlvbnMpID0+IHtcbiAgcmV0dXJuIGgoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0eWxlOiBcInBhZGRpbmc6IDIwcHg7XCIgfSxcbiAgICBoKFwiaDFcIiwgeyBjbGFzczogXCJ0aXRsZVwiIH0sIFwi5Luu5oOzRE9N5a6M5YWo44Gr55CG6Kej44GX44GfVE9ET+OCouODl+ODqlwiKSxcbiAgICBoKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3M6IFwiZmllbGRcIiB9LFxuICAgICAgaChcImxhYmVsXCIsIHsgY2xhc3M6IFwibGFiZWxcIiB9LCBcIlRhc2sgVGl0bGVcIiksXG4gICAgICBoKFwiaW5wdXRcIiwge1xuICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgY2xhc3M6IFwiaW5wdXRcIixcbiAgICAgICAgc3R5bGU6IFwid2lkdGg6IDIwMHB4O1wiLFxuICAgICAgICB2YWx1ZTogc3RhdGUuZm9ybS5pbnB1dCxcbiAgICAgICAgb25pbnB1dDogKGV2OiBFdmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICAgIHN0YXRlLmZvcm0uaW5wdXQgPSB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgYWN0aW9ucy52YWxpZGF0ZShzdGF0ZSwgc3RhdGUuZm9ybS5pbnB1dCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgaChcbiAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgY2xhc3M6IFwiYnV0dG9uIGlzLXByaW1hcnlcIixcbiAgICAgICAgICBzdHlsZTogXCJtYXJnaW4tbGVmdDogMTBweDtcIixcbiAgICAgICAgICBvbmNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWN0aW9ucy52YWxpZGF0ZShzdGF0ZSwgc3RhdGUuZm9ybS5pbnB1dCkpIHtcbiAgICAgICAgICAgICAgYWN0aW9ucy5jcmVhdGVUYXNrKHN0YXRlLCBzdGF0ZS5mb3JtLmlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY3JlYXRlXCJcbiAgICAgICksXG4gICAgICBoKFxuICAgICAgICBcInBcIixcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiBcIm5vdGlmaWNhdGlvblwiLFxuICAgICAgICAgIHN0eWxlOiBgZGlzcGxheTogJHtzdGF0ZS5mb3JtLmhhc0Vycm9yID8gXCJkaXNwbGF5XCIgOiBcIm5vbmVcIn1gXG4gICAgICAgIH0sXG4gICAgICAgIFwiM+OAnDIw5paH5a2X44Gn5YWl5Yqb44GX44Gm44GP44Gg44GV44GEXCJcbiAgICAgIClcbiAgICApLFxuICAgIGgoXG4gICAgICBcInVsXCIsXG4gICAgICB7IGNsYXNzOiBcInBhbmVsXCIgfSxcbiAgICAgIC4uLnN0YXRlLnRhc2tzLm1hcCgodGFzaywgaSkgPT4ge1xuICAgICAgICByZXR1cm4gaChcbiAgICAgICAgICBcImxpXCIsXG4gICAgICAgICAgeyBjbGFzczogXCJwYW5lbC1ibG9ja1wiIH0sXG4gICAgICAgICAgaChcbiAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIGNsYXNzOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICBzdHlsZTogXCJtYXJnaW4tcmlnaHQ6IDEwcHg7XCIsXG4gICAgICAgICAgICAgIG9uY2xpY2s6ICgpID0+IGFjdGlvbnMucmVtb3ZlVGFzayhzdGF0ZSwgaSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiXG4gICAgICAgICAgKSxcbiAgICAgICAgICB0YXNrXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgIClcbiAgKTtcbn07XG5cbm5ldyBBcHA8U3RhdGUsIEFjdGlvbnM+KHsgZWw6IFwiI2FwcFwiLCBzdGF0ZSwgdmlldywgYWN0aW9ucyB9KTtcbiIsInR5cGUgTm9kZVR5cGUgPSBWTm9kZSB8IHN0cmluZyB8IG51bWJlcjtcbnR5cGUgQXR0cmlidXRlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgRnVuY3Rpb24gfTtcblxuZXhwb3J0IGludGVyZmFjZSBWTm9kZSB7XG4gIG5vZGVOYW1lOiBrZXlvZiBFbGVtZW50VGFnTmFtZU1hcDtcbiAgYXR0cmlidXRlczogQXR0cmlidXRlcztcbiAgY2hpbGRyZW46IE5vZGVUeXBlW107XG59XG5cbmZ1bmN0aW9uIGlzVk5vZGUobm9kZTogTm9kZVR5cGUpOiBub2RlIGlzIFZOb2RlIHtcbiAgcmV0dXJuIHR5cGVvZiBub2RlICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiBub2RlICE9PSBcIm51bWJlclwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaChcbiAgbm9kZU5hbWU6IGtleW9mIEVsZW1lbnRUYWdOYW1lTWFwLFxuICBhdHRyaWJ1dGVzOiBBdHRyaWJ1dGVzLFxuICAuLi5jaGlsZHJlbjogTm9kZVR5cGVbXVxuKTogVk5vZGUge1xuICByZXR1cm4ge1xuICAgIG5vZGVOYW1lLFxuICAgIGF0dHJpYnV0ZXMsXG4gICAgY2hpbGRyZW5cbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWaWV3PFN0YXRlLCBBY3Rpb25zPiB7XG4gIChzdGF0ZTogU3RhdGUsIGFjdGlvbnM6IEFjdGlvbnMpOiBWTm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobm9kZTogTm9kZVR5cGUpOiBIVE1MRWxlbWVudCB8IFRleHQge1xuICBpZiAoIWlzVk5vZGUobm9kZSkpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZS50b1N0cmluZygpKTtcbiAgfVxuXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlLm5vZGVOYW1lKTtcbiAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKTtcbiAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGVsLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoY2hpbGQpKSk7XG5cbiAgcmV0dXJuIGVsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRWxlbWVudChcbiAgcGFyZW50OiBIVE1MRWxlbWVudCxcbiAgb2xkTm9kZTogTm9kZVR5cGUsXG4gIG5ld05vZGU6IE5vZGVUeXBlLFxuICBpbmRleCA9IDBcbik6IHZvaWQge1xuICBpZiAoIW9sZE5vZGUpIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChuZXdOb2RlKSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGFyZ2V0ID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuXG4gIGlmICghbmV3Tm9kZSkge1xuICAgIHBhcmVudC5yZW1vdmVDaGlsZCh0YXJnZXQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGNoYW5nZVR5cGUgPSBoYXNDaGFuZ2VkKG9sZE5vZGUsIG5ld05vZGUpO1xuICBzd2l0Y2ggKGNoYW5nZVR5cGUpIHtcbiAgICBjYXNlIENoYW5nZWRUeXBlLlR5cGU6XG4gICAgY2FzZSBDaGFuZ2VkVHlwZS5UZXh0OlxuICAgIGNhc2UgQ2hhbmdlZFR5cGUuTm9kZTpcbiAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoY3JlYXRlRWxlbWVudChuZXdOb2RlKSwgdGFyZ2V0KTtcbiAgICAgIHJldHVybjtcbiAgICBjYXNlIENoYW5nZWRUeXBlLlZhbHVlOlxuICAgICAgdXBkYXRlVmFsdWUoXG4gICAgICAgIHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICAgICAgICAobmV3Tm9kZSBhcyBWTm9kZSkuYXR0cmlidXRlcy52YWx1ZSBhcyBzdHJpbmdcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgY2FzZSBDaGFuZ2VkVHlwZS5BdHRyOlxuICAgICAgdXBkYXRlQXR0cmlidXRlcyhcbiAgICAgICAgdGFyZ2V0IGFzIEhUTUxFbGVtZW50LFxuICAgICAgICAob2xkTm9kZSBhcyBWTm9kZSkuYXR0cmlidXRlcyxcbiAgICAgICAgKG5ld05vZGUgYXMgVk5vZGUpLmF0dHJpYnV0ZXNcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaXNWTm9kZShvbGROb2RlKSAmJiBpc1ZOb2RlKG5ld05vZGUpKSB7XG4gICAgZm9yIChcbiAgICAgIGxldCBpID0gMDtcbiAgICAgIGkgPCBuZXdOb2RlLmNoaWxkcmVuLmxlbmd0aCB8fCBpIDwgb2xkTm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICBpKytcbiAgICApIHtcbiAgICAgIHVwZGF0ZUVsZW1lbnQoXG4gICAgICAgIHRhcmdldCBhcyBIVE1MRWxlbWVudCxcbiAgICAgICAgb2xkTm9kZS5jaGlsZHJlbltpXSxcbiAgICAgICAgbmV3Tm9kZS5jaGlsZHJlbltpXSxcbiAgICAgICAgaVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyh0YXJnZXQ6IEhUTUxFbGVtZW50LCBhdHRyczogQXR0cmlidXRlcyk6IHZvaWQge1xuICBmb3IgKGxldCBhdHRyIGluIGF0dHJzKSB7XG4gICAgaWYgKGlzRXZlbnRBdHRyKGF0dHIpKSB7XG4gICAgICBjb25zdCBldmVudE5hbWUgPSBhdHRyLnNsaWNlKDIpO1xuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBhdHRyc1thdHRyXSBhcyBFdmVudExpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyc1thdHRyXSBhcyBzdHJpbmcpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVzKFxuICB0YXJnZXQ6IEhUTUxFbGVtZW50LFxuICBvbGRBdHRyczogQXR0cmlidXRlcyxcbiAgbmV3QXR0cnM6IEF0dHJpYnV0ZXNcbik6IHZvaWQge1xuICBmb3IgKGxldCBhdHRyIGluIG9sZEF0dHJzKSB7XG4gICAgaWYgKCFpc0V2ZW50QXR0cihhdHRyKSkge1xuICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICB9XG4gIH1cbiAgZm9yIChsZXQgYXR0ciBpbiBuZXdBdHRycykge1xuICAgIGlmICghaXNFdmVudEF0dHIoYXR0cikpIHtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoYXR0ciwgbmV3QXR0cnNbYXR0cl0gYXMgc3RyaW5nKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVmFsdWUodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50LCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gIHRhcmdldC52YWx1ZSA9IG5ld1ZhbHVlO1xufVxuXG5mdW5jdGlvbiBpc0V2ZW50QXR0cihhdHRyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIC9eb24vLnRlc3QoYXR0cik7XG59XG5cbmVudW0gQ2hhbmdlZFR5cGUge1xuICBOb25lLFxuICBUeXBlLFxuICBUZXh0LFxuICBOb2RlLFxuICBWYWx1ZSxcbiAgQXR0clxufVxuXG5mdW5jdGlvbiBoYXNDaGFuZ2VkKGE6IE5vZGVUeXBlLCBiOiBOb2RlVHlwZSk6IENoYW5nZWRUeXBlIHtcbiAgaWYgKHR5cGVvZiBhICE9PSB0eXBlb2YgYikge1xuICAgIHJldHVybiBDaGFuZ2VkVHlwZS5UeXBlO1xuICB9XG5cbiAgaWYgKCFpc1ZOb2RlKGEpICYmIGEgIT09IGIpIHtcbiAgICByZXR1cm4gQ2hhbmdlZFR5cGUuVGV4dDtcbiAgfVxuXG4gIGlmIChpc1ZOb2RlKGEpICYmIGlzVk5vZGUoYikpIHtcbiAgICBpZiAoYS5ub2RlTmFtZSAhPT0gYi5ub2RlTmFtZSkge1xuICAgICAgcmV0dXJuIENoYW5nZWRUeXBlLk5vZGU7XG4gICAgfVxuICAgIGlmIChhLmF0dHJpYnV0ZXMudmFsdWUgIT09IGIuYXR0cmlidXRlcy52YWx1ZSkge1xuICAgICAgcmV0dXJuIENoYW5nZWRUeXBlLlZhbHVlO1xuICAgIH1cbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkoYS5hdHRyaWJ1dGVzKSAhPT0gSlNPTi5zdHJpbmdpZnkoYi5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIENoYW5nZWRUeXBlLkF0dHI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIENoYW5nZWRUeXBlLk5vbmU7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9