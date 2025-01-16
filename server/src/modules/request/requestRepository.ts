import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

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

  //Search a request via id
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from request where id = ?",
      [id],
    );

    return rows[0] as Request;
  }

  async update(request: Request) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update request set title = ?, theme = ? where id = ?",
      [request.title, request.theme, request.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}
export default new RequestRepository();
