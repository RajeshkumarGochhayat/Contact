import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    mobile: string;

    @Column()
    type: string;

    @Column({ type: 'text', nullable: true })
    id_proof: string;

    @Column()
    about: string;
}