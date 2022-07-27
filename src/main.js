import count from "./js/count.js";
import sum from "./js/sum.js";
import "./css/iconfont.css";
import "./css/index.css";
import "./less/index.less";
import "./scss/index.scss";
import "./stylus/index.styl";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));

// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept("./js/count.js");
  module.hot.accept("./js/sum.js");
}
