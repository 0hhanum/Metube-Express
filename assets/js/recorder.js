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

/***/ "./src/client/js/recorder.js":
/*!***********************************!*\
  !*** ./src/client/js/recorder.js ***!
  \***********************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar startBtn = document.getElementById(\"startBtn\");\nvar video = document.getElementById(\"preview\"); // FE 에서 async await 를 사용하려면 regeneratorRuntime 설치해야함.\n// client/main.js 에서 import 했음. =>  base.pug 에서 scripts 로 받아오고 있음.\n\nvar stream; // 함수 간 stream 을 공유하기 위해 비어있는 변수 만들기.\n\nvar recorder;\n\nvar init = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return navigator.mediaDevices.getUserMedia({\n              audio: false,\n              video: true\n            });\n\n          case 2:\n            stream = _context.sent;\n            video.srcObject = stream;\n            video.play();\n\n          case 5:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function init() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar handleStop = function handleStop() {\n  startBtn.innerText = \"다운로드\";\n  startBtn.removeEventListener(\"click\", handleStop);\n  startBtn.addEventListener(\"click\", handleStart);\n  recorder.stop();\n};\n\nvar handleStart = function handleStart() {\n  startBtn.innerText = \"녹화 중지\";\n  startBtn.removeEventListener(\"click\", handleStart);\n  startBtn.addEventListener(\"click\", handleStop);\n  recorder = new MediaRecorder(stream);\n\n  recorder.ondataavailable = function (event) {\n    var videoFile = URL.createObjectURL(event.data); // 이 url 은 브라우저 메모리에만 존재. 실제로는 X\n\n    video.srcObject = null; // srcObject 에서 실제 file 의 src 로 변경\n\n    video.src = videoFile;\n    video.play();\n    video.loop = true;\n  }; // recorder 의 start 메소드가 완료되었을 때 발생하는 event \n  // 위 라인은 console.log(recorder.ondataavailable) 과 동일한듯.   \n\n\n  recorder.start();\n  setTimeout(function () {\n    recorder.stop();\n  }, 10000);\n};\n\ninit();\nstartBtn.addEventListener(\"click\", handleStart);\n\n//# sourceURL=webpack://metube/./src/client/js/recorder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/recorder.js"]();
/******/ 	
/******/ })()
;