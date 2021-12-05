import { Exclude } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Product } from 'src/products/entities/product.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({ default: null })
  lastName: string;
  @Column({ default: null })
  firstName: string;
  @Column({ unique: true })
  username: string;
  @Column({ default: null, unique: true })
  phone: string;
  @Column({ unique: true })
  email: string;
  @Exclude()
  @Column({ default: null })
  codeVerify: number;
  @Exclude()
  @Column({ default: null })
  accessToken?: string;
  @Exclude()
  @Column()
  password: string;
  @Column({ default: null })
  avatarUrl: string;
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
  @OneToMany(() => SubCategory, (subCategory) => subCategory.user)
  subCategories: SubCategory[];
  @Column({ default: false })
  isActive: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
