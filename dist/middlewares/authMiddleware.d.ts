import { Request, Response, NextFunction } from 'express';
export declare const isAuthenticated: (req: Request, res: Response, next: NextFunction) => void;
export declare const redirectIfAuthenticated: (req: Request, res: Response, next: NextFunction) => void;
