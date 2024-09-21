import { Request, Response } from 'express';
import { orm } from '../shared/db/orm.js'; 
import { User } from '../User/user.entity.js';
import jwt from 'jsonwebtoken';

export async function authenticate(req: Request, res: Response) {
  const { email, password } = req.body;

  const em = orm.em; 

  // Find user by email
  const user = await em.findOne(User, { email });

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  if (!(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });
  const userRole = user.role;

  console.log(`User ${user.email} logged in successfully.`);
  res.json({ token, userRole  });
}