import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { JwtStrategy } from './jwt.strategy'; // Import JwtStrategy





@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'ZsR3vMg7DpS7C9wTqB5yFpW4eZrK7tP2uS4dVg3kGcQfFpW4eZrHjNmVg3kTmTl', // Ensure 
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy], // Add JwtStrategy to providers
})
export class UserModule {}
