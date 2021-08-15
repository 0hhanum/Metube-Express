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

eval("var play = document.getElementById(\"play\");\nvar mute = document.getElementById(\"mute\");\nvar time = document.getElementById(\"time\");\nvar volumeRange = document.getElementById(\"volume\");\nvar video = document.querySelector(\"video\");\nvar volumeValue = 0.5;\nvideo.volume = volumeValue;\n\nvar handlePlay = function handlePlay(event) {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  play.innerText = video.paused ? \"play\" : \"pause\";\n};\n\nvar handleMute = function handleMute(event) {\n  if (video.muted) {\n    video.muted = false;\n    video.volume = volumeValue;\n    volumeRange.value = volumeValue;\n  } else {\n    video.muted = true;\n    volumeRange.value = 0;\n  }\n\n  mute.innerText = video.muted ? \"Unmute\" : \"Mute\";\n};\n\nvar handleVolumeChange = function handleVolumeChange(event) {\n  var value = event.target.value;\n\n  if (video.muted) {\n    video.muted = false;\n    mute.innerText = \"Mute\";\n  }\n\n  volumeValue = value;\n  video.volume = volumeValue;\n};\n\nplay.addEventListener(\"click\", handlePlay);\nmute.addEventListener(\"click\", handleMute);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\n\n//# sourceURL=webpack://metube/./src/client/js/videoPlayer.js?");

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