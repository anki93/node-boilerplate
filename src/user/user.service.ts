import { unauthorized } from "@hapi/boom";
import { Token } from "../core/utils/index";
import { ISignInInput, ISignUpInput } from "./user.interface";
import { User } from "./user.model";

class UserService {
  /**
   * Create user and return user & token
   * @param data
   * @returns object
   */
  public async signUp(data: ISignUpInput) {
    const user = await User.create(data);
    return {
      user,
      token: Token.sign({
        _id: user._id,
        userName: user.userName,
      }),
    };
  }

  /**
   * Login
   * @param body
   * @returns
   */
  public async signIn(body: ISignInInput) {
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
