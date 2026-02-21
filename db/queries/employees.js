import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  //!Making a new user means that we have to make a new ROW entry in DB "fullstack_employees"
  try {
    const sql = `
      INSERT INTO employees (name, birthday, salary)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await db.query(sql, [name, birthday, salary]);
    const employees = rows;
    const NEW_EMPLOYEE_INDEX = employees.length - 1;
    return employees[NEW_EMPLOYEE_INDEX];
  } catch (error) {
    console.error(error);
  }
}

// === Part 2 ===

/** @returns all employees */
//*fuction has been tested and works
export async function getEmployees() {
  try {
    const sql = `
    SELECT * FROM employees;
    `;
    const { rows } = await db.query(sql); //*"rows" = array of all employee rows
    const employees = rows;

    return employees;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  try {
    const sql = `SELECT * FROM employees WHERE id = $1`;
    const { rows } = await db.query(sql, [id]); //* "rows" is an array containing the row selected
    const selectedEmployee = rows;

    return selectedEmployee[0];
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  try {
    const sql = `
    UPDATE employees
    SET (name, birthday, salary) = ($1, $2, $3) WHERE id = $4
    RETURNING *;
    `;

    const { rows } = await db.query(sql, [name, birthday, salary, id]);
    const modifiedEmployee = rows;

    return modifiedEmployee[0];
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  try {
    const sql = `
      DELETE FROM employees WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await db.query(sql, [id]);
    const deleted = rows;

    return deleted[0];
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
