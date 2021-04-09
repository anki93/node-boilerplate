import { Request, Response, NextFunction } from 'express';
// import debug from 'debug';
// import productService from './product.service';

// const log: debug.IDebugger = debug('app:product-middleware');


class UserMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {

  }
}

export default new UserMiddleware();