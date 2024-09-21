import * as dotenv from "dotenv";
dotenv.config();
import app from "../app";
import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";

const api = request(app);
let id: any;
let email1: any;


describe("POST, add, /api/materia", () => {
    it("should add one materia", async () => {
      const res = await api.post("/api/materia").send({
        name: "MateriaTest",
        totalhours: "60",
        email:"materiaTest@gmail.com",
        level: "principiante",
        desc: "Esta es una materia creada para testing",
        icon: "/icon/images/box.svg",   /*revisar */
        inscripciones: "",              /*revisar*/
      });
      id = res.body.data.id;
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("materia creada");
    });
})




describe("GET, findAll /api/materia", () => {
  it("should return all materias", async () => {
    const res = await api.get("/api/materia");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).not.toBeNull();
  });
})


describe("GET, findOne, /api/materia", () => {
    it("should find and return one materia by id", async () => {
      const res = await api.get("/api/materia/" + id);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('materia encontrada');
    });
 
    it("shouldn´t find and return one materia, id not found ", async () => {
      const id2 = "de24d34f43";
      const res = await api.get("/api/materia/" + id2);
      expect(res.statusCode).toBe(500);
    });
  });




describe("PUT-PATCH, update, /api/materia", () => {
  it("should update one materia", async () => {
    const res = await api .patch("/api/materia/" + id)
                          .send({   name: "MateriaTestUpdate",
                                    totalhours: "30",
                                    email:"materiaTestUpdate@gmail.com",
                                    level: "intermedio",
                                    desc: "Esta es una materia creada para testing que fue actualizada",
                                    icon: "/icon/images/box.svg",   /*revisar */
                                    inscripciones: "",
                                })
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('materia modificada');
  });




  it("shouldn´t update one materia", async () => {
    const id1 = "65de47ba31b3c40d"; /*id inexistente*/
    const res = await api .patch("/api/materia/" + id1)
                          .send({   name: "MateriaTest",
                                    totalhours: "60",
                                    email:"materiaTest@gmail.com",
                                    level: "principiante",
                                    desc: "Esta es una materia creada para testing",
                                    icon: "/icon/images/box.svg",   /*revisar */
                                    inscripciones: "",   /*revisar*/
                                })
    expect(res.status).toBe(500);
  });
})


describe("DELETE,, remove, /api/materia", () => {
  it("should remove one materia", async () => {
    const res = await api  .delete("/api/materia/" + id)
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Materia eliminada junto con sus inscripciones asociadas");
  });


  it("shouldn´t remove one materia", async () => {
    const id1 = "65de47ba31b3c40db1"; /*id inexistente*/
    const res = await api  .delete("/api/materia/" + id1)
    expect(res.statusCode).toBe(500);
  });
});


