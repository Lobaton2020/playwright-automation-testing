import { Given, Then, When } from "@cucumber/cucumber";
import { ICustomWorld } from "../../_common/custom-world";
import { RegistrarCronograma } from "./registrarCronograma.page";
import { Page, expect } from "@playwright/test";
import { DEPENDENCY_CONTAINER } from "../../_common/dependencies/Container";
import { DatabaseProxy } from "../../_common/adapters/db-adapter";
import { Types } from "../../_common/dependencies/Types";

let page: RegistrarCronograma;
const db = DEPENDENCY_CONTAINER.get<DatabaseProxy>(Types.dbAdapter);

Given(
  "soy usuario de la plaforma con usuario {string} y contraseña {string}",
  async function (this: ICustomWorld, user: string, password: string) {
    page = new RegistrarCronograma(this.page as Page, db);
    await page.openLogin();
    await page.fillLoginForm(user, password);
    await page.clickLogin();
  }
);
Given("selecciono en submenu de cronogramas", async () => {
  await page.clickCronogramas();
  await page.clickNewButtonCronograma();
});

When(
  "registro un nuevo cronograma con titulo {string}",
  async (title: string) => {
    await page.fillCronogramaForm(title);
    await page.clickCreateCronograma();
  }
);

Then("el registro queda guardado en bd con nombre {string}", async (title) => {
  const result = await page.getRecordInsertedByName(title);
  expect(result?.titulo).toBeTruthy();
});
