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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const urlJson = \"./json/entities.json\";\nconst buttonDom = \".js-inputAskForSearchButton\";\nconst inputDom = \".js-inputAskForSearch\";\nconst notifDom = \".js-notificationRow\";\nconst cptDom = \".js-goodResultCpt\";\nconst tagFoundDom = \".js-displayGoodResults\";\n\n\nlet myJson = [];\nlet founds = [];\nconst cptStr = \" tags founds.\";\n\nfetch(urlJson)\n  .then(response => response.json())\n  .then(json => displayObjFromJson(json))\n  .then(x=>addEventOnSearch());\n\n\n\n\n  function displayObjFromJson(json)\n  {\n    myJson = json;\n  };\n\n  function addEventOnSearch()\n  {\n\n    let but = document.querySelector(buttonDom);\n    let input = document.querySelector(inputDom);\n\n    but.addEventListener(\"click\", ev => {\n        let val = input.value;\n        testValueFromInput(val);\n      }\n    );\n\n    input.addEventListener('keypress', ev =>\n    {\n        if(ev.keyCode === 13)\n        {\n          testValueFromInput(input.value);\n        }\n    });\n  };\n\n  function testValueFromInput(value)\n  {\n\n    if(isAnHTMLTag(value))\n    {\n\n        if(founds.indexOf(value) > -1)\n        {\n          handleAlreadyExists(value);\n        }\n        else\n        {\n          handleSuccess(value);\n        }\n    }\n    else\n    {\n      handleFailure(value);\n    }\n\n  }\n\n\n\n  function isAnHTMLTag(str)\n  {\n    if(myJson.indexOf(str) > -1)\n    {\n      return true;\n    }\n    else {\n      return false;\n    }\n  };\n\n  function handleSuccess(str)\n  {\n    founds.push(str);\n\n    let foundsDisplay = document.querySelector(tagFoundDom);\n    let tag = document.createElement(\"p\");\n    tag.innerHTML = str;\n    foundsDisplay.appendChild(tag);\n\n    let cpt = document.querySelector(cptDom+\" p\");\n    if(!cpt)\n    {\n      let el = document.createElement(\"p\");\n      el.innerHTML = founds.length+cptStr;\n      document.querySelector(cptDom).appendChild(el);\n    }\n    else\n    {\n      cpt.innerHTML = founds.length+cptStr;\n    }\n\n    let input = document.querySelector(inputDom).value = \"\";\n    handleNotif(str, \"success\");\n\n\n  }\n\n  function handleFailure(str)\n  {\n    handleNotif(str, \"fail\");\n  }\n\n  function handleAlreadyExists(str)\n  {\n    handleNotif(str, \"exists\");\n\n  }  \n\n  function handleNotif(str, state)\n  {\n    let dom = document.querySelector(notifDom);\n\n    if(state === \"success\")\n    {\n      dom.innerHTML = \"Success, \"+str+\" is a HTML5 tag.\";\n    }\n    else if (state === \"exists\")\n    {\n      dom.innerHTML = str+\" already founds.\";\n    }\n    else\n    {\n      dom.innerHTML = \"Failure, \"+str+\" is not a HTML5 tag.\";\n    }\n\n  }\n\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ })

/******/ });