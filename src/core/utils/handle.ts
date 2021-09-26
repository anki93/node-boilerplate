import { Response } from "express";
import { IApp } from "../interface/app.common.interface";

export class Handle {
  /**
   * Ok Response
   * @param res {Response}
   * @param message string
   * @param data object
   */
  static ok(res: Response, message: string, data: IApp.IObject<any>) {
    res.status(200).json({
      statusCode: 200,
      error: "",
      message,
      data,
    });
  }

  /**
   * Created response
   * @param res {Response}
   * @param message string
   * @param data object
   */
  static created(res: Response, message: string, data: IApp.IObject<any>) {
    res.status(201).json({
      statusCode: 201,
      error: "",
      message,
      data,
    });
  }

  /**
   * Accepted response
   * @param res {Response}
   * @param message string
   * @param data object
   */
  static accepted(res: Response, message: string, data: IApp.IObject<any>) {
    res.status(202).json({
      statusCode: 202,
      error: "",
      message,
      data,
    });
  }

  /**
   * Non-Authoritative Information response
   * @param res {Response}
   * @param message string
   * @param data object
   */
  static nonAuthoritativeInformation(
    res: Response,
    message: string,
    data: IApp.IObject<any>
  ) {
    res.status(203).json({
      statusCode: 203,
      error: "",
      message,
      data,
    });
  }
  /**
   * No Content response
   * @param res {Response}
   * @param message string
   * @param data object
   */
  static noContent(res: Response, message: string, data: IApp.IObject<any>) {
    res.status(204).json({
      statusCode: 204,
      error: "",
      message,
      data,
    });
  }
  /**
   * Reset Content response
   * @param res {Response}
   * @param message string
   * @param data object
   */
  static resetContent(res: Response, message: string, data: IApp.IObject<any>) {
    res.status(205).json({
      statusCode: 205,
      error: "",
      message,
      data,
    });
  }
  /**
   * Partial Content response
   * @param res {Response}
   * @param message string
   * @param data object
   */
  static partialContent(
    res: Response,
    message: string,
    data: IApp.IObject<any>
  ) {
    res.status(206).json({
      statusCode: 206,
      error: "",
      message,
      data,
    });
  }
}
