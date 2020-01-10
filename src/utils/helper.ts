import uuid from 'uuid/v1'

import _ from 'lodash'
import { generate, GenerateOptions } from 'randomstring'
import { hashSync, genSaltSync, compareSync } from 'bcrypt-nodejs'

class Helper {
  // convert password to saltsync
  bcrypt(password: string) {
    return hashSync(password, genSaltSync(10))
  }

  // compare password with hash
  compareSync(password: string, hash: string) {
    return compareSync(password, hash)
  }

  // Capitalize a string
  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Generate a file name with uuid
  // genFilename(mimeType, beforePrefix = '', afterPrefix = '') {
  //   return `${beforePrefix}${this.uuid()}${afterPrefix}.${mime.getExtension(mimeType)}`
  // }

  // generate uuid string
  uuid() {
    return uuid()
  }

  // generate(options)
  // length - the length of the random string. (default: 32) [OPTIONAL]
  // readable - exclude poorly readable chars: 0OIl. (default: false) [OPTIONAL]
  // charset - define the character set for the string. (default: 'alphanumeric') [OPTIONAL]
  //    // alphanumeric - [0-9 a-z A-Z]
  //    // alphabetic - [a-z A-Z]
  //    // numeric - [0-9]
  //    // hex - [0-9 a-f]
  //    // custom - any given characters
  // capitalization - define whether the output should be lowercase / uppercase only. (default: null) [OPTIONAL]
  //    // lowercase
  //    // uppercase
  randomstring(options: GenerateOptions) {
    return generate(options)
  }

  // render a string with parameters
  // render({ str, path, data }) {
  //   if (_.isEmpty(str) && _.isEmpty(path)) {
  //     throw new Error('Passing either String  or  file path ')
  //   }

  //   if (_.isEmpty(str)) {
  //     if (fs.existsSync(path)) str = fs.readFileSync(path)
  //     else throw new Error('File not exists')
  //   }

  //   return ejs.render(str, data, { delimiter: '?' })
  // }
}

export const helper = new Helper()
