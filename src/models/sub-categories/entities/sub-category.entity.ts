import { Category } from 'src/models/categories/entities/category.entity';
import { Post } from 'src/models/posts/entities/post.entity';
import { Product } from 'src/models/products/entities/product.entity';
import { User } from 'src/models/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  image: number;
  @Column()
  slug: string;
  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;
  @ManyToOne(() => User, (user) => user.categories)
  user: User;
  @ManyToMany(() => Post, (post) => post.subCategories)
  posts: Post[];
  @ManyToMany(() => Product, (product) => product.subCategories)
  products: Product[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @BeforeInsert()
  convertSlug() {
    this.slug = this.name
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
}
