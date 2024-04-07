import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import ProjectRouter from "./router/ProjectRouter";
import TasksRouter from "./router/TasksRouter";
import RabbitMQService from "./messagingQueue/RabbitMQService";
import { ProjectRepo } from "./repository/ProjectRepo";

const rabbitMQService = new RabbitMQService("task_queue");
const projectRepo = new ProjectRepo(rabbitMQService);

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Api Is Running");
    });
    this.app.use("/api/pro", ProjectRouter);
    this.app.use("/api/tasks", TasksRouter);
  }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
  console.log("Server started successfully!");
});
