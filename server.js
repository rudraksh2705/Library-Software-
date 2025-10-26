const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/libraryProj").then(() => {
  console.log("Mongodb Connected");
});
