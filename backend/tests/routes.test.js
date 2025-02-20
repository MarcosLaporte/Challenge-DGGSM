const app = require("../index");
const request = require("supertest");

describe("Employee requests", () => {
  const PATH = "/employees";

  it("should get a list of employees", async () => {
    const response = await request(app).get(PATH);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should fail if employee id number does not exist", async () => {
    const response = await request(app).get(PATH + "/-1");

    expect(response.statusCode).toBe(404);
  });

  it("should create, get, update and delete a new employee", async () => {
    const idNo = 99999999;
    const newEmployee = { fullName: "Test Employee", idNo: idNo, birthDate: "1999-01-01", isDev: true, description: "Mock employee for test", areaId: 101 };

    //CREATE
    const postRes = await request(app)
      .post(PATH)
      .send(newEmployee);

    expect(postRes.statusCode).toBe(201);
    expect(postRes.body.insertId).toBeDefined();

    //GET
    const response = await request(app).get(`${PATH}/${idNo}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("idNo", idNo);

    //UPDATE
    const putRes = await request(app)
      .put(`${PATH}/${idNo}`)
      .send({ fullName: "UPDATED Test Employee", isDev: false });

    expect(putRes.statusCode).toBe(200);
    expect(putRes.body.affectedRows).toBe(1);

    //DELETE
    const deleteRes = await request(app).delete(`${PATH}/${idNo}`);

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.affectedRows).toBe(1);
  });

  it("should fail if fields are missing when creating", async () => {
    const newEmployee = { fullName: "Test Employee", description: "Incomplete employee" };
    const response = await request(app)
      .post(PATH)
      .send(newEmployee);

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBeDefined();
  });

});

describe("Area requests", () => {
  const PATH = "/areas";

  it("should get a list of areas", async () => {
    const response = await request(app).get(PATH);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should fail if area id does not exist", async () => {
    const response = await request(app).get(PATH + "/-1");

    expect(response.statusCode).toBe(404);
  });

  it("should create, get, update and delete a new area", async () => {
    const newArea = { area: "Test Area" };

    //CREATE
    const postRes = await request(app)
      .post(PATH)
      .send(newArea);

    expect(postRes.statusCode).toBe(201);
    expect(postRes.body.insertId).toBeDefined();

    const id = postRes.body.insertId;
    //GET
    const response = await request(app).get(`${PATH}/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", id);

    //UPDATE
    const putRes = await request(app)
      .put(`${PATH}/${id}`)
      .send({ area: "UPDATED Test Area" });

    expect(putRes.statusCode).toBe(200);
    expect(putRes.body.affectedRows).toBe(1);

    //DELETE
    const deleteRes = await request(app).delete(`${PATH}/${id}`);

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.affectedRows).toBe(1);
  });

  it("should fail if fields are missing when creating", async () => {
    const newArea = {};
    const response = await request(app)
      .post(PATH)
      .send(newArea);

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBeDefined();
  });

});