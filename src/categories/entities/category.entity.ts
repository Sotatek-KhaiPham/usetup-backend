import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import { User } from 'src/users/entities/user.entity';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
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
    @ManyToOne(() => User, user => user.categories)
    user: User;
    @OneToMany(()=>SubCategory, subCategory =>subCategory.category)
    subCategories: SubCategory[];
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @BeforeInsert()
    convertSlug() {
        this.slug = this.name.toString()
            .toLowerCase()
            .normalize('NFD')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
    }
}
