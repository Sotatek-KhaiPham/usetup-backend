import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostsService } from './posts/posts.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Post, Category]),
    ProductsModule,
    PostsModule,
    UsersModule,
    CommentsModule,
    CategoriesModule,
    SubCategoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
