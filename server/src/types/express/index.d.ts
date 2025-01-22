import type { JwtPayload } from "jsonwebtoken";

declare global {
  export type MyPayload = JwtPayload & {
    sub: string;
    firstname: string;
    lastname: string;
    birthday: string;
  };

  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      auth: MyPayload;
      /* ************************************************************************* */
    }
  }
}
