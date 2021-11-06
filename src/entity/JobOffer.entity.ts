import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { JobOfferModelInterface } from "../interfaces/JobOfferModel.interface";

@Entity()
export class JobOfferEntity
  extends BaseEntity
  implements JobOfferModelInterface
{
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  company: string;

  @Column({ nullable: false, type: "longtext" })
  description: string;

  @Column({ nullable: false })
  location: string;

  @Column({ nullable: false })
  url: string;

  @Column({
    nullable: false,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated: Date;
}
