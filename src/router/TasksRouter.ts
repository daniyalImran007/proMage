import BaseRoutes from "./base/BaseRouter";
import TasksController from "../controller/TasksController";
import validate from "../helper/validate";
import { createTasksSchema, updateTasksSchema } from "../schema/TasksSchema";

class TasksRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", validate(createTasksSchema), TasksController.create);
    this.router.patch(
      "/:id",
      validate(updateTasksSchema),
      TasksController.update
    );
    this.router.get("/:id", TasksController.findByProjectId);
  }
}

export default new TasksRoutes().router;
