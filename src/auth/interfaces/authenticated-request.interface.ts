import { Request } from 'express';
import { AuthUser } from '../types/auth.types';

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}
