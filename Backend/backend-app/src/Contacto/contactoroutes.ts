import { Router } from "express";
import { sanitizeContactoInput,findAll, findOne,add,remove } from "./contacto.controler.js";

export const ContactoRouter = Router()

ContactoRouter.get('/',findAll)
ContactoRouter.get('/:id',findOne)
ContactoRouter.post('/',sanitizeContactoInput,add)
ContactoRouter.delete('/:id',remove)