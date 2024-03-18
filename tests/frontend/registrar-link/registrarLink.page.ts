import { Page } from "playwright";
import { DatabaseProxy } from "../../_common/adapters/db-adapter";

export interface Link {
  id_link_PK?: number;
  id_usuario_FK?: number;
  titulo: string;
  url_link: string;
  fecha_ingreso?: Date;
}

export class RegistrarLink {
  private page: Page;
  private db: DatabaseProxy<Link>;

  constructor(page: Page, db: DatabaseProxy) {
    this.page = page;
    this.db = db;
  }
  async fillLinkTitle(title: string) {
    const inputTitle = await this.page.waitForSelector(
      "body > div.container > div.edi > form > input.form-control.mb-1"
    );
    await inputTitle.fill(title);
  }
  async fillLink(link: string) {
    const inputTitle = await this.page.waitForSelector(
      "body > div.container > div.edi > form > textarea"
    );
    await inputTitle.fill(link);
  }
  async clickCreateLink() {
    await this.page
      .locator(
        "body > div.container > div.edi > form > input.btn.btn-primary.btn-block.boton"
      )
      .click();
  }

  async getRecordInsertedByName(name: string): Promise<Link | null> {
    return (await this.db.get("Link", { titulo: name }))[0];
  }
}
