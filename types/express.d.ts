import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      cookies: {
        jwtToken?: string;
      };
    }
  }
}
