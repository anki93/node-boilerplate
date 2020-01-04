import { connection, set, connect } from 'mongoose'

let {
  MONGO_DEBUG,
  MONGOURL
}: any = process.env

// Exit application on error
connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`)
  process.exit(-1)
})

// print mongoose logs in dev env
if (MONGO_DEBUG === 'TRUE') {
  set('debug', true)
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
export const mongoose = {
  connect: () => {
    connect(MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    return connection
  }
}
