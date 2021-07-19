export const trending = (req, res) => res.send("Homepage Videos");
export const watch = (req, res) => res.send("Watch Video")
export const edit = (req, res) => res.send("Edit Video")

// export default 를 하면 한 모듈에서 하나의 변수를 export 하게 됨.
// 위와 같은 방법으로 한 파일에서 여러 개를 export 할 수 있음