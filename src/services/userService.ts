class UserService {
  async user() {
    return 122;
  }

  async login(): Promise<string> {
    return "ok"
  }

  async register() {
    return "adas"
  }
}

export const userService = new UserService();
