import { connection, set, connect, STATES } from 'mongoose'
import { ConnectionLayer } from '../core/interface/connectionLayer'

let { MONGO_DEBUG, MONGOURL }: any = process.env

connection.on("open", () => {
  console.log("Connected to Mongo.");
});

connection.on('error', (err: any) => {
  console.error(JSON.stringify(err));
});

connection.on('close', () => {
  console.log('MongoDb connection closed.');
});


// print mongoose logs in dev env
set('debug', MONGO_DEBUG === 'true')

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
export class MongoDb extends ConnectionLayer {
  async connect() {
    await connect(MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect() {
    await connection.close();
  }

  async healthCheck() {
    return STATES[connection.readyState]
  }

}
