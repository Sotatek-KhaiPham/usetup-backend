import { Exclude } from 'class-transformer';
import { Post } from 'src/models/posts/entities/post.entity';
import { SubCategory } from 'src/models/sub-categories/entities/sub-category.entity';
import { User } from 'src/models/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  image: string;
  @Column()
  type: number;
  @Column()
  slug: string;
  @ManyToOne(() => User, (user) => user.products)
  user: User;
  @ManyToOne(() => Post, (post) => post.products)
  post: Post;
  @ManyToMany(() => SubCategory)
  @JoinTable()
  subCategories: SubCategory[];
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
