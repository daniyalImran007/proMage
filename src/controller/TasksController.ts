import { Request, Response } from "express";
import { Tasks } from "../model/Tasks";
import { TasksRepo } from "../repository/TasksRepo";

class TasksController {
  async create(req: Request, res: Response) {
    try {
      const new_task = new Tasks();
      new_task.startDate = req.body.startDate;
      new_task.endDate = req.body.endDate;
      new_task.description = req.body.description;
      new_task.status = req.body.status;
      new_task.projectId = req.body.projectId;

      await new TasksRepo().save(new_task);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created task!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findByProjectId(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const tasks = await new TasksRepo().retrieveByProjectId(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched tasks by project id!",
        data: tasks,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const tasks = await new TasksRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all project tasks!",
        data: tasks,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const task = new Tasks();

      task.id = id;
      task.projectId = req.body.projectId;
      task.startDate = req.body.startDate;
      task.endDate = req.body.endDate;
      task.description = req.body.description;
      task.status = req.body.status;

      await new TasksRepo().update(task);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated task data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new TasksController();
