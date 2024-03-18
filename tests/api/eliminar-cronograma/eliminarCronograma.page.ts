import { APIRequestContext } from "@playwright/test";

export interface Cronograma {
  name: string;
  date: Date;
}

export class EliminarCronograma {
  private graphql: APIRequestContext;
  declare httpCode: number;
  declare message: string;

  constructor(graphql: APIRequestContext) {
    this.graphql = graphql;
  }
  async enviarPeticion(id: number) {
    const query = `mutation RemoveCron($removeCronId: ID!) {
      removeCron(id: $removeCronId)
    }
    `;
    const response = await this.graphql.post("", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query,
        variables: { removeCronId: id },
      },
    });
    const { data, errors } = await response.json();
    if (Array.isArray(errors)) {
      throw new Error(errors[0].message);
    }
    this.message = data.createCron;
    this.httpCode = response.status();
  }
}
