export abstract class ConnectionLayer {
  constructor() {
    this.connect();
  }
  abstract connect(): Promise<void | string | boolean>;
  abstract disconnect(): Promise<void | string | boolean>;
  abstract healthCheck(): Promise<void | string | boolean>
}
