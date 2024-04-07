import BaseRoutes from "./base/BaseRouter";
import ProjectController from "../controller/ProjectController";
import validate from "../helper/validate";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schema/ProjectSchema";

class ProjectRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "",
      validate(createProjectSchema),
      ProjectController.create
    );
    this.router.patch(
      "/:id",
      validate(updateProjectSchema),
      ProjectController.update
    );
    this.router.delete("/:id", ProjectController.delete);
    this.router.get("", ProjectController.findAll);
    this.router.get("/running", ProjectController.findAllRunningProjects);
    this.router.get("/:id", ProjectController.findById);
  }
}

export default new ProjectRoutes().router;
