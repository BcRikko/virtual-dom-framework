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

/***/ "./src/framework/controller.ts":
/*!*************************************!*\
  !*** ./src/framework/controller.ts ***!
  \*************************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/framework/view.ts");

class App {
    constructor(params) {
        this.el = typeof params.el === 'string' ? document.querySelector(params.el) : params.el;
        this.view = params.view;
        this.state = params.state;
        this.actions = this.dispatchAction(params.actions);
        this.resolveNode();
    }
    /**
     * ユーザが定義したActionsに仮想DOM再構築用のフックを仕込む
     * @param actions
     */
    dispatchAction(actions) {
        const dispatched = {};
        for (const key in actions) {
            const action = actions[key];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dispatched[key] = (state, ...data) => {
                const ret = action(state, ...data);
                this.resolveNode();
                return ret;
            };
        }
        return dispatched;
    }
    /**
     * 仮想DOMを構築する
     */
    resolveNode() {
        // 仮想DOMを再構築する
        this.newNode = this.view(this.state, this.actions);
        this.scheduleRender();
    }
    /**
     * renderのスケジューリングを行う
     */
    scheduleRender() {
        if (!this.skipRender) {
            this.skipRender = true;
            // setTimeoutを使うことで非同期になり、かつ実行を数ミリ秒遅延できる
            setTimeout(this.render.bind(this));
        }
    }
    /**
     * リアルDOMに反映する
     */
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

/***/ "./src/framework/view.ts":
/*!*******************************!*\
  !*** ./src/framework/view.ts ***!
  \*******************************/
/*! exports provided: h, createElement, updateElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateElement", function() { return updateElement; });
/**
 * Nodeを受け取り、VNodeなのかTextなのかを判定する
 */
const isVNode = (node) => {
    return typeof node !== 'string' && typeof node !== 'number';
};
/**
 * 受け取った属性がイベントかどうか判定する
 * @param attribute 属性
 */
const isEventAttr = (attribute) => {
    // onからはじまる属性名はイベントとして扱う
    return /^on/.test(attribute);
};
/**
 * 仮想DOMを作成する
 * @param nodeName Nodeの名前（HTMLのタグ名）
 * @param attributes Nodeの属性（width/heightやstyleなど）
 * @param children Nodeの子要素のリスト
 */
function h(nodeName, attributes, ...children) {
    return {
        nodeName,
        attributes,
        children
    };
}
/**
 * 属性を設定する
 * @param target 操作対象のElement
 * @param attributes Elementに追加したい属性のリスト
 */
const setAttributes = (target, attributes) => {
    for (const attr in attributes) {
        if (isEventAttr(attr)) {
            // onclickなどはイベントリスナーに登録する
            // onclickやoninput、onchangeなどのonを除いたイベント名を取得する
            const eventName = attr.slice(2);
            target.addEventListener(eventName, attributes[attr]);
        }
        else {
            // イベントリスナ−以外はそのまま属性に設定する
            target.setAttribute(attr, attributes[attr]);
        }
    }
};
/**
 * 属性を更新する
 * @param target 操作対象のElement
 * @param oldAttrs 古い属性
 * @param newAttrs 新しい属性
 */
const updateAttributes = (target, oldAttrs, newAttrs) => {
    // 処理をシンプルにするためoldAttrsを削除後、newAttrsで再設定する
    for (const attr in oldAttrs) {
        if (!isEventAttr(attr)) {
            target.removeAttribute(attr);
        }
    }
    for (const attr in newAttrs) {
        if (!isEventAttr(attr)) {
            target.setAttribute(attr, newAttrs[attr]);
        }
    }
};
/**
 * input要素のvalueを更新する
 * @param target 操作対象のinput要素
 * @param newValue inputのvalueに設定する値
 */
const updateValue = (target, newValue) => {
    target.value = newValue;
};
/** 差分のタイプ */
var ChangedType;
(function (ChangedType) {
    /** 差分なし */
    ChangedType[ChangedType["None"] = 0] = "None";
    /** NodeTypeが異なる */
    ChangedType[ChangedType["Type"] = 1] = "Type";
    /** テキストNodeが異なる */
    ChangedType[ChangedType["Text"] = 2] = "Text";
    /** 要素名が異なる */
    ChangedType[ChangedType["Node"] = 3] = "Node";
    /** value属性が異なる（input要素用） */
    ChangedType[ChangedType["Value"] = 4] = "Value";
    /** 属性が異なる */
    ChangedType[ChangedType["Attr"] = 5] = "Attr";
})(ChangedType || (ChangedType = {}));
/**
 * 差分検知を行う
 * @param a
 * @param b
 */
const hasChanged = (a, b) => {
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
            // 本来ならオブジェクトひとつひとつを比較すべきなのですが、シンプルな実装にするためにJSON.stringifyを使っています
            // JSON.stringifyを使ったオブジェクトの比較は罠が多いので、できるだけ使わないほうが良いです
            return ChangedType.Attr;
        }
    }
    return ChangedType.None;
};
/**
 * リアルDOMを作成する
 * @param node 作成するNode
 */
function createElement(node) {
    if (!isVNode(node)) {
        return document.createTextNode(node.toString());
    }
    const el = document.createElement(node.nodeName);
    setAttributes(el, node.attributes);
    node.children.forEach(child => el.appendChild(createElement(child)));
    return el;
}
/**
 * 仮想DOMの差分を検知し、リアルDOMに反映する
 * @param parent 親要素
 * @param oldNode 古いNode情報
 * @param newNode 新しいNode情報
 * @param index 子要素の順番
 */
function updateElement(parent, oldNode, newNode, index = 0) {
    // oldNodeがない場合は新しいNodeを作成する
    if (!oldNode) {
        parent.appendChild(createElement(newNode));
        return;
    }
    // newNodeがない場合は削除されたと判断し、そのNodeを削除する
    const target = parent.childNodes[index];
    if (!newNode) {
        parent.removeChild(target);
        return;
    }
    // 差分検知し、パッチ処理（変更箇所だけ反映）を行う
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
    // 子要素の差分検知・リアルDOM反映を再帰的に実行する
    if (isVNode(oldNode) && isVNode(newNode)) {
        for (let i = 0; i < newNode.children.length || i < oldNode.children.length; i++) {
            updateElement(target, oldNode.children[i], newNode.children[i], i);
        }
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
/* harmony import */ var _framework_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework/view */ "./src/framework/view.ts");
/* harmony import */ var _framework_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./framework/controller */ "./src/framework/controller.ts");


const state = {
    tasks: ['Learn about Virtual DOM', 'Write a document'],
    form: {
        title: '',
        hasError: false
    }
};
const actions = {
    validate(state, title) {
        if (!title || title.length < 3 || title.length > 20) {
            state.form.hasError = true;
        }
        else {
            state.form.hasError = false;
        }
        return !state.form.hasError;
    },
    createTask(state, title = '') {
        state.tasks.push(title);
        state.form.title = '';
    },
    removeTask(state, index) {
        state.tasks.splice(index, 1);
    }
};
/**
 * View: 描画関連
 */
const view = (state, actions) => {
    // prettier-ignore
    return Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('div', {
        class: 'nes-container is-rounded',
        style: 'padding: 2rem;'
    }, Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('h1', {
        class: 'title',
        style: 'margin-bottom: 2rem;'
    }, Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('i', { class: 'nes-icon heart is-medium' }), 'Virtual DOM TODO App '), Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('form', {
        class: 'nes-container',
        style: 'margin-bottom: 2rem;'
    }, Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('div', {
        class: 'nes-field',
        style: 'margin-bottom: 1rem;',
    }, Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('label', {
        class: 'label',
        for: 'task-title'
    }, 'Title'), Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('input', {
        type: 'text',
        id: 'task-title',
        class: 'nes-input',
        value: state.form.title,
        oninput: (ev) => {
            const target = ev.target;
            state.form.title = target.value;
            actions.validate(state, target.value);
        }
    })), Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('p', {
        class: 'nes-text is-error',
        style: `display: ${state.form.hasError ? 'display' : 'none'}`,
    }, 'Enter a value between 3 and 20 characters'), Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('button', {
        type: 'button',
        class: 'nes-btn is-primary',
        onclick: () => {
            if (state.form.hasError)
                return;
            actions.createTask(state, state.form.title);
        }
    }, 'Create')), Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('ul', { class: 'nes-list is-disc nes-container' }, ...state.tasks.map((task, i) => {
        return Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('li', {
            class: 'item',
            style: 'margin-bottom: 1rem;'
        }, task, Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('button', {
            type: 'button',
            class: 'nes-btn is-error',
            style: 'margin-left: 1rem;',
            onclick: () => actions.removeTask(state, i)
        }, '×'));
    })));
};
new _framework_controller__WEBPACK_IMPORTED_MODULE_1__["App"]({
    el: '#app',
    state,
    view,
    actions
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvdmlldy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBa0U7QUFjM0QsTUFBTSxHQUFHO0lBY2QsWUFBWSxNQUFzQztRQUNoRCxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN2RixJQUFJLENBQUMsSUFBSSxHQUFHLE1B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QUFFRCxJQUFJLHlEQUFHLENBQWlCO0lBQ3RCLEVBQUUsRUFBRSxNQUFNO0lBQ1YsS0FBSztJQUNMLElBQUk7SUFDSixPQUFPO0NBQ1IsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgVmlldywgVk5vZGUsIHVwZGF0ZUVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL3ZpZXcnXG5pbXBvcnQgeyBBY3Rpb25UcmVlIH0gZnJvbSAnLi9hY3Rpb24nXG5cbmludGVyZmFjZSBBcHBDb25zdHJ1Y3RvcjxTdGF0ZSwgQWN0aW9ucyBleHRlbmRzIEFjdGlvblRyZWU8U3RhdGU+PiB7XG4gIC8qKiDjg6HjgqTjg7NOb2RlICovXG4gIGVsOiBFbGVtZW50IHwgc3RyaW5nXG4gIC8qKiBWaWV344Gu5a6a576pICovXG4gIHZpZXc6IFZpZXc8U3RhdGUsIEFjdGlvbnM+XG4gIC8qKiDnirbmhYvnrqHnkIYgKi9cbiAgc3RhdGU6IFN0YXRlXG4gIC8qKiBBY3Rpb27jga7lrprnvqkgKi9cbiAgYWN0aW9uczogQWN0aW9uc1xufVxuXG5leHBvcnQgY2xhc3MgQXBwPFN0YXRlLCBBY3Rpb25zIGV4dGVuZHMgQWN0aW9uVHJlZTxTdGF0ZT4+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBlbDogRWxlbWVudFxuICBwcml2YXRlIHJlYWRvbmx5IHZpZXc6IEFwcENvbnN0cnVjdG9yPFN0YXRlLCBBY3Rpb25zPlsndmlldyddXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhdGU6IEFwcENvbnN0cnVjdG9yPFN0YXRlLCBBY3Rpb25zPlsnc3RhdGUnXVxuICBwcml2YXRlIHJlYWRvbmx5IGFjdGlvbnM6IEFwcENvbnN0cnVjdG9yPFN0YXRlLCBBY3Rpb25zPlsnYWN0aW9ucyddXG5cbiAgLyoqIOS7ruaDs0RPTe+8iOWkieabtOWJjeeUqO+8iSAqL1xuICBwcml2YXRlIG9sZE5vZGU6IFZOb2RlXG4gIC8qKiDku67mg7NET03vvIjlpInmm7TlvoznlKjvvIkgKi9cbiAgcHJpdmF0ZSBuZXdOb2RlOiBWTm9kZVxuXG4gIC8qKiDpgKPntprjgafjg6rjgqLjg6tET03mk43kvZzjgYzotbDjgonjgarjgYTjgZ/jgoHjga7jg5Xjg6njgrAgKi9cbiAgcHJpdmF0ZSBza2lwUmVuZGVyOiBib29sZWFuXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiBBcHBDb25zdHJ1Y3RvcjxTdGF0ZSwgQWN0aW9ucz4pIHtcbiAgICB0aGlzLmVsID0gdHlwZW9mIHBhcmFtcy5lbCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmFtcy5lbCkgOiBwYXJhbXMuZWxcbiAgICB0aGlzLnZpZXcgPSBwYXJhbXMudmlld1xuICAgIHRoaXMuc3RhdGUgPSBwYXJhbXMuc3RhdGVcbiAgICB0aGlzLmFjdGlvbnMgPSB0aGlzLmRpc3BhdGNoQWN0aW9uKHBhcmFtcy5hY3Rpb25zKVxuICAgIHRoaXMucmVzb2x2ZU5vZGUoKVxuICB9XG5cbiAgLyoqXG4gICAqIOODpuODvOOCtuOBjOWumue+qeOBl+OBn0FjdGlvbnPjgavku67mg7NET03lho3mp4vnr4nnlKjjga7jg5Xjg4Pjgq/jgpLku5XovrzjgoBcbiAgICogQHBhcmFtIGFjdGlvbnNcbiAgICovXG4gIHByaXZhdGUgZGlzcGF0Y2hBY3Rpb24oYWN0aW9uczogQWN0aW9ucyk6IEFjdGlvbnMge1xuICAgIGNvbnN0IGRpc3BhdGNoZWQ6IEFjdGlvblRyZWU8U3RhdGU+ID0ge31cblxuICAgIGZvciAoY29uc3Qga2V5IGluIGFjdGlvbnMpIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGFjdGlvbnNba2V5XVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIGRpc3BhdGNoZWRba2V5XSA9IChzdGF0ZTogU3RhdGUsIC4uLmRhdGE6IGFueSk6IGFueSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IGFjdGlvbihzdGF0ZSwgLi4uZGF0YSlcbiAgICAgICAgdGhpcy5yZXNvbHZlTm9kZSgpXG4gICAgICAgIHJldHVybiByZXRcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlzcGF0Y2hlZCBhcyBBY3Rpb25zXG4gIH1cblxuICAvKipcbiAgICog5Luu5oOzRE9N44KS5qeL56+J44GZ44KLXG4gICAqL1xuICBwcml2YXRlIHJlc29sdmVOb2RlKCk6IHZvaWQge1xuICAgIC8vIOS7ruaDs0RPTeOCkuWGjeani+evieOBmeOCi1xuICAgIHRoaXMubmV3Tm9kZSA9IHRoaXMudmlldyh0aGlzLnN0YXRlLCB0aGlzLmFjdGlvbnMpXG4gICAgdGhpcy5zY2hlZHVsZVJlbmRlcigpXG4gIH1cblxuICAvKipcbiAgICogcmVuZGVy44Gu44K544Kx44K444Ol44O844Oq44Oz44Kw44KS6KGM44GGXG4gICAqL1xuICBwcml2YXRlIHNjaGVkdWxlUmVuZGVyKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5za2lwUmVuZGVyKSB7XG4gICAgICB0aGlzLnNraXBSZW5kZXIgPSB0cnVlXG4gICAgICAvLyBzZXRUaW1lb3V044KS5L2/44GG44GT44Go44Gn6Z2e5ZCM5pyf44Gr44Gq44KK44CB44GL44Gk5a6f6KGM44KS5pWw44Of44Oq56eS6YGF5bu244Gn44GN44KLXG4gICAgICBzZXRUaW1lb3V0KHRoaXMucmVuZGVyLmJpbmQodGhpcykpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODquOCouODq0RPTeOBq+WPjeaYoOOBmeOCi1xuICAgKi9cbiAgcHJpdmF0ZSByZW5kZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub2xkTm9kZSkge1xuICAgICAgdXBkYXRlRWxlbWVudCh0aGlzLmVsIGFzIEhUTUxFbGVtZW50LCB0aGlzLm9sZE5vZGUsIHRoaXMubmV3Tm9kZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHRoaXMubmV3Tm9kZSkpXG4gICAgfVxuXG4gICAgdGhpcy5vbGROb2RlID0gdGhpcy5uZXdOb2RlXG4gICAgdGhpcy5za2lwUmVuZGVyID0gZmFsc2VcbiAgfVxufVxuIiwiLyoqIE5vZGXjgYzlj5bjgorjgYbjgosz56iu44Gu5Z6LICovXG50eXBlIE5vZGVUeXBlID0gVk5vZGUgfCBzdHJpbmcgfCBudW1iZXJcbi8qKiDlsZ7mgKfjga7lnosgKi9cbnR5cGUgQXR0cmlidXRlVHlwZSA9IHN0cmluZyB8IEV2ZW50TGlzdGVuZXJcbnR5cGUgQXR0cmlidXRlcyA9IHtcbiAgW2F0dHI6IHN0cmluZ106IEF0dHJpYnV0ZVR5cGVcbn1cblxuLyoqXG4gKiDku67mg7NET03jga7jgbLjgajjgaTjga7jgqrjg5bjgrjjgqfjgq/jg4jjgpLooajjgZnlnotcbiAqL1xuZXhwb3J0IHR5cGUgVk5vZGUgPSB7XG4gIG5vZGVOYW1lOiBrZXlvZiBFbGVtZW50VGFnTmFtZU1hcFxuICBhdHRyaWJ1dGVzOiBBdHRyaWJ1dGVzXG4gIGNoaWxkcmVuOiBOb2RlVHlwZVtdXG59XG5cbi8qKlxuICogTm9kZeOCkuWPl+OBkeWPluOCiuOAgVZOb2Rl44Gq44Gu44GLVGV4dOOBquOBruOBi+OCkuWIpOWumuOBmeOCi1xuICovXG5jb25zdCBpc1ZOb2RlID0gKG5vZGU6IE5vZGVUeXBlKTogbm9kZSBpcyBWTm9kZSA9PiB7XG4gIHJldHVybiB0eXBlb2Ygbm9kZSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIG5vZGUgIT09ICdudW1iZXInXG59XG5cbi8qKlxuICog5Y+X44GR5Y+W44Gj44Gf5bGe5oCn44GM44Kk44OZ44Oz44OI44GL44Gp44GG44GL5Yik5a6a44GZ44KLXG4gKiBAcGFyYW0gYXR0cmlidXRlIOWxnuaAp1xuICovXG5jb25zdCBpc0V2ZW50QXR0ciA9IChhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAvLyBvbuOBi+OCieOBr+OBmOOBvuOCi+WxnuaAp+WQjeOBr+OCpOODmeODs+ODiOOBqOOBl+OBpuaJseOBhlxuICByZXR1cm4gL15vbi8udGVzdChhdHRyaWJ1dGUpXG59XG5cbi8qKlxuICogVmlld+WxpOOBruWei+Wumue+qVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZpZXc8U3RhdGUsIEFjdGlvbnM+IHtcbiAgKHN0YXRlOiBTdGF0ZSwgYWN0aW9uczogQWN0aW9ucyk6IFZOb2RlXG59XG5cbi8qKlxuICog5Luu5oOzRE9N44KS5L2c5oiQ44GZ44KLXG4gKiBAcGFyYW0gbm9kZU5hbWUgTm9kZeOBruWQjeWJje+8iEhUTUzjga7jgr/jgrDlkI3vvIlcbiAqIEBwYXJhbSBhdHRyaWJ1dGVzIE5vZGXjga7lsZ7mgKfvvIh3aWR0aC9oZWlnaHTjgoRzdHlsZeOBquOBqe+8iVxuICogQHBhcmFtIGNoaWxkcmVuIE5vZGXjga7lrZDopoHntKDjga7jg6rjgrnjg4hcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGgobm9kZU5hbWU6IFZOb2RlWydub2RlTmFtZSddLCBhdHRyaWJ1dGVzOiBWTm9kZVsnYXR0cmlidXRlcyddLCAuLi5jaGlsZHJlbjogVk5vZGVbJ2NoaWxkcmVuJ10pOiBWTm9kZSB7XG4gIHJldHVybiB7XG4gICAgbm9kZU5hbWUsXG4gICAgYXR0cmlidXRlcyxcbiAgICBjaGlsZHJlblxuICB9XG59XG5cbi8qKlxuICog5bGe5oCn44KS6Kit5a6a44GZ44KLXG4gKiBAcGFyYW0gdGFyZ2V0IOaTjeS9nOWvvuixoeOBrkVsZW1lbnRcbiAqIEBwYXJhbSBhdHRyaWJ1dGVzIEVsZW1lbnTjgavov73liqDjgZfjgZ/jgYTlsZ7mgKfjga7jg6rjgrnjg4hcbiAqL1xuY29uc3Qgc2V0QXR0cmlidXRlcyA9ICh0YXJnZXQ6IEhUTUxFbGVtZW50LCBhdHRyaWJ1dGVzOiBBdHRyaWJ1dGVzKTogdm9pZCA9PiB7XG4gIGZvciAoY29uc3QgYXR0ciBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgaWYgKGlzRXZlbnRBdHRyKGF0dHIpKSB7XG4gICAgICAvLyBvbmNsaWNr44Gq44Gp44Gv44Kk44OZ44Oz44OI44Oq44K544OK44O844Gr55m76Yyy44GZ44KLXG4gICAgICAvLyBvbmNsaWNr44KEb25pbnB1dOOAgW9uY2hhbmdl44Gq44Gp44Gub27jgpLpmaTjgYTjgZ/jgqTjg5njg7Pjg4jlkI3jgpLlj5blvpfjgZnjgotcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGF0dHIuc2xpY2UoMilcbiAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgYXR0cmlidXRlc1thdHRyXSBhcyBFdmVudExpc3RlbmVyKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDjgqTjg5njg7Pjg4jjg6rjgrnjg4riiJLku6XlpJbjga/jgZ3jga7jgb7jgb7lsZ7mgKfjgavoqK3lrprjgZnjgotcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc1thdHRyXSBhcyBzdHJpbmcpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICog5bGe5oCn44KS5pu05paw44GZ44KLXG4gKiBAcGFyYW0gdGFyZ2V0IOaTjeS9nOWvvuixoeOBrkVsZW1lbnRcbiAqIEBwYXJhbSBvbGRBdHRycyDlj6TjgYTlsZ7mgKdcbiAqIEBwYXJhbSBuZXdBdHRycyDmlrDjgZfjgYTlsZ7mgKdcbiAqL1xuY29uc3QgdXBkYXRlQXR0cmlidXRlcyA9ICh0YXJnZXQ6IEhUTUxFbGVtZW50LCBvbGRBdHRyczogQXR0cmlidXRlcywgbmV3QXR0cnM6IEF0dHJpYnV0ZXMpOiB2b2lkID0+IHtcbiAgLy8g5Yem55CG44KS44K344Oz44OX44Or44Gr44GZ44KL44Gf44KBb2xkQXR0cnPjgpLliYrpmaTlvozjgIFuZXdBdHRyc+OBp+WGjeioreWumuOBmeOCi1xuICBmb3IgKGNvbnN0IGF0dHIgaW4gb2xkQXR0cnMpIHtcbiAgICBpZiAoIWlzRXZlbnRBdHRyKGF0dHIpKSB7XG4gICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKGF0dHIpXG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBhdHRyIGluIG5ld0F0dHJzKSB7XG4gICAgaWYgKCFpc0V2ZW50QXR0cihhdHRyKSkge1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShhdHRyLCBuZXdBdHRyc1thdHRyXSBhcyBzdHJpbmcpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogaW5wdXTopoHntKDjga52YWx1ZeOCkuabtOaWsOOBmeOCi1xuICogQHBhcmFtIHRhcmdldCDmk43kvZzlr77osaHjga5pbnB1dOimgee0oFxuICogQHBhcmFtIG5ld1ZhbHVlIGlucHV044GudmFsdWXjgavoqK3lrprjgZnjgovlgKRcbiAqL1xuY29uc3QgdXBkYXRlVmFsdWUgPSAodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50LCBuZXdWYWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIHRhcmdldC52YWx1ZSA9IG5ld1ZhbHVlXG59XG5cbi8qKiDlt67liIbjga7jgr/jgqTjg5cgKi9cbmVudW0gQ2hhbmdlZFR5cGUge1xuICAvKiog5beu5YiG44Gq44GXICovXG4gIE5vbmUsXG4gIC8qKiBOb2RlVHlwZeOBjOeVsOOBquOCiyAqL1xuICBUeXBlLFxuICAvKiog44OG44Kt44K544OITm9kZeOBjOeVsOOBquOCiyAqL1xuICBUZXh0LFxuICAvKiog6KaB57Sg5ZCN44GM55Ww44Gq44KLICovXG4gIE5vZGUsXG4gIC8qKiB2YWx1ZeWxnuaAp+OBjOeVsOOBquOCi++8iGlucHV06KaB57Sg55So77yJICovXG4gIFZhbHVlLFxuICAvKiog5bGe5oCn44GM55Ww44Gq44KLICovXG4gIEF0dHJcbn1cbi8qKlxuICog5beu5YiG5qSc55+l44KS6KGM44GGXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqL1xuY29uc3QgaGFzQ2hhbmdlZCA9IChhOiBOb2RlVHlwZSwgYjogTm9kZVR5cGUpOiBDaGFuZ2VkVHlwZSA9PiB7XG4gIGlmICh0eXBlb2YgYSAhPT0gdHlwZW9mIGIpIHtcbiAgICByZXR1cm4gQ2hhbmdlZFR5cGUuVHlwZVxuICB9XG5cbiAgaWYgKCFpc1ZOb2RlKGEpICYmIGEgIT09IGIpIHtcbiAgICByZXR1cm4gQ2hhbmdlZFR5cGUuVGV4dFxuICB9XG5cbiAgaWYgKGlzVk5vZGUoYSkgJiYgaXNWTm9kZShiKSkge1xuICAgIGlmIChhLm5vZGVOYW1lICE9PSBiLm5vZGVOYW1lKSB7XG4gICAgICByZXR1cm4gQ2hhbmdlZFR5cGUuTm9kZVxuICAgIH1cblxuICAgIGlmIChhLmF0dHJpYnV0ZXMudmFsdWUgIT09IGIuYXR0cmlidXRlcy52YWx1ZSkge1xuICAgICAgcmV0dXJuIENoYW5nZWRUeXBlLlZhbHVlXG4gICAgfVxuXG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KGEuYXR0cmlidXRlcykgIT09IEpTT04uc3RyaW5naWZ5KGIuYXR0cmlidXRlcykpIHtcbiAgICAgIC8vIOacrOadpeOBquOCieOCquODluOCuOOCp+OCr+ODiOOBsuOBqOOBpOOBsuOBqOOBpOOCkuavlOi8g+OBmeOBueOBjeOBquOBruOBp+OBmeOBjOOAgeOCt+ODs+ODl+ODq+OBquWun+ijheOBq+OBmeOCi+OBn+OCgeOBq0pTT04uc3RyaW5naWZ544KS5L2/44Gj44Gm44GE44G+44GZXG4gICAgICAvLyBKU09OLnN0cmluZ2lmeeOCkuS9v+OBo+OBn+OCquODluOCuOOCp+OCr+ODiOOBruavlOi8g+OBr+e9oOOBjOWkmuOBhOOBruOBp+OAgeOBp+OBjeOCi+OBoOOBkeS9v+OCj+OBquOBhOOBu+OBhuOBjOiJr+OBhOOBp+OBmVxuICAgICAgcmV0dXJuIENoYW5nZWRUeXBlLkF0dHJcbiAgICB9XG4gIH1cblxuICByZXR1cm4gQ2hhbmdlZFR5cGUuTm9uZVxufVxuXG4vKipcbiAqIOODquOCouODq0RPTeOCkuS9nOaIkOOBmeOCi1xuICogQHBhcmFtIG5vZGUg5L2c5oiQ44GZ44KLTm9kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlOiBOb2RlVHlwZSk6IEhUTUxFbGVtZW50IHwgVGV4dCB7XG4gIGlmICghaXNWTm9kZShub2RlKSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlLnRvU3RyaW5nKCkpXG4gIH1cblxuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS5ub2RlTmFtZSlcbiAgc2V0QXR0cmlidXRlcyhlbCwgbm9kZS5hdHRyaWJ1dGVzKVxuICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gZWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChjaGlsZCkpKVxuXG4gIHJldHVybiBlbFxufVxuXG4vKipcbiAqIOS7ruaDs0RPTeOBruW3ruWIhuOCkuaknOefpeOBl+OAgeODquOCouODq0RPTeOBq+WPjeaYoOOBmeOCi1xuICogQHBhcmFtIHBhcmVudCDopqropoHntKBcbiAqIEBwYXJhbSBvbGROb2RlIOWPpOOBhE5vZGXmg4XloLFcbiAqIEBwYXJhbSBuZXdOb2RlIOaWsOOBl+OBhE5vZGXmg4XloLFcbiAqIEBwYXJhbSBpbmRleCDlrZDopoHntKDjga7poIbnlapcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnQocGFyZW50OiBIVE1MRWxlbWVudCwgb2xkTm9kZTogTm9kZVR5cGUsIG5ld05vZGU6IE5vZGVUeXBlLCBpbmRleCA9IDApOiB2b2lkIHtcbiAgLy8gb2xkTm9kZeOBjOOBquOBhOWgtOWQiOOBr+aWsOOBl+OBhE5vZGXjgpLkvZzmiJDjgZnjgotcbiAgaWYgKCFvbGROb2RlKSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSkpXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBuZXdOb2Rl44GM44Gq44GE5aC05ZCI44Gv5YmK6Zmk44GV44KM44Gf44Go5Yik5pat44GX44CB44Gd44GuTm9kZeOCkuWJiumZpOOBmeOCi1xuICBjb25zdCB0YXJnZXQgPSBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF1cbiAgaWYgKCFuZXdOb2RlKSB7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHRhcmdldClcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIOW3ruWIhuaknOefpeOBl+OAgeODkeODg+ODgeWHpueQhu+8iOWkieabtOeuh+aJgOOBoOOBkeWPjeaYoO+8ieOCkuihjOOBhlxuICBjb25zdCBjaGFuZ2VUeXBlID0gaGFzQ2hhbmdlZChvbGROb2RlLCBuZXdOb2RlKVxuICBzd2l0Y2ggKGNoYW5nZVR5cGUpIHtcbiAgICBjYXNlIENoYW5nZWRUeXBlLlR5cGU6XG4gICAgY2FzZSBDaGFuZ2VkVHlwZS5UZXh0OlxuICAgIGNhc2UgQ2hhbmdlZFR5cGUuTm9kZTpcbiAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoY3JlYXRlRWxlbWVudChuZXdOb2RlKSwgdGFyZ2V0KVxuICAgICAgcmV0dXJuXG4gICAgY2FzZSBDaGFuZ2VkVHlwZS5WYWx1ZTpcbiAgICAgIHVwZGF0ZVZhbHVlKHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50LCAobmV3Tm9kZSBhcyBWTm9kZSkuYXR0cmlidXRlcy52YWx1ZSBhcyBzdHJpbmcpXG4gICAgICByZXR1cm5cbiAgICBjYXNlIENoYW5nZWRUeXBlLkF0dHI6XG4gICAgICB1cGRhdGVBdHRyaWJ1dGVzKHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50LCAob2xkTm9kZSBhcyBWTm9kZSkuYXR0cmlidXRlcywgKG5ld05vZGUgYXMgVk5vZGUpLmF0dHJpYnV0ZXMpXG4gICAgICByZXR1cm5cbiAgfVxuXG4gIC8vIOWtkOimgee0oOOBruW3ruWIhuaknOefpeODu+ODquOCouODq0RPTeWPjeaYoOOCkuWGjeW4sOeahOOBq+Wun+ihjOOBmeOCi1xuICBpZiAoaXNWTm9kZShvbGROb2RlKSAmJiBpc1ZOb2RlKG5ld05vZGUpKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdOb2RlLmNoaWxkcmVuLmxlbmd0aCB8fCBpIDwgb2xkTm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgdXBkYXRlRWxlbWVudCh0YXJnZXQgYXMgSFRNTEVsZW1lbnQsIG9sZE5vZGUuY2hpbGRyZW5baV0sIG5ld05vZGUuY2hpbGRyZW5baV0sIGkpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBBY3Rpb25UcmVlIH0gZnJvbSAnLi9mcmFtZXdvcmsvYWN0aW9uJ1xuaW1wb3J0IHsgVmlldywgaCB9IGZyb20gJy4vZnJhbWV3b3JrL3ZpZXcnXG5pbXBvcnQgeyBBcHAgfSBmcm9tICcuL2ZyYW1ld29yay9jb250cm9sbGVyJ1xuXG4vKipcbiAqIFN0YXRlOiDnirbmhYvnrqHnkIZcbiAqL1xudHlwZSBUYXNrID0gc3RyaW5nXG50eXBlIEZvcm0gPSB7XG4gIC8qKiDjgr/jgrnjgq/jga7jgr/jgqTjg4jjg6sgKi9cbiAgdGl0bGU6IHN0cmluZ1xuICAvKiog44OQ44Oq44OH44O844K344On44Oz57WQ5p6cICovXG4gIGhhc0Vycm9yOiBib29sZWFuXG59XG50eXBlIFN0YXRlID0ge1xuICAvKiog44K/44K544Kv5LiA6KanICovXG4gIHRhc2tzOiBUYXNrW11cbiAgLyoqIOODleOCqeODvOODoOOBrueKtuaFiyAqL1xuICBmb3JtOiBGb3JtXG59XG5jb25zdCBzdGF0ZTogU3RhdGUgPSB7XG4gIHRhc2tzOiBbJ0xlYXJuIGFib3V0IFZpcnR1YWwgRE9NJywgJ1dyaXRlIGEgZG9jdW1lbnQnXSxcbiAgZm9ybToge1xuICAgIHRpdGxlOiAnJyxcbiAgICBoYXNFcnJvcjogZmFsc2VcbiAgfVxufVxuXG4vKipcbiAqIEFjdGlvbnM6IOWQhOeoruOCpOODmeODs+ODiOWHpueQhlxuICovXG5pbnRlcmZhY2UgQWN0aW9ucyBleHRlbmRzIEFjdGlvblRyZWU8U3RhdGU+IHtcbiAgLyoqIOOCv+OCpOODiOODq+OBruWFpeWKm+ODgeOCp+ODg+OCr+OCkuihjOOBhiAqL1xuICB2YWxpZGF0ZTogKHN0YXRlOiBTdGF0ZSwgdGl0bGU6IHN0cmluZykgPT4gYm9vbGVhblxuICAvKiog5paw44GX44GE44K/44K544Kv44KS5L2c5oiQ44GZ44KLICovXG4gIGNyZWF0ZVRhc2s6IChzdGF0ZTogU3RhdGUsIHRpdGxlOiBzdHJpbmcpID0+IHZvaWRcbiAgLyoqIGluZGV444Gn5oyH5a6a44GX44Gf44K/44K544Kv44KS5YmK6Zmk44GZ44KLICovXG4gIHJlbW92ZVRhc2s6IChzdGF0ZTogU3RhdGUsIGluZGV4OiBudW1iZXIpID0+IHZvaWRcbn1cbmNvbnN0IGFjdGlvbnM6IEFjdGlvbnMgPSB7XG4gIHZhbGlkYXRlKHN0YXRlLCB0aXRsZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aXRsZSB8fCB0aXRsZS5sZW5ndGggPCAzIHx8IHRpdGxlLmxlbmd0aCA+IDIwKSB7XG4gICAgICBzdGF0ZS5mb3JtLmhhc0Vycm9yID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5mb3JtLmhhc0Vycm9yID0gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gIXN0YXRlLmZvcm0uaGFzRXJyb3JcbiAgfSxcblxuICBjcmVhdGVUYXNrKHN0YXRlLCB0aXRsZSA9ICcnKSB7XG4gICAgc3RhdGUudGFza3MucHVzaCh0aXRsZSlcbiAgICBzdGF0ZS5mb3JtLnRpdGxlID0gJydcbiAgfSxcblxuICByZW1vdmVUYXNrKHN0YXRlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgc3RhdGUudGFza3Muc3BsaWNlKGluZGV4LCAxKVxuICB9XG59XG5cbi8qKlxuICogVmlldzog5o+P55S76Zai6YCjXG4gKi9cbmNvbnN0IHZpZXc6IFZpZXc8U3RhdGUsIEFjdGlvbnM+ID0gKHN0YXRlLCBhY3Rpb25zKSA9PiB7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICByZXR1cm4gaChcbiAgICAnZGl2JyxcbiAgICB7XG4gICAgICBjbGFzczogJ25lcy1jb250YWluZXIgaXMtcm91bmRlZCcsXG4gICAgICBzdHlsZTogJ3BhZGRpbmc6IDJyZW07J1xuICAgIH0sXG4gICAgaChcbiAgICAgICdoMScsXG4gICAgICB7XG4gICAgICAgIGNsYXNzOiAndGl0bGUnLFxuICAgICAgICBzdHlsZTogJ21hcmdpbi1ib3R0b206IDJyZW07J1xuICAgICAgfSxcbiAgICAgIGgoJ2knLCB7IGNsYXNzOiAnbmVzLWljb24gaGVhcnQgaXMtbWVkaXVtJyB9KSxcbiAgICAgICdWaXJ0dWFsIERPTSBUT0RPIEFwcCAnXG4gICAgKSxcbiAgICBoKFxuICAgICAgJ2Zvcm0nLFxuICAgICAge1xuICAgICAgICBjbGFzczogJ25lcy1jb250YWluZXInLFxuICAgICAgICBzdHlsZTogJ21hcmdpbi1ib3R0b206IDJyZW07J1xuICAgICAgfSxcbiAgICAgIGgoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3M6ICduZXMtZmllbGQnLFxuICAgICAgICAgIHN0eWxlOiAnbWFyZ2luLWJvdHRvbTogMXJlbTsnLFxuICAgICAgICB9LFxuICAgICAgICBoKFxuICAgICAgICAgICdsYWJlbCcsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3M6ICdsYWJlbCcsXG4gICAgICAgICAgICBmb3I6ICd0YXNrLXRpdGxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ1RpdGxlJ1xuICAgICAgICApLFxuICAgICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgaWQ6ICd0YXNrLXRpdGxlJyxcbiAgICAgICAgICBjbGFzczogJ25lcy1pbnB1dCcsXG4gICAgICAgICAgdmFsdWU6IHN0YXRlLmZvcm0udGl0bGUsXG4gICAgICAgICAgb25pbnB1dDogKGV2OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXYudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgICAgICAgICAgIHN0YXRlLmZvcm0udGl0bGUgPSB0YXJnZXQudmFsdWVcbiAgICAgICAgICAgIGFjdGlvbnMudmFsaWRhdGUoc3RhdGUsIHRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIGgoXG4gICAgICAgICdwJyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiAnbmVzLXRleHQgaXMtZXJyb3InLFxuICAgICAgICAgIHN0eWxlOiBgZGlzcGxheTogJHtzdGF0ZS5mb3JtLmhhc0Vycm9yID8gJ2Rpc3BsYXknIDogJ25vbmUnfWAsXG4gICAgICAgIH0sXG4gICAgICAgICdFbnRlciBhIHZhbHVlIGJldHdlZW4gMyBhbmQgMjAgY2hhcmFjdGVycydcbiAgICAgICksXG4gICAgICBoKFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgIGNsYXNzOiAnbmVzLWJ0biBpcy1wcmltYXJ5JyxcbiAgICAgICAgICBvbmNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuZm9ybS5oYXNFcnJvcikgcmV0dXJuXG4gICAgICAgICAgICBhY3Rpb25zLmNyZWF0ZVRhc2soc3RhdGUsIHN0YXRlLmZvcm0udGl0bGUpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnQ3JlYXRlJ1xuICAgICAgKVxuICAgICksXG4gICAgaChcbiAgICAgICd1bCcsXG4gICAgICB7IGNsYXNzOiAnbmVzLWxpc3QgaXMtZGlzYyBuZXMtY29udGFpbmVyJyB9LFxuICAgICAgLi4uc3RhdGUudGFza3MubWFwKCh0YXNrLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiBoKFxuICAgICAgICAgICdsaScsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3M6ICdpdGVtJyxcbiAgICAgICAgICAgIHN0eWxlOiAnbWFyZ2luLWJvdHRvbTogMXJlbTsnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0YXNrLFxuICAgICAgICAgIGgoXG4gICAgICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAgIGNsYXNzOiAnbmVzLWJ0biBpcy1lcnJvcicsXG4gICAgICAgICAgICAgIHN0eWxlOiAnbWFyZ2luLWxlZnQ6IDFyZW07JyxcbiAgICAgICAgICAgICAgb25jbGljazogKCkgPT4gYWN0aW9ucy5yZW1vdmVUYXNrKHN0YXRlLCBpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICfDlydcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICApXG59XG5cbm5ldyBBcHA8U3RhdGUsIEFjdGlvbnM+KHtcbiAgZWw6ICcjYXBwJyxcbiAgc3RhdGUsXG4gIHZpZXcsXG4gIGFjdGlvbnNcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9