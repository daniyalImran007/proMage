import { Op } from "sequelize";
import { Tasks } from "../model/Tasks";
interface ITasksRepo {
  save(project: Tasks): Promise<void>;
  update(project: Tasks): Promise<void>;
  retrieveByProjectId(projectId: number): Promise<Tasks[]>;
  retrieveAll(): Promise<Tasks[]>;
}

export class TasksRepo implements ITasksRepo {
  async save(task: Tasks): Promise<void> {
    try {
      await Tasks.create({
        startDate: task.startDate,
        endDate: task.endDate,
        description: task.description,
        status: task.status,
        projectId: task.projectId,
      });
    } catch (error) {
      throw new Error("Failed to create task!");
    }
  }
  async update(task: Tasks): Promise<void> {
    try {
      const existing_task = await Tasks.findOne({
        where: {
          id: task.id,
        },
      });
      if (!existing_task) {
        throw new Error("Task not found!");
      }
      existing_task.startDate = task.startDate;
      existing_task.endDate = task.endDate;
      existing_task.description = task.description;
      existing_task.status = task.status;
      await existing_task.save();
    } catch (error) {
      throw new Error("Failed to update task!");
    }
  }

  async retrieveByProjectId(projectId: number): Promise<Tasks[]> {
    try {
      const allTasks = await Tasks.findAll({
        where: {
          projectId: projectId,
        },
      });
      if (!allTasks) {
        throw new Error("Tasks not found!");
      }
      return allTasks;
    } catch (error) {
      throw new Error("Failed to retrieve tasks!");
    }
  }
  async retrieveAll(): Promise<Tasks[]> {
    try {
      return await Tasks.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve Tasks!");
    }
  }
}
