import { Given, Then, When } from "@cucumber/cucumber";
import { ICustomWorld } from "../../_common/custom-world";
import { RegistrarCronograma } from "./registrarCronograma.page";
import { APIRequestContext, expect } from "@playwright/test";
import { CronDao } from "./dao/Cron.dao";

let page: RegistrarCronograma;
const cronDao = new CronDao();

Given(
  "quiero reqgistrar un cronograma con el titulo {string}",
  async function (this: ICustomWorld, title: string) {
    page = new RegistrarCronograma(this.graphql as APIRequestContext);
    cronDao.name = title;
  }
);
Given("con la fecha actual", async () => {
  cronDao.date = new Date();
});

When("doy a registrar", async () => {
  await page.enviarPeticion(cronDao.toJson());
});

Then("el codigo de respuesta debe ser {int}", async (httpCode: number) => {
  expect(httpCode).toBe(page.httpCode);
});
Then("un mensaje {string}", async (message: number) => {
  expect(message).toBe(page.message);
});
