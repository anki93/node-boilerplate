class UserService {
  async user() {
    throw new Error('BROKEN')
    return 122;
  }
}

export const userService = new UserService();
