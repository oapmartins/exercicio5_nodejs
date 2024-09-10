import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuardService } from "./auth-guard/auth-guard.service";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "60m" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuardService],
})
export class AuthModule { }