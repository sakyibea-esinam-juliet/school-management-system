const express = require("express");
const app = express();
const studentrouter = require("./routes/students");
const teacherrouter = require("./routes/teachers")
// const { ST_FILE, TE_FILE } = require("./utils/fileHandler");
app.use(express.json());
app.use("/", studentrouter);
app.use("/",teacherrouter )

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
