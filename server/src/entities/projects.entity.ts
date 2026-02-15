import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class projects {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({default:true})
    visible: boolean;
    @Column()
    name: string;
    @Column('text')
    description: string;
    @Column('text',{array: true, nullable:true})
    photos: string[];
    @Column({ nullable: true })
    video: string;
    @Column('text', { array: true }) 
    links: string[];
    @Column()
    language: string;
}