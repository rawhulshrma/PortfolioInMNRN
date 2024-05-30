
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<string | null> {
    const user = await this.findByEmail(loginUserDto.email);
    if (user && user.password === loginUserDto.password) {
      const payload = { email: user.email, sub: user._id };
      return this.jwtService.sign(payload);
    }
    return null;
  }

  async getUser(cookie: string): Promise<User | undefined> {
    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException('Invalid token');
    }
    return this.findById(data.sub);
  }

  async myProfile(cookie: string): Promise<User | undefined> {
    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException('Invalid token');
    }
    return this.findById(data.sub);
  }

  async logout(): Promise<void> {
    // No implementation needed in the service layer for logout
    // Clearing the cookie should be handled in the controller
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }
}
