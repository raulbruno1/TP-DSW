import { Router } from "express";
import { sanitizeMateriaInput,findAll, findOne,add,update,remove } from "./materia.controler.js";

export const MateriaRouter = Router()

MateriaRouter.get('/',findAll)
MateriaRouter.get('/:id',findOne)
MateriaRouter.post('/',sanitizeMateriaInput,add)
MateriaRouter.put('/:id',sanitizeMateriaInput,update)
MateriaRouter.patch('/:id',sanitizeMateriaInput,update)
MateriaRouter.delete('/:id',remove)