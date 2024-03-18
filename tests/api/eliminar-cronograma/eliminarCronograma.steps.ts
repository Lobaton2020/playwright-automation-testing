import { Given, Then, When } from "@cucumber/cucumber";
import { ICustomWorld } from "../../_common/custom-world";
import { EliminarCronograma } from "./eliminarCronograma.page";
import { APIRequestContext, expect } from "@playwright/test";

let page: EliminarCronograma;

Given("quiero eliminar un cronograma", async function (this: ICustomWorld) {
  page = new EliminarCronograma(this.graphql as APIRequestContext);
});

When("envio la peticion con el id {int}", async (id: number) => {
  await page.enviarPeticion(id);
});

Then("el codigo de respuest debe ser {int}", async (httpCode: number) => {
  expect(httpCode).toBe(page.httpCode);
});
