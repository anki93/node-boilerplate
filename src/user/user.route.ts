

import { RouteLayer } from '../core/interface/routerLayer';
import UserController from './user.controller'

export class UserRoute extends RouteLayer {
  public getRoutes() {
    this.router.get('/', UserController.list);
    return this.router;
  }
}

export default UserRoute;
