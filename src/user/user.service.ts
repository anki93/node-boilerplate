import { unauthorized } from "@hapi/boom";
import { IApp } from "../core/interface/app.common.interface";
import { Token } from "../core/utils/index";
import { UserInput } from "./user.interface";
import { User } from "./user.model";

class UserService {
  public async signUp(data: UserInput) {
    const user = await User.create(data);
    return {
      user,
      token: Token.sign({
        _id: user._id,
        userName: user.userName,
      }),
    };
  }

  public async signIn(body: IApp.IObject<string>) {
    const user = await User.findByEmailOrUserName(body.userNameOrEmail);
    if (user && user.isValidPassword(body.password)) {
      return {
        user,
        token: Token.sign({
          _id: user._id,
          userName: user.userName,
        }),
      };
    } else {
      throw unauthorized("Authentication failed");
    }
  }
}

export const UserSvc = new UserService();
