import { ICustomWorld } from "./custom-world";
import { ChromiumBrowser, chromium, request } from "@playwright/test";
import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { ENV } from "./env";

let browser: ChromiumBrowser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function (this: ICustomWorld) {
  this.context = await browser.newContext({
    recordVideo: {
      dir: "report-videos",
    },
  });
  this.page = await this.context.newPage();
  this.api = await request.newContext({
    baseURL: ENV.API_HOST,
  });
  this.graphql = await request.newContext({
    baseURL: ENV.GRAPHQL_HOST,
  });
});

After(async function (this: ICustomWorld, { result, pickle }) {
  if (result?.status === "PASSED") {
    await this.page?.screenshot({
      path: "./reports-screenshots/" + pickle.name + ".png",
      type: "png",
    });
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
