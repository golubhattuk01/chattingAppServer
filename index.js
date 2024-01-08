import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import app from "./src/app.js";

dotenv.config({
  path: "./.env",
});
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("CONNECTING SUCCESS");
      // console.log(` port number : ${process.env.VITE_PORT}`);
    });
  })
  .catch((err) => {
    console.log(`CONNECTION FAILD WITH DB : ${err}`);
  });
