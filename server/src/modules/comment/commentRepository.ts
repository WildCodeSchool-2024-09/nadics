import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Comment = {
  id: number;
  date: string;
  details: string;
};

class CommentRepository {
  // The C of CRUD - Create operation

  async create(comment: Omit<Comment, "id">) {
    // Execute the SQL INSERT query to add a new comment to the "comment" table
    const [result] = await databaseClient.query<Result>(
      "insert into comment (details) values (?)",
      [comment.details],
    );
    // Return the ID of the newly inserted request
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific comment by comments ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        details
      FROM comment 
      WHERE id=?`,
      [id],
    );

    // Return the first row of the result, which represents the comment
    return rows[0] as Comment;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all comments from the "comment" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        id, 
        DATE_FORMAT(date, '%Y-%m-%d') AS date, 
        details,
        user_id, 
        request_id 
      FROM comment`,
    );

    // Return the array of comments
    return rows as Comment[];
  }

  // The U of CRUD - Update operation

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [comment] = await databaseClient.query<Result>(
      "delete from comment where id=? ",
      [id],
    );
    return comment.affectedRows;
  }
}

export default new CommentRepository();
