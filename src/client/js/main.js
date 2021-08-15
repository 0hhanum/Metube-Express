import "../scss/styles.scss";
// 이것 때문에 css 가 FE 에서 작동하는 게 아님. webpack 이 위 코드를 통해 css 파일을 읽고
// extractPlugin 이 css 를 따로 추출해줌. 그 후 base.pug 에서 stylesheet 를 통해 import!

console.log("hello");