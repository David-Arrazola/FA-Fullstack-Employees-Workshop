import express from "express";
import router from "#api/employees";
const app = express();
export default app;

app.use(express.json());

app.use("/", (req, res, next) => {
  console.log(req.method + " " + req.originalUrl);
  next(); //*"next()" will go proceed the code to see if "REQ" matches anything else before ending
});
//* This is the "Logging Middleware"

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use("/employees", router);
//*This is "Routing Middleware"

app.use("/", (err, req, res, next) => {
  console.error(err);

  res.status(500).send("Something went wrong");
});
//*This is the "Error-handling Middleware"
