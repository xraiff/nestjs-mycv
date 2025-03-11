import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    yeah: number;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column()
    mileage: number;
}