import app from "#app";
import db from "#db/client";

const PORT = process.env.PORT ?? 4000;

await db.connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
