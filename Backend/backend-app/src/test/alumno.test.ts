import * as dotenv from "dotenv";
dotenv.config();
import app from "../app";
import request from "supertest";
import { describe, it, expect, beforeAll,afterAll } from "vitest";
import jwt, { Secret } from "jsonwebtoken";


const api = request(app);
let id: any;
let email1: any;
describe("POST, add, /api/alumnos", () => {
  it("should add one user", async () => {
    const res = await api.post("/api/alumnos").send({
      name: "Juan",
      lastname: "Doe",
      age: 35,
      email: "jdoe@gmail.com",
      password: "12345",
    });
    id = res.body.data.id;


    expect(res.statusCode).toBe(201);
  });




  it("should not add a user if already registered", async () => {
    const res = await api.post("/api/alumnos").send({
      name: "Juan",
      lastname: "Doe",
      age: 35,
      email: "jdoe@gmail.com",
      password: "12345",
    });
    expect(res.statusCode).toBe(400);
  });
});




describe("GET, findOne, /api/alumnos", () => {
  it("should return one user", async () => {
    const email = "jdoe@gmail.com";
    const res = await api.get("/api/alumnos/email/" + email);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.email).toBe(email);
    expect(res.body.data).not.toBeNull();
  });


  it("shouldn´t return one user, email not found", async () => {
    const email = "jdoe2@gmail.com";
    const res = await api.get("/api/alumnos/email/" + email);
    expect(res.statusCode).toBe(500);
  });
});


describe("GET, findAll, /api/alumnos", () => {
  it("should return all users", async () => {
    const res = await api.get("/api/alumnos");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).not.toBeNull();
  });

  it("shouldn't return all users", async () => {
    const res = await api.get("/api/alumnos");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).not.toBeNull();
  });
});


describe("GET, findOneById, /api/alumnos/id:", () => {
  it("should find alumno by ID", async () => {
   
    const res = await api.get("/api/alumnos/" + id);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).not.toBeNull();
  });


  it("shouldn't find alumno by ID", async () => {
    const id1 = "65de47ba31b3c40db1dd"; /* id inexistente */
    const res = await api.get("/api/alumnos/" + id1);
    expect(res.statusCode).toBe(500);
  });
});


describe("PUT-PATCH y DELETE, update-remove, /api/alumnos", () => {
  let token: string;


  beforeAll(async () => {
    const res = await api.post("/api/user/login").send({
      email: "jdoe@gmail.com",
      password: "12345",
    });
    token = res.body.token;
  });




  it("should update one user", async () => {
    const secretJWT = process.env.SECRETJWT;
    const decodedToken = jwt.verify(token, secretJWT as Secret);
    const res = await api .patch("/api/alumnos/" + id)
                          .send({ name: "Juannn",
                                  lastname: "Doeee",
                                  age: 3031,
                                  password: "12345",
                                })
                          .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('alumno modificado correctamente');
  });




  it("shouldn´t update one user", async () => {
    const secretJWT = process.env.SECRETJWT;
    const decodedToken = jwt.verify(token, secretJWT as Secret);
    const id1 = "65de47ba31b3c40d"; /*id inexistente*/
    const res = await api .patch("/api/alumnos/" + id1)
                          .send({ name: "Juan",
                                  lastname: "Doe",
                                  age: 35,
                                  password: "12345",
                                })
                          .set("Authorization", `${token}`);
    expect(res.status).toBe(500);
  });




  it("should remove one user", async () => {
    const secretJWT = process.env.SECRETJWT;
    const decodedToken = jwt.verify(token, secretJWT as Secret);
    const res = await api  .delete("/api/alumnos/" + id)
                           .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("alumno eliminado");
  });




  it("shouldn´t remove one user", async () => {
    const secretJWT = process.env.SECRETJWT;
    const decodedToken = jwt.verify(token, secretJWT as Secret);
    const id1 = "65de47ba31b3c40db1"; /*id inexistente*/
    const res = await api  .delete("/api/alumnos/" + id1)
                           .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(500);
  });
});
