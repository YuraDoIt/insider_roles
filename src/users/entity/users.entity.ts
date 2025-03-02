import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enum/roles.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: Role.USER })
  role: Role;
}
