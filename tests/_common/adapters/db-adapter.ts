import { createPool, Pool, PoolConnection } from "mysql2/promise";
import { ENV } from "../env";
import { injectable } from "inversify";
@injectable()
export class DatabaseProxy<T = any> {
  private pool: Pool;

  constructor() {
    const dbConfig = {
      host: ENV.DB_HOST,
      user: ENV.DB_USER,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME,
    };
    this.pool = createPool(dbConfig);
  }

  async create(tableName: string, entity: Partial<T>): Promise<T> {
    const fields = Object.keys(entity).join(", ");
    const values = Object.values(entity);
    const placeholders = values.map(() => "?").join(", ");
    const query = `INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`;
    const [rows] = await this.query(query, values);
    return rows[0] as T;
  }

  async get(tableName: string, filters: Partial<T>): Promise<T[]> {
    const conditions = Object.keys(filters)
      .map((key) => `${key} = ?`)
      .join(" AND ");
    const values = Object.values(filters);
    const query = `SELECT * FROM ${tableName} WHERE ${conditions}`;
    const [rows] = await this.query(query, values);
    return rows as T[];
  }
  async getAll(tableName: string): Promise<T | null> {
    const query = `SELECT * FROM ${tableName}`;
    const [rows] = await this.query(query, []);
    return rows[0] as T | null;
  }

  async update(
    tableName: string,
    id: number,
    updates: Partial<T>
  ): Promise<T | null> {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updates);
    const query = `UPDATE ${tableName} SET ${fields} WHERE id = ?`;
    const [rows] = await this.query(query, [...values, id]);
    return rows[0] as T | null;
  }

  async delete(tableName: string, id: number): Promise<T | null> {
    const query = `DELETE FROM ${tableName} WHERE id = ?`;
    const [rows] = await this.query(query, [id]);
    return rows[0] as T | null;
  }

  private async query(sql: string, values: any[]): Promise<any[]> {
    let connection: PoolConnection | undefined;
    try {
      connection = await this.pool.getConnection();
      const rows = await connection.query(sql, values);
      return rows;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}
