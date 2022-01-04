import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './models/posts/posts.module';
import { CategoriesModule } from './models/categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { Post } from './models/posts/entities/post.entity';
import { Category } from './models/categories/entities/category.entity';
import { User } from './models/users/entities/user.entity';
import { ProductsModule } from './models/products/products.module';
import { UsersModule } from './models/users/users.module';
import { CommentsModule } from './models/comments/comments.module';
import { SubCategoriesModule } from './models/sub-categories/sub-categories.module';
import config from 'ormconfig';

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
