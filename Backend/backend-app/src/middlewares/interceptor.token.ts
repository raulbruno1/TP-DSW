import { Request, Response, NextFunction } from "express";
import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';

interface DecodedToken {
    userId: string;
  }
  
  declare global {
    namespace Express {
      interface Request {
        decodedToken?: DecodedToken;
      }
    }
  }
export function validarToken(req: Request, res: Response, next: NextFunction) {
 
  const token = req.headers.authorization;
    if (!token) {
    return res.status(401).json({ mensaje: 'Acceso no autorizado, token no proporcionado' });
  }
  const secretJWT: Secret | GetPublicKeyOrSecret = process.env.SECRETJWT || 'defaultSecret';
  jwt.verify(token,secretJWT, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token no válido' });
    }

    req.decodedToken = decodedToken as DecodedToken;

    next();
  });
}