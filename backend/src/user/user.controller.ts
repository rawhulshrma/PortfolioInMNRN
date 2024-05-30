import { Controller, Post, Body, Res, Get, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.userService.login(loginUserDto);
    if (token) {
      res.cookie('jwt', token, { httpOnly: true });
      return { message: 'Login successful' };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Get('getuser')
  async getUser(@Req() req: Request) {
    const cookie = req.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.userService.findById(data.sub);
    return user;
  }

  @Get('myprofile')
  async myProfile(@Req() req: Request) {
    const cookie = req.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.userService.findById(data.sub);
    return user;
  }
}
