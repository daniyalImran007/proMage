import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Project } from "./Project";

@Table({
  tableName: Tasks.TASKS_TABLE_NAME,
})
@Table
export class Tasks extends Model {
  public static TASKS_TABLE_NAME = "tasks" as string;
  public static TASKS_ID = "id" as string;
  public static TASKS_STARTDATE = "startDate" as string;
  public static TASKS_ENDDATE = "endDate" as string;
  public static TASKS_DESCRIPTION = "description" as string;
  public static TASKS_STATUS = "status" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Tasks.TASKS_ID,
  })
  id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: Tasks.TASKS_STARTDATE,
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: Tasks.TASKS_ENDDATE,
  })
  endDate!: Date;

  @Column({
    type: DataType.STRING(255),
    field: Tasks.TASKS_DESCRIPTION,
  })
  description!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: Tasks.TASKS_STATUS,
  })
  status!: string;

  @ForeignKey(() => Project)
  @Column
  projectId!: number;

  @BelongsTo(() => Project)
  project!: Project;
}
