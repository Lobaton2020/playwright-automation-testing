import { Cronograma } from "../registrarCronograma.page";

export class CronDao {
  constructor(public name?: string, public date?: Date) {}
  toJson(): Cronograma {
    return {
      name: this.name as string,
      date: this.date as Date,
    };
  }
}
