import { Container } from "inversify";
import { Types } from "./Types";
import { ApiProxy } from "../adapters/api-adapter";
import { DatabaseProxy } from "../adapters/db-adapter";
export const DEPENDENCY_CONTAINER = new Container();

DEPENDENCY_CONTAINER.bind(Types.apiAdapter).to(ApiProxy);
DEPENDENCY_CONTAINER.bind(Types.dbAdapter).to(DatabaseProxy);
