import { Link } from "../registrarLink.page";

export class LinkDao {
  constructor(public name?: string, public link?: string) {}
  toJson(): Link {
    return {
      titulo: this.name as string,
      url_link: this.link as string,
    };
  }
}
