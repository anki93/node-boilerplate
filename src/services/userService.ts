class UserService {
  async user() {
    return 122;
  }

  async signIn(): Promise<string> {
    throw new Error("sdsd")
    return "data"
  }

  async signUp() {
    return "adas"
  }
}

export const userService = new UserService();
