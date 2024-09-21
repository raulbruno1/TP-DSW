import {
  Entity,
  Property,
  Collection,
  OneToMany,
  Cascade
  
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.js'
import { Inscripcion } from '../Inscripciones/inscripcion.entity.js'
import { ObjectId } from '@mikro-orm/mongodb'

@Entity()
export class Materia extends BaseEntity {

       @Property()
       name!: string

       @Property()
       totalhours!: number

       @Property()
       email!: string

       @Property()
       level!: string

       @Property()
       desc!: string

       @Property()
       icon!: string
       
       @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.course, { cascade: [Cascade.REMOVE] })
       inscripciones = new Collection<Inscripcion>(this);

     }
  

