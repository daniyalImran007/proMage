import { Request, Response } from "express";
import { Project } from "../model/Project";
import { ProjectRepo } from "../repository/ProjectRepo";
import RabbitMQService from "../messagingQueue/RabbitMQService";

class ProjectController {
  private readonly projectRepo: ProjectRepo;

  constructor(projectRepo: ProjectRepo) {
    //inject
    this.projectRepo = projectRepo;
    // Binding for this
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.findById = this.findById.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findAllRunningProjects = this.findAllRunningProjects.bind(this);
    this.update = this.update.bind(this);
  }

  async create(req: Request, res: Response) {
    console.log("inside controller");
    try {
      const new_project = new Project();
      new_project.name = req.body.name;
      new_project.manager = req.body.manager;
      new_project.startDate = req.body.startDate;
      new_project.endDate = req.body.endDate;
      new_project.description = req.body.description;
      new_project.running = req.body.running;
      console.log(req.body.running);
      console.log("saving project");
      await this.projectRepo.save(new_project);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created project!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!" + err,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      await this.projectRepo.delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted project!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const project = await this.projectRepo.retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched project by id!",
        data: project,
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
      const projects = await this.projectRepo.retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all project data!",
        data: projects,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
  async findAllRunningProjects(req: Request, res: Response) {
    try {
      let endDateParam = req.query.endDate || req.body.endDate;
      // Parse the endDateParam into a Date object
      let endDate: Date | null = null;
      if (typeof endDateParam === "string") {
        endDate = new Date(endDateParam);
        if (isNaN(endDate.getTime())) {
          throw new Error(
            "Invalid endDate format. Please provide a valid date."
          );
        }
      } else {
        throw new Error("endDate parameter is missing or invalid.");
      }
      const project = await this.projectRepo.retrieveRunningProjectsByEndDate(
        endDate
      );

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all the running projects!",
        data: project,
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
      const project = new Project();

      project.id = id;
      project.manager = req.body.manager;
      project.startDate = req.body.startDate;
      project.endDate = req.body.endDate;
      project.description = req.body.description;

      await this.projectRepo.update(project);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated project data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

// Create an instance of ProjectRepo before exporting the controller
const projectRepo = new ProjectRepo(new RabbitMQService("task_queue")); // Inject RabbitMQService into ProjectRepo
export default new ProjectController(projectRepo);
