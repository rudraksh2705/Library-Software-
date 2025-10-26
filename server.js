const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/libraryProj", {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✓ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("✗ MongoDB Connection Error:", err.message);
    console.log("\nPlease make sure MongoDB is running on your system.");
    console.log("To start MongoDB:");
    console.log(
      "1. Download from: https://www.mongodb.com/try/download/community"
    );
    console.log("2. Start the service: net start MongoDB");
    process.exit(1);
  });

// Start server
app.listen(port, () => {
  console.log(`✓ Server is running on port ${port}`);
  console.log(`✓ API: http://localhost:${port}/api/v1`);
});
