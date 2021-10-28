import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  lastName: string;
  @Column()
  firstName: string;
  @Column()
  phone: string;
  @Column()
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
  @Column()
  avatarUrl: string;
  @Column({ default: true })
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
