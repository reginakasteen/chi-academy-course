import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UsersController } from "./domains/users/users.controller";

import { RootController } from './domains/root.controller';

export const app = createExpressServer({
  controllers: [RootController, UsersController],
  cors: true,
  defaultErrorHandler: true,
  validation: true
});
