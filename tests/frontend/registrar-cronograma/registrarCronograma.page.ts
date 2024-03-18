import { Page } from "playwright";
import { DatabaseProxy } from "../../_common/adapters/db-adapter";
import { ENV } from "../../_common/env";

export interface Cronograma {
  id_cronograma_PK: number;
  id_usuario_FK: number;
  titulo: string;
  fecha: Date;
}

export class RegistrarCronograma {
  private page: Page;
  private db: DatabaseProxy<Cronograma>;

  constructor(page: Page, db: DatabaseProxy) {
    this.page = page;
    this.db = db;
  }
  async openLogin() {
    await this.page.goto(ENV.FRONTEND_HOST);
  }
  async fillLoginForm(username: string, password: string) {
    const inputUsername = await this.page.waitForSelector("#inputUserame");
    const inputPassword = await this.page.waitForSelector("#inputPassword");

    await inputUsername.fill(username);
    await inputPassword.fill(password);
  }
  async clickLogin() {
    await this.page
      .locator("body > div > div > div > div > div.card-body > form > button")
      .click();
  }

  async clickCronogramas() {
    await this.page
      .locator(
        "#navbarTogglerDemo01 > ul.navbar-nav.text-light.logo_peque_min.mr-auto.mt-2.mt-lg-0 > li:nth-child(5) > a"
      )
      .click();
  }
  async clickNewButtonCronograma() {
    await this.page
      .locator(
        "body > div.container > div:nth-child(1) > div:nth-child(2) > button"
      )
      .click();
  }

  async fillCronogramaForm(title: string) {
    const inputTitle = await this.page.waitForSelector("#titulo");
    await inputTitle.fill(title);
  }
  async clickCreateCronograma() {
    await this.page
      .locator(
        "#agregar_cronograma > div > div > div.modal-footer > button.btn.btn-primary"
      )
      .click();
  }

  async getRecordInsertedByName(title: string): Promise<Cronograma | null> {
    return (await this.db.get("cronograma", { titulo: title }))[0];
  }
}
