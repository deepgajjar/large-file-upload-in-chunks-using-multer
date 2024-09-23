import express from "express";
import cors from "cors";
import multer from "multer";
import uploadRouter from "./routes/upload.js";

const app = express();
app.use(
  express.json({
    limit: "500MB",
  })
);

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("File size limit exceeded (max 500MB).");
    }
  }
  res.status(500).send(err.message);
});
app.use(express.static("public"));

app.use("/api", uploadRouter);
app.listen(4001, () => {
  console.log("server is running");
});
