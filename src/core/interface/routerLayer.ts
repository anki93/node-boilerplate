import { Router } from "express";

export abstract class RouteLayer {
  protected router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
  }
  abstract getRoutes(): Router;
}
