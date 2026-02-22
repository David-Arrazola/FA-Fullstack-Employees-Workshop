import express from "express";
import { createEmployee, getEmployees } from "#db/queries/employees";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (e) {
    console.error(e);
  }
});

router.use("/", async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send("Body was not provided");
    }

    if (
      !req.body.id ||
      !req.body.name ||
      !req.body.birthday ||
      !req.body.salary
    ) {
      res.status(400).send("One of the required fields is missing");
    }
    const employee = await createEmployee(req.body);
    res.status(201).send(employee);
  } catch (e) {
    console.error(e);
  }
});
