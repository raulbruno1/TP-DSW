import {
  Entity,
  Property,
  ManyToMany,
  Cascade,
  ManyToOne,
  Rel,
  Collection,
  OneToMany,
  Unique,
  
  
} from '@mikro-orm/core'
import { Exclude } from 'class-transformer';
import { Inscripcion } from '../Inscripciones/inscripcion.entity.js'
import { BaseEntity } from '../shared/db/baseEntity.js'

@Entity()
export class Alumno extends BaseEntity {

       @Property()
       name!: string

       @Property()
       lastname!: string

       @Property()
       age!: number

       @Property()
       @Unique()
       email!: string

       @Exclude()
       password!: string

       @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.student)
       inscripciones = new Collection<Inscripcion>(this);
       

     }
  