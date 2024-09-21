import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import { orm } from './shared/db/orm.js';
import cors from 'cors';
import { RequestContext } from '@mikro-orm/core';
import { ContactoRouter } from './Contacto/contactoroutes.js';
import { MateriaRouter } from './Materias/materiasroutes.js';
import { AlumnoRouter } from './Alumno/alumno.routes.js';
import { InscripcionRouter } from './Inscripciones/inscripcion.routes.js';
import { AuthRouter } from './User/user.routes.js';

class Server {
  private static instance: Server;
  private app: Express.Application;

  private constructor() {
    this.app = Express();
    this.setup();
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  private setup(): void {
    this.app.use(Express.json());
    this.app.use(cors({
      origin: ['http://localhost:4200', 'https://skillhub-utn.netlify.app']
      }));
    this.app.use((req, res, next) => {
      RequestContext.create(orm.em, next);
    });
    this.app.use('/api/contacto', ContactoRouter);
    this.app.use('/api/alumnos', AlumnoRouter);
    this.app.use('/api/inscripcion', InscripcionRouter);
    this.app.use('/api/materia', MateriaRouter);
    this.app.use('/api/user', AuthRouter);
    this.app.use((_, res) => {
      return res.status(404).send({ message: 'Resource not found' });
    });
  }

  public getApp(): Express.Application {
    return this.app;
  }

  public start(): void {
    const port = process.env.NODE_ENV === 'test' ? 0 : (process.env.PORT || 3000);
    this.app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  }
}
const server = Server.getInstance();
server.start();

export default Server.getInstance().getApp();