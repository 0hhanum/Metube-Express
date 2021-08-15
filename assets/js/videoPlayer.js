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

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("var play = document.getElementById(\"play\");\nvar mute = document.getElementById(\"mute\");\nvar time = document.getElementById(\"time\");\nvar volume = document.getElementById(\"volume\");\nvar video = document.querySelector(\"video\");\n\nvar handlePlay = function handlePlay(event) {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  play.innerText = video.paused ? \"play\" : \"pause\";\n};\n\nvar handleMute = function handleMute(event) {};\n\nplay.addEventListener(\"click\", handlePlay);\nmute.addEventListener(\"click\", handleMute);\n\n//# sourceURL=webpack://metube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;