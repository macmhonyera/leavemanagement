import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    AGENT = "AGENT",
    ACCOUNTING = "ACCOUNTING",
    ADMINISTRATION = "ADMINISTRATION"
}

@Entity()
export class InternalUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstname: string;

    @Column({nullable: true})
    middlename: string;

    @Column()
    lastname: string;

    @Column({unique: true})
    mobile: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    refresh_token: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.AGENT
    })
    role: UserRole;

    @Column()
    password: string;

}