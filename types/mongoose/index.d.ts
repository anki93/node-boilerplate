declare namespace Mongoose {
  export interface Error {
    driver: boolean;
    name: string;
    index: number;
    code: number;
    message: string;
  }
}
