import pkg from 'pg';
const { Client } = pkg;

async function main() {
  const client = new Client({
    connectionString: "postgresql://postgres:postgres@localhost:5432/cibdhk_sql?schema=public"
  });
  try {
    await client.connect();
    const res = await client.query('SELECT * FROM "branches"');
    console.log("Branches rows count:", res.rows.length);
    console.log("Branches:", res.rows);
  } catch (err) {
    console.error("Database query error:", err);
  } finally {
    await client.end();
  }
}

main();
