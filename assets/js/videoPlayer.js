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

eval("var play = document.getElementById(\"play\");\nvar mute = document.getElementById(\"mute\");\nvar currentTime = document.getElementById(\"currentTime\");\nvar totalTime = document.getElementById(\"totalTime\");\nvar volumeRange = document.getElementById(\"volume\");\nvar video = document.querySelector(\"video\");\nvar timeline = document.getElementById(\"timeline\");\nvar volumeValue = 0.5;\nvideo.volume = volumeValue;\n\nvar handlePlay = function handlePlay(event) {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  play.innerText = video.paused ? \"play\" : \"pause\";\n};\n\nvar handleMute = function handleMute(event) {\n  if (video.muted) {\n    video.muted = false;\n    video.volume = volumeValue;\n    volumeRange.value = volumeValue;\n  } else {\n    video.muted = true;\n    volumeRange.value = 0;\n  }\n\n  mute.innerText = video.muted ? \"Unmute\" : \"Mute\";\n};\n\nvar handleVolumeChange = function handleVolumeChange(event) {\n  var value = event.target.value;\n\n  if (video.muted) {\n    video.muted = false;\n    mute.innerText = \"Mute\";\n  }\n\n  volumeValue = value;\n  video.volume = volumeValue;\n};\n\nvar formatTime = function formatTime(seconds) {\n  return new Date(seconds * 1000).toISOString().substr(14, 5);\n}; // seconds 에 영상 길이를 넣으면 --:-- 형식의 date 객체를 반환하는 hack.\n\n\nvar handleLoadedMetadata = function handleLoadedMetadata() {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\n\nvar handleTimeUpdate = function handleTimeUpdate() {\n  currentTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\n\nvar handleTimeline = function handleTimeline(event) {\n  video.currentTime = event.target.value;\n};\n\nplay.addEventListener(\"click\", handlePlay);\nmute.addEventListener(\"click\", handleMute);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"loadedmetadata\", handleLoadedMetadata); // metaData 가 모두 load 되었을 때 실행\n\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate); // 현재 비디오의 재생 구간이 변할 때마다 실행\n\ntimeline.addEventListener(\"input\", handleTimeline); //////////////////////////////////////////////////////\n\nif (video.readyState == 4) {\n  handleLoadedMetadata();\n} // eventListener 가 추가되기 전에 video 가 모두 로딩되어 실행이 안될 수 있음.Math\n// readyState == 4 는 video 가 충분히 로딩되었음을 뜻함.\n\n//# sourceURL=webpack://metube/./src/client/js/videoPlayer.js?");

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