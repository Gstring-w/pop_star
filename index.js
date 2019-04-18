const express = require("express");
const app = express();

app.use(express.static("./public"));
app.listen(3344, function() {
  console.log("服务启动");
});
