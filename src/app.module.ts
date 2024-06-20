import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { StudentModule } from "./presentation/controllers/student/student/student.module";
import { CourseModule } from "./presentation/controllers/course/course/course.module";
import { GradeModule } from "./presentation/controllers/grade/grade/grade.module";
import { ActivityModule } from "./presentation/controllers/activity/activity/activity.module";
import { AccountModule } from "./presentation/controllers/account/account/account.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { JwtModule } from "@nestjs/jwt";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import { LoggingInterceptor } from "./core/interceptors/logger/logging.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { EnrollmentModule } from "./presentation/controllers/enrollment/enrollment/enrollment.module";
import {
  ActivityCourseModule
} from "./presentation/controllers/activity-course/activity-course/activity-course.module";
import {
  ActivityCourseStudentModule
} from "./presentation/controllers/activity-course-student/activity-course-student/activity-course-student.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || "default_secret_key",
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || "1m" }
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get<string>("HOST_DATABASE"),
        port: configService.get<number>("PORT_DATABASE"),
        entities: ["dist/domain/entities/**/*.js"],
        entitiesTs: ["src/domain/entities/**/*.ts"],
        dbName: configService.get<string>("NAME_DATABASE"),
        user: configService.get<string>("USER_DATABASE"),
        password: configService.get<string>("USER_PASSWORD"),
        driver: PostgreSqlDriver,
        autoLoadEntities: false,
        migrations: {
          path: "src/migrations", // Ruta a los archivos de migración
          pathTs: "src/migrations", // Ruta a los archivos de migración en TypeScript
          transactional: true,
          disableForeignKeys: false,
          emit: "ts"
        }
      })
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.printf(({ timestamp, level, message, stack }) => {
              return `${timestamp} ${level}: ${message} - ${stack}`;
            })
          )
        }),
        new winston.transports.File({
          filename: "src/logs/application.log",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json()
          )
        })
      ]
    }),
    ActivityCourseStudentModule,
    ActivityCourseModule,
    AccountModule,
    StudentModule,
    CourseModule,
    GradeModule,
    ActivityModule,
    EnrollmentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})

export class AppModule {
}
