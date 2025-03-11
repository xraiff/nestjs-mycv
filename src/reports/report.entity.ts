import { Entity, 
    Column, 
    ManyToOne, 
    PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

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
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  // User is wrapped in a function, otherwise it wouldn't be defined
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
