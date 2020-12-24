import { Service } from 'typedi';
import UserService from './user.service';
import { Request, Response, NextFunction } from 'express';
import { validate, validateOrReject } from 'class-validator';
import ErrorHandler from '../services/ErrorHandler';
import UserCreateDto from './dto/user-create.dto';
import TokenService from '../services/token.service';
import { IUser } from './user.model';
import UserAuthenticatedDto from './dto/user-authenticated.dto';
import ErrorWithStatus from '../types/errors/ErrorWithStatus';
import { UserDeletedDto } from './dto/user-deleted.dto';

@Service()
class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  //@describe auth user
  //@route POST /api/users/login
  //@access PUBLIC
  async authUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    let dbUser: IUser | null;

    try {
      dbUser = await this.userService.findUserByEmail(email);
      if (!dbUser) {
        const error = new ErrorWithStatus('invalid username or password');
        error.statusCode = 401;
        throw error;
      }
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
        return res.status(200).json(authenticatedUser);
      } else {
        const error = new ErrorWithStatus('invalid username or password');
        error.statusCode = 401;
        throw error;
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
      userCreateDto.password = password;
      const validationErrors = await validate(userCreateDto);
      if (validationErrors.length > 0) {
        const errors = validationErrors.map(error => error.constraints);
        res.status(400).json(errors);
      }
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

  //@describe delete user
  //@route DELETE /api/users
  //@access PRIVATE
  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    const userIdForDeletion = req.params.id;
    const ownerUserId = req.headers['userid'] as string;

    try {
      if (userIdForDeletion.localeCompare(ownerUserId) !== 0) {
        const error = new ErrorWithStatus(
          'You need to be the owner of the account to delete it'
        );
        error.statusCode = 401;
        throw error;
      }
      const deletedUser = await this.userService.deleteUserById(
        userIdForDeletion
      );
      if (!deletedUser) {
        const error = new ErrorWithStatus('could not delete the user');
        error.statusCode = 409;
        throw error;
      }
      const { _id, name, email } = deletedUser;
      const userDeletedDto = new UserDeletedDto(_id, name, email);
      res.status(200).json(userDeletedDto);
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  }
}

export default UserController;
