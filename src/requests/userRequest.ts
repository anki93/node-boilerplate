import ajv from "ajv";
import ajvError from "ajv-errors";

let Ajv = new ajv({ allErrors: true, jsonPointers: true, $data: true })
ajvError(Ajv)

class UserRequest {
  login(data: { username: string, password: string }) {
    let userSchema = {
      type: 'object',
      required: [
        'username', 'password'
      ],
      properties: {
        username: {
          type: 'string',
          errorMessage: {
            type: "Username is required.",
          }
        },
        password: {
          type: 'string',
          minLength: 3,
          errorMessage: {
            type: "Password field is requied.",
            minLength: "3",

          }
        }
      },
      errorMessage: {
        type: "Must be an object",
        required: {
          username: "Username field is required.",
          password: "Password field is required."
        }
      }
    }
    let validate = Ajv.compile(userSchema);
    if (!validate(data)) throw validate;
  }
}

export const userRequest = new UserRequest();
