import { Router } from "express";
import { sanitizeAlumnoInput,findAll, findOneId,findOne,add,update,remove } from "./alumno.controler.js";
import { validarToken } from "../middlewares/interceptor.token.js";

export const AlumnoRouter = Router()

AlumnoRouter.post('/',sanitizeAlumnoInput,add),
AlumnoRouter.get('/email/:email',findOne),
AlumnoRouter.get('/',findAll),
AlumnoRouter.get('/:id',findOneId),
AlumnoRouter.use(validarToken),
AlumnoRouter.put('/:id',sanitizeAlumnoInput,update),
AlumnoRouter.patch('/:id',sanitizeAlumnoInput,update),
AlumnoRouter.delete('/:id',remove)