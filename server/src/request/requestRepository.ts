import databaseClient from "../../database/client";

import type { Result, Rows } from "../../database/client";

type Request = {
  id: number;
  date: string;
  title: string;
  theme: string;
  details: string;
};

class RequestRepository {
  async update(request: Request) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update request set date = ?, title = ?, theme = ?, details = ?, where id = ?",
      [request.date, request.title, request.theme, request.details, request.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new RequestRepository();
