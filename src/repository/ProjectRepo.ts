import { Project } from "../model/Project";
import { Op } from "sequelize";
import RabbitMQService from "../messagingQueue/RabbitMQService";
import { sendEmail } from "../services/emailService";

interface IProjectRepo {
  save(project: Project): Promise<void>;
  update(project: Project): Promise<void>;
  delete(projectId: number): Promise<void>;
  retrieveById(projectId: number): Promise<Project>;
  retrieveAll(): Promise<Project[]>;
}

export class ProjectRepo implements IProjectRepo {
  private readonly rabbitMQService: RabbitMQService;

  constructor(rabbitMQService: RabbitMQService) {
    // Inject RabbitMQService into constructor
    this.rabbitMQService = rabbitMQService;
    // Call connectToRabbitMQ() when the ProjectRepo instance is created
    this.rabbitMQService.connectToRabbitMQ();
  }

  async save(project: Project): Promise<void> {
    try {
      console.log("inside project Repo");
      const resp = await Project.create({
        name: project.name,
        manager: project.manager,
        startDate: project.startDate,
        endDate: project.endDate,
        description: project.description,
        running: project.running,
      });
      if (resp) {
        // Ensure that the RabbitMQ channel is initialized before sending the message
        if (!this.rabbitMQService.isChannelInitialized()) {
          throw new Error(
            "RabbitMQ channel not initialized. Call connectToRabbitMQ() first."
          );
        }
        // Send message to queue after project creation
        this.rabbitMQService.sendToQueue(`Project ${project.name} created`);
        console.log("message added to rabbitmq");

        // Send email to associated team
        await sendEmail(
          "daniyal_imran@live.com",
          "New project created",
          `A new project ${project.name} has been created.`
        );
      }
    } catch (error) {
      throw new Error("Failed to create project!");
    }
  }
  async update(project: Project): Promise<void> {
    try {
      const existing_project = await Project.findOne({
        where: {
          id: project.id,
        },
      });
      if (!existing_project) {
        throw new Error("Project not found!");
      }
      existing_project.manager = project.manager;
      existing_project.startDate = project.startDate;
      existing_project.endDate = project.endDate;
      existing_project.description = project.description;

      const resp = await existing_project.save();
      if (resp) {
        this.rabbitMQService.sendToQueue(`Project ${project.name} is modified`);
      }
    } catch (error) {
      throw new Error("Failed to create Project!");
    }
  }
  async delete(projectId: number): Promise<void> {
    try {
      const existing_project = await Project.findOne({
        where: {
          id: projectId,
        },
      });
      if (!existing_project) {
        throw new Error("Project not found!");
      }

      await existing_project.destroy();
    } catch (error) {
      throw new Error("Failed to create Project!");
    }
  }
  async retrieveById(projectId: number): Promise<Project> {
    try {
      const project = await Project.findOne({
        where: {
          id: projectId,
        },
      });
      if (!project) {
        throw new Error("Project not found!");
      }
      return project;
    } catch (error) {
      throw new Error("Failed to create Project!");
    }
  }
  async retrieveRunningProjectsByEndDate(endDate: Date): Promise<Project[]> {
    try {
      const project = await Project.findAll({
        where: {
          running: true,
          endDate: {
            [Op.lte]: endDate,
          },
        },
        attributes: ["name"],
      });
      if (!project) {
        throw new Error("Project not found!");
      }
      return project;
    } catch (error) {
      throw new Error("Failed to find the running project based on endDate!");
    }
  }
  async retrieveAll(): Promise<Project[]> {
    try {
      return await Project.findAll();
    } catch (error) {
      throw new Error("Failed to create Project!");
    }
  }
}
