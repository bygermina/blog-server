const UserModel = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../utils/ApiError');

class UserController {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with such email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const userRole = await Role.findOne({ value: 'USER' });
    const user = new UserModel({
      email,
      password: hashPassword,
      roles: [userRole.value],
    });
    await user.save();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.Unauthorized('User with this email was not found');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.Unauthorized('Wrong password');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  // async loginAdmin(email, password) {
  //   const user = await UserModel.findOne({ email });
  //   if (!user) {
  //     throw ApiError.BadRequest('User with this email was not found');
  //   }

  //   if (user.roles.includes('ADMIN')) {
  //     const isPassEquals = await bcrypt.compare(password, user.password);
  //     if (!isPassEquals) {
  //       throw ApiError.BadRequest('Wrong password');
  //     }
  //     const userDto = new UserDto(user);
  //     const tokens = tokenService.generateTokens({ ...userDto });

  //     await tokenService.saveToken(userDto.id, tokens.refreshToken);
  //     return { ...tokens, user: userDto };
  //   } else {
  //     throw ApiError.BadRequest('Access Denied');
  //   }
  // }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserController();
