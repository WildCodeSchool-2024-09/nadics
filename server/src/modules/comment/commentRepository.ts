import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Comment = {
  id: number;
  details: string;
  date: string;
};

class CommentRepository {
  // The C of CRUD - Create operation

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific user by users ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        id, 
        DATE_FORMAT(date, '%Y-%m-%d') AS date, 
        details,
        user_id, 
        request_id 
      FROM comment 
      WHERE id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as Comment;
  }

  async update(comment: Comment) {
    const [result] = await databaseClient.query<Result>(
      "update comment set details = ? where id = ?",
      [comment.details, comment.id],
    );

    return result.affectedRows;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "comment" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        id, 
        DATE_FORMAT(date, '%Y-%m-%d') AS date, 
        details,
        user_id, 
        request_id 
      FROM comment`,
    );

    // Return the array of users
    return rows as Comment[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item
  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new CommentRepository();
