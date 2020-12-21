import { Inject, Service } from 'typedi';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config';
//config jwt
jwtConfig();

@Service()
class TokenService {
  @Inject('jwt')
  private jwtSecret!: string;
  get secretToken(): string {
    return this.jwtSecret;
  }
  generateToken(id: string) {
    return jwt.sign({ id }, this.secretToken, { expiresIn: '24h' });
  }
}

export default TokenService;
