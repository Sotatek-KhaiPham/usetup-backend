import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostsService } from './posts/posts.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot(),
    ProductsModule,
    PostsModule,
    UsersModule,
    JwtModule.register({
      secret: 'jwtsecretkey',
      signOptions: {
        expiresIn: '1 hour',
      },
    }),
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostsService],
})
export class AppModule {}
