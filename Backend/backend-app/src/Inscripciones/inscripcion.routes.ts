import { Router } from "express";
import { sanitizeInscripcionInput,findAll, findOne,add,update,remove,findByStudentId } from "./inscripcion.controler.js";
import { validarToken } from "../middlewares/interceptor.token.js";

export const InscripcionRouter = Router()

InscripcionRouter.use(validarToken)
InscripcionRouter.get('/',findAll)
InscripcionRouter.get('/:id',findOne)
InscripcionRouter.post('/',add)
InscripcionRouter.put('/:id',sanitizeInscripcionInput,update)
InscripcionRouter.patch('/:id',sanitizeInscripcionInput,update)
InscripcionRouter.delete('/:id',remove)
InscripcionRouter.get('/alumno/:idStudent', findByStudentId);