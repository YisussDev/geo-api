import { MikroOrmModuleOptions } from "@mikro-orm/nestjs";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

export const config: MikroOrmModuleOptions = {
  entities: ["dist/domain/entities/**/*.js"],
  entitiesTs: ["src/domain/entities/**/*.ts"],
  dbName: "test_database",
  user: "postgres",
  password: "root",
  driver: PostgreSqlDriver,
  autoLoadEntities: false,
  migrations: {
    path: 'src/migrations', // Ruta a los archivos de migración
    pathTs: 'src/migrations', // Ruta a los archivos de migración en TypeScript
    transactional: true,
    disableForeignKeys: false,
    emit: 'ts',
  },
};