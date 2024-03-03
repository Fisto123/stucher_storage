import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import uploadroutes from "./routes/upload.js";
import uploadvotezroutes from "./routes/upload_voterz.js";

//import { join } from "path";
import path from "path";

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));

app.use("/", uploadroutes);

app.use("/", uploadvotezroutes);
//app.use("/", uploadScavengeroutes);

// error handler for unhandled promise rejections
process.on("uncaughtException", function (err) {
  console.log(err);
});

app.get("/", (req, res) => {
  res.json("Hello World!");
});
const PORT = 6400;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
