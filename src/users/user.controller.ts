import { Inject } from 'typedi';
import UserService from './user.service';
import { Request, Response, NextFunction } from 'express';
import { validateOrReject } from 'class-validator';
import ErrorHandler from '../services/ErrorHandler';

class UserController {
  @Inject()
  private userService!: UserService;

  //@describe create user
  //@route POST /api/users
  //@access PRIVATE
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body.user;
    const userCreateDto = new UserCreateDto();
    userCreateDto.name = name;
    userCreateDto.email = email;
    userCreateDto.password = password;

    try {
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
