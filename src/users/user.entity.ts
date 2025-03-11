import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../reports/report.entity';

// We don't need to call it UserEntity, because it's already a class
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    // Report is wrapped in a function, otherwise it wouldn't be defined
    // The second argument is a function that is used to map the relationship from report to user.
    // This indirection is necessary because their might be more than one type of relationship between the two entities.
    @OneToMany(() => Report, report => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }
}