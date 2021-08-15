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

eval("var video = document.querySelector(\"video\");\nvar playBtn = document.getElementById(\"play\");\nvar playBtnIcon = playBtn.querySelector(\"i\");\nvar muteBtn = document.getElementById(\"mute\");\nvar muteBtnIcon = muteBtn.querySelector(\"i\");\nvar volumeRange = document.getElementById(\"volume\");\nvar currentTime = document.getElementById(\"currentTime\");\nvar totalTime = document.getElementById(\"totalTime\");\nvar timeline = document.getElementById(\"timeline\");\nvar fullScreenBtn = document.getElementById(\"fullScreen\");\nvar fullScreenIcon = fullScreenBtn.querySelector(\"i\");\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar videoControls = document.getElementById(\"videoControls\");\nvar controlsTimeOut = null;\nvar controlsMovementTimeout = null;\nvar volumeValue = 0.5;\nvideo.volume = volumeValue;\n\nvar handlePlay = function handlePlay(event) {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtnIcon.classList = video.paused ? \"fas fa-play\" : \"fas fa-hamburger fa-2xl\";\n};\n\nvar handleMute = function handleMute(event) {\n  if (video.muted) {\n    video.muted = false;\n    video.volume = volumeValue;\n    volumeRange.value = volumeValue;\n  } else {\n    video.muted = true;\n    volumeRange.value = 0;\n  }\n\n  muteBtnIcon.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n};\n\nvar handleVolumeChange = function handleVolumeChange(event) {\n  var value = event.target.value;\n\n  if (video.muted) {\n    video.muted = false;\n    muteBtnIcon.classList = \"fas fa-volume-up\";\n  }\n\n  volumeValue = value;\n  video.volume = volumeValue;\n};\n\nvar formatTime = function formatTime(seconds) {\n  return new Date(seconds * 1000).toISOString().substr(14, 5);\n}; // seconds 에 영상 길이를 넣으면 --:-- 형식의 date 객체를 반환하는 hack.\n\n\nvar handleLoadedMetadata = function handleLoadedMetadata() {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\n\nvar handleTimeUpdate = function handleTimeUpdate() {\n  currentTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\n\nvar handleTimeline = function handleTimeline(event) {\n  video.currentTime = event.target.value;\n};\n\nvar handleFullScreen = function handleFullScreen() {\n  var fullscreen = document.fullscreenElement;\n\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullScreenIcon.classList = \"fas fa-expand\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenIcon.classList = \"fas fa-compress\";\n  }\n};\n\nvar hideControls = function hideControls() {\n  return videoControls.classList.remove(\"showing\");\n};\n\nvar handleMouseMove = function handleMouseMove() {\n  if (controlsTimeOut) {\n    clearTimeout(controlsTimeOut);\n    controlsTimeOut = null; // 나갔다 다시 들어와 timeout 이 실행되고 있다면 종료시킨다.\n  }\n\n  videoControls.classList.add(\"showing\");\n\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  } // 마우스가 플레이어 위에서 2000ms 동안 가만히 있으면 controls 를 없애는 코드 \n\n\n  controlsMovementTimeout = setTimeout(hideControls, 1000);\n};\n\nvar handleMouseLeave = function handleMouseLeave() {\n  controlsTimeOut = setTimeout(hideControls, 500); // 3000ms 후에 실행\n  // 마우스가 들어갔다 나왔다 다시 들어갔을 때 실행되고 있는 timeout 을 끄기 위한 변수\n};\n\nplayBtn.addEventListener(\"click\", handlePlay);\nmuteBtn.addEventListener(\"click\", handleMute);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"loadeddata\", handleLoadedMetadata); // metaData 가 모두 load 되었을 때 실행\n\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate); // 현재 비디오의 재생 구간이 변할 때마다 실행\n\ntimeline.addEventListener(\"input\", handleTimeline);\nfullScreenBtn.addEventListener(\"click\", handleFullScreen);\nvideoContainer.addEventListener(\"mousemove\", handleMouseMove);\nvideoContainer.addEventListener(\"mouseleave\", handleMouseLeave); //////////////////////////////////////////////////////\n\nif (video.readyState == 4) {\n  handleLoadedMetadata();\n} // eventListener 가 추가되기 전에 video 가 모두 로딩되어 실행이 안될 수 있음.Math\n// readyState == 4 는 video 가 충분히 로딩되었음을 뜻함.\n\n//# sourceURL=webpack://metube/./src/client/js/videoPlayer.js?");

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