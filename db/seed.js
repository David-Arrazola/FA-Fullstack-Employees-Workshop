import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createEmployee, getEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const fakeName = faker.person.fullName();
    const fakeBirthday = faker.date.birthdate();
    const fakeSalary = faker.number.int({ min: 30000, max: 150000 });

    await createEmployee({
      name: fakeName,
      birthday: fakeBirthday,
      salary: fakeSalary,
    });
  }
}
