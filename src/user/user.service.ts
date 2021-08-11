import { UserInput } from "./user.interface";
import { User } from "./user.model";

class UserService {
  public async create(data: UserInput) {
    const user = await User.create(data);
    return user;
  }
}

export const UserSvc = new UserService();
