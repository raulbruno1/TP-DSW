import {
    Entity,
    Property,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.js'

  
  @Entity()
  export class Contacto extends BaseEntity {
  
         @Property()
         name!: string
  
         @Property()
        email!: string
  
         @Property()
         tel!: number
  
         @Property()
         city!: string
  
         @Property()
         desc!: string
         
  
       }
    
  
  