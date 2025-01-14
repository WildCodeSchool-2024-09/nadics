import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

interface Request {
  id: number;
  date: Date;
  title: string;
  theme: string;
  details: string;
}

class RequestRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT *, DATE_FORMAT(date, '%Y-%m-%d') AS date 
       FROM request`,
    );

    return rows as Request[];
  }
}
export default new RequestRepository();
