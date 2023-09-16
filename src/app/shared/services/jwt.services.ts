import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export class JwtServices {
  public createToken(data: any): String {
    return jwt.sign(data, process.env.JWT_SECRET!);
  }

  public verifyToken(token: string): boolean {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return true;
    } catch (error) {
      return false;
    }
  }

  public decodeToken(token: string): any {
    const result = jwt.decode(token);

    if(!result){
      return null;
    }

    return result;
  }
}
