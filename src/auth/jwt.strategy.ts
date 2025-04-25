/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";

/* eslint-disable prettier/prettier */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  validate(payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return {userId: payload.sub, username: payload.username, role: payload.role};
  }
}
