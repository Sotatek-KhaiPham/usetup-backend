import { Product } from 'src/models/products/entities/product.entity';
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
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  type: number;
  @Column()
  slug?: string;
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
  @OneToMany(() => Product, (product) => product.post)
  products: Product[];
  @ManyToMany(() => SubCategory)
  @JoinTable()
  subCategories: SubCategory[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @BeforeInsert()
  convertSlug() {
    this.slug = this.title
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
}
