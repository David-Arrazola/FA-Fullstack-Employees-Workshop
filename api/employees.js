import express from "express";
import { getEmployees } from "#db/queries/employees";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});
