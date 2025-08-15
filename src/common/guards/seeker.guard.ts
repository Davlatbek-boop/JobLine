import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class SeekerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();
    const person = req.person;

    if (person.role != "admin") {
      if (person.role != "seeker") {
        throw new ForbiddenException({
          message: "Ruxsat etilmagan Seeker",
        });
      }
    }
    return true;
  }
}
