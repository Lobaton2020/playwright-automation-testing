import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber";
import { APIRequestContext, BrowserContext, Page } from "@playwright/test";

export interface ICustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
  api?: APIRequestContext;
  graphql?: APIRequestContext;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
