import { UserRole } from "src/common/types/user-role.enum";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  roles: UserRole[];
}
