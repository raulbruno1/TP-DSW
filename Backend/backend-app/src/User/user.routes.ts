import { Router } from 'express';
import { authenticate } from '../shared/auth.controller.js';

export const AuthRouter = Router();

AuthRouter.post('/login', authenticate);