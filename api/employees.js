import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
} from "#db/queries/employees";
const router = express.Router();
export default router;

//! This router has to be at the top. If it is lower than "GET /", it will match
//! with that first and exceute the WRONG code
router.get("/:id", async (req, res) => {
  try {
    const MAX_INT = 2147483647; //* max number for Postgres integer
    const { id } = req.params;
    const numId = Number(id);

    if (numId < 0 || numId > MAX_INT) {
      res.status(400).send("Provided ID is not a positive integer");
    }
    const selectedEmployee = await getEmployee(numId);

    !selectedEmployee
      ? res.status(404).send("Selected employee does not exist")
      : res.send(selectedEmployee);
  } catch (e) {
    console.error(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (e) {
    console.error(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const MAX_INT = 2147483647; //* max number for Postgres integer

    const { id } = req.params;
    const numId = Number(id);

    if (numId < 0 || numId > MAX_INT) {
      res.status(400).send("Selected ID is not a positive integer");
    }

    const deleted = await deleteEmployee(numId);
    !deleted
      ? res.status(404).send("Selected employee does not exist")
      : res.status(204).send(deleted);
  } catch (e) {
    console.error(e);
  }
});

router.post("/", async (req, res) => {
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
