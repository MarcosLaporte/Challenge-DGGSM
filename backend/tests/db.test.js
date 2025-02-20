const db = require("../db");
const mysql = require("mysql2/promise");

describe("Database connection", () => {

  it("should connect to the database", async () => {
    const connection = await db.getConnection();
    expect(connection).toBeDefined();
    connection.release();
  });

  it("should fail if credentials are incorrect", async () => {
    const pool = mysql.createPool({
      host: "wrong-host",
      user: "wrong-user",
      password: "wrong-pass",
      database: "wrong-db",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    await expect(pool.getConnection()).rejects.toThrow();
  });
});

describe("Tables presence", () => {

  it("should have an employees table", async () => {
    const [rows] = await db.query("SHOW TABLES LIKE 'employees'");
    expect(rows.length).toBe(1);
  });

  it("should have an areas table", async () => {
    const [rows] = await db.query("SHOW TABLES LIKE 'areas'");
    expect(rows.length).toBe(1);
  });
});
