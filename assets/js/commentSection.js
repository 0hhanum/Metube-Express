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

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar form = document.getElementById(\"commentForm\");\nvar textarea = form.querySelector(\"textarea\");\n\nvar addComment = function addComment(text) {\n  var videoComments = document.querySelector(\".video__comments ul\");\n  var newComment = document.createElement(\"li\");\n  var commentOwner = document.createElement(\"span\");\n  var commentText = document.createElement(\"span\");\n  commentText.innerText = text;\n  commentOwner.innerText = \"익명\";\n  newComment.appendChild(commentText);\n  newComment.appendChild(commentOwner);\n  newComment.className = \"video__comment\";\n  commentText.className = \"comment__text\";\n  videoComments.prepend(newComment);\n};\n\nvar handleSubmit = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {\n    var text, videoId, _yield$fetch, status;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            e.preventDefault();\n            text = textarea.value;\n            videoId = videoContainer.dataset.videoid;\n\n            if (!(text === \"\")) {\n              _context.next = 5;\n              break;\n            }\n\n            return _context.abrupt(\"return\");\n\n          case 5:\n            ;\n            _context.next = 8;\n            return fetch(\"/api/videos/\".concat(videoId, \"/comments\"), {\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                text: text\n              })\n            });\n\n          case 8:\n            _yield$fetch = _context.sent;\n            status = _yield$fetch.status;\n            // 서버는 js object 이해할 수 없음. stringify 이용해 json 문자열로 변경 후 전송\n            // 헤더에 json 보낸다 명시 -> server.js 에서 json() 사용했기에 req.body 에서 js object 로 parse 된 object 사용 가능.\n            textarea.value = \"\";\n\n            if (status === 201) {\n              addComment(text);\n            }\n\n            ;\n\n          case 13:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function handleSubmit(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nform.addEventListener(\"submit\", handleSubmit);\n\n//# sourceURL=webpack://metube/./src/client/js/commentSection.js?");

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