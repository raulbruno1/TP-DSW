import bcrypt from 'bcryptjs';

import { Entity, Property, OneToOne } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Alumno } from '../Alumno/alumno.entity.js';


import * as jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;

@Entity()
export class User extends BaseEntity {

  @Property()
  email!: string;

  @Property({ hidden: true, length: 60 })
  password!: string;

  @Property()
  role!: string;

  @OneToOne(() => Alumno, { nullable: true })
  alumno?: Alumno;

  

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }


  generateToken() {
    return sign({ userId: this.id }, 'secreto', { expiresIn: '1h' });
  }

  static verifyToken(token: string) {
    return verify(token, 'secreto') as { userId: string };
  }
}