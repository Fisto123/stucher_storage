import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import uploadroutes from "./routes/upload.js";

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", uploadroutes);

// error handler for unhandled promise rejections
process.on("uncaughtException", function (err) {
  console.log(err);
});

app.get("/", (req, res) => {
  res.json("Hello World!");
});
const PORT = 4100;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
