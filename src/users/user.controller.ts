import { Inject, Service } from 'typedi';
import UserService from './user.service';
import { Request, Response, NextFunction } from 'express';
import { validateOrReject } from 'class-validator';
import ErrorHandler from '../services/ErrorHandler';
import UserCreateDto from './dto/user-create.dto';
import TokenService from '../services/token.service';
import { IUser } from './user.model';
import UserAuthenticatedDto from './dto/user-authenticated.dto';
import Encryption from '../services/Encryption';

class UserController {
  @Inject()
  private userService!: UserService;
  @Inject()
  private tokenService!: TokenService;
  @Inject()
  private encryptionService!: Encryption;

  //@describe auth user
  //@route POST /api/users/login
  //@access PRIVATE
  async authUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const dbUser: IUser | null = await this.userService.findUserByEmail(
        email
      );

      const passwordIsValid = await this.userService.checkForPasswordMatching(
        password,
        dbUser!.password as string
      );
      if (dbUser && passwordIsValid) {
        const token = this.tokenService.generateToken(dbUser._id);
        const authenticatedUser = new UserAuthenticatedDto(
          dbUser._id,
          dbUser.name,
          dbUser.email,
          token
        );
        res.status(200).json(authenticatedUser);
      } else {
        throw new Error('invalid username or password');
      }
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  }

  //@describe create user
  //@route POST /api/users
  //@access PRIVATE
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    let userCreateDto;

    try {
      const dbUser = await this.userService.findUserByEmail(email);
      if (dbUser) {
        throw new Error('There is already an user with that mail');
      }
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }

    try {
      userCreateDto = new UserCreateDto();
      userCreateDto.name = name;
      userCreateDto.email = email;
      userCreateDto.password = await this.encryptionService.encryptPassword(
        password
      );
      await validateOrReject(userCreateDto);
    } catch (error) {
      return ErrorHandler.handleValidationError(error, res);
    }

    try {
      const createdUser = await this.userService.createUser(userCreateDto);
      res.status(200).json({ ok: true, createdUser });
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  }
}

export default UserController;
