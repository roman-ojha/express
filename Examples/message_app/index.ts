import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import db from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(__dirname, "/public");

(() => {
  try {
    db.connect((err) => {
      if (err) {
        console.error("Database connection error: " + err.stack);
        return;
      }

      // console.log("Database connected as id " + db.threadId);
      console.log("Database connected");
    });

    app.use(express.static(staticPath));
    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "/view"));

    app.get("/", (req, res) => {
      res.render("index", {});
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    db.end();
  } catch (err) {
    console.log(err);
  }
})();
