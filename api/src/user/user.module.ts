import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from 'src/post/post.module';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { ProfileController } from './profile.controller';
import { UserController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    PostModule,
  ],
  controllers: [UserController, ProfileController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
