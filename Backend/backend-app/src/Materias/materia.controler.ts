import { Request, Response, NextFunction } from 'express'
import { Materia } from './materia.entity.js'
import { orm } from '../shared/db/orm.js'
import { removebyCourseId } from '../Inscripciones/inscripcion.controler.js'

const em = orm.em


function sanitizeMateriaInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput={
        name: req.body.name,
        totalhours: req.body.totalhours,
        email: req.body.email,
        level: req.body.level,
        desc: req.body.desc,
        icon: req.body.icon,
    }
    Object.keys(req.body.sanitizedInput).forEach(key=>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}


async function findAll(req: Request,res:Response){
    try{
        const materias = await em.find(
            Materia,{},
        )
        res.status(200).json({message: "todas las materias encontradas",data: materias})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try {
      const id = req.params.id
      console.log(id)
      const oneMateria = await em.findOneOrFail(
        Materia,
        { id },
       
      )
      res.status(200).json({message: "materia encontrada",data: oneMateria})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response) {
    try {
      const amateria = em.create(Materia, req.body.sanitizedInput)
      await em.flush()
      res.status(201).json({ message: 'materia creada', data: amateria })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
  
  async function update(req: Request, res: Response) {
    try {
      const id = req.params.id
      const materiaupdate = await em.findOneOrFail(Materia, { id })
      em.assign(materiaupdate, req.body.sanitizedInput)
      await em.flush()
      res
        .status(200)
        .json({ message: 'materia modificada', data: materiaupdate })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
  

  async function remove(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const materia = await em.findOneOrFail(Materia, id);
      
      // Eliminar las inscripciones asociadas
      await removebyCourseId(id, res);
  
      // Eliminar la materia
      await em.removeAndFlush(materia);
  
      res.status(200).json({ message: 'Materia eliminada junto con sus inscripciones asociadas' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }


export{sanitizeMateriaInput,findAll,findOne,add,update,remove}