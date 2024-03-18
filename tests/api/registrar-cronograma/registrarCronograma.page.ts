import { APIRequestContext } from "@playwright/test";

export interface Cronograma {
  name: string;
  date: Date;
}

export class RegistrarCronograma {
  private graphql: APIRequestContext;
  declare httpCode: number;
  declare message: string;

  constructor(graphql: APIRequestContext) {
    this.graphql = graphql;
  }
  async enviarPeticion(cron: Cronograma) {
    const query = `mutation CreateCron($cron: NewCronInput) {
      createCron(cron: $cron)
    }
    `;
    const response = await this.graphql.post("", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query,
        variables: { cron },
      },
    });
    const { data, errors } = await response.json();
    console.log({ data, errors });
    if (Array.isArray(errors)) {
      throw new Error(errors[0].message);
    }
    this.message = data.createCron;
    this.httpCode = response.status();
  }
}
