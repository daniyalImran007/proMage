import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Tasks } from "./Tasks";

@Table({
  tableName: Project.PROJECT_TABLE_NAME,
})
export class Project extends Model {
  public static PROJECT_TABLE_NAME = "project" as string;
  public static PROJECT_ID = "id" as string;
  public static PROJECT_NAME = "name" as string;
  public static PROJECT_MANAGER = "manager" as string;
  public static PROJECT_STARTDATE = "startDate" as string;
  public static PROJECT_ENDDATE = "endDate" as string;
  public static PROJECT_DESCRIPTION = "description" as string;
  public static PROJECT_RUNNING = "running" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Project.PROJECT_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: Project.PROJECT_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    field: Project.PROJECT_MANAGER,
  })
  manager!: string;

  @Column({
    type: DataType.DATE,
    field: Project.PROJECT_STARTDATE,
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    field: Project.PROJECT_ENDDATE,
  })
  endDate!: Date;

  @Column({
    type: DataType.STRING(255),
    field: Project.PROJECT_DESCRIPTION,
  })
  description!: string;
  @Column({
    type: DataType.BOOLEAN,
    field: Project.PROJECT_RUNNING,
  })
  running!: boolean;

  @HasMany(() => Tasks)
  tasks!: Tasks[];
}
