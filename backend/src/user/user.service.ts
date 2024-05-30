import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService // Ensure JwtService is properly injected
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.findByEmail(loginUserDto.email);
    if (user && user.password === loginUserDto.password) {
      const payload = { email: user.email, sub: user._id };
      return this.jwtService.sign(payload);
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }
}
