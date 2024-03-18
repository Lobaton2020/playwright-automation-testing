import { Given, Then, When } from "@cucumber/cucumber";
import { ICustomWorld } from "../../_common/custom-world";
import { Page, expect } from "@playwright/test";
import { DEPENDENCY_CONTAINER } from "../../_common/dependencies/Container";
import { DatabaseProxy } from "../../_common/adapters/db-adapter";
import { Types } from "../../_common/dependencies/Types";
import { RegistrarLink } from "./registrarLink.page";
import { RegistrarCronograma } from "../registrar-cronograma/registrarCronograma.page";

let page: RegistrarLink;
let pageCronograma: RegistrarCronograma;
const db = DEPENDENCY_CONTAINER.get<DatabaseProxy>(Types.dbAdapter);

Given(
  "soy usuario de la plaforma con usuario de {string} y contraseña {string}",
  async function (this: ICustomWorld, user: string, password: string) {
    page = new RegistrarLink(this.page as Page, db);
    pageCronograma = new RegistrarCronograma(this.page as Page, db);
    await pageCronograma.openLogin();
    await pageCronograma.fillLoginForm(user, password);
    await pageCronograma.clickLogin();
  }
);

When("registro un nuevo link con titulo {string}", async (name: string) => {
  await page.fillLinkTitle(name);
});
When("el link es {string}", async (link: string) => {
  await page.fillLink(link);
  await page.clickCreateLink();
});

Then("el registro queda guardado en bd con link {string}", async (name) => {
  const result = await page.getRecordInsertedByName(name);
  expect(result?.titulo).toBeTruthy();
});
