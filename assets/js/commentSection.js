/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/commentSection.js":
/*!*****************************************!*\
  !*** ./src/client/js/commentSection.js ***!
  \*****************************************/
/***/ (() => {

eval("var videoContainer = document.getElementById(\"videoContainer\");\nvar form = document.getElementById(\"commentForm\");\nvar textarea = form.querySelector(\"textarea\");\n\nvar handleSubmit = function handleSubmit(e) {\n  e.preventDefault();\n  var text = textarea.value;\n  var videoId = videoContainer.dataset.videoid;\n\n  if (text === \"\") {\n    return;\n  }\n\n  ;\n  fetch(\"/api/videos/\".concat(videoId, \"/comments\"), {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text: text\n    })\n  }); // 서버는 js object 이해할 수 없음. json 문자열로 변경 후 전송.\n  // 헤더에 json 보낸다 명시 -> server.js 에서 json() 사용했기에 다시 js object 로 parse 해줌.\n};\n\nform.addEventListener(\"submit\", handleSubmit);\n\n//# sourceURL=webpack://metube/./src/client/js/commentSection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/commentSection.js"]();
/******/ 	
/******/ })()
;