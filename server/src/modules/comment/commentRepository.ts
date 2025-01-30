import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Comment = {
  details: string;
  date: string;
};
type Newcomment = {
  details: string;
  user_id: number;
  request_id: number;
};

class CommentRepository {
  // The C of CRUD - Create operation

  // The Rs of CRUD - Read operations

  async create(newComment: Omit<Newcomment, "id">) {
    // Execute the SQL INSERT query to add a new request to the "request" table
    const [result] = await databaseClient.query<Result>(
      "insert into comment (details,user_id,request_id) values ( ?, ?, ?)",
      [newComment.details, newComment.user_id, newComment.request_id],
    );

    // Return the ID of the newly inserted request
    return result.insertId;
  }

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

  async update(comment: Omit<Comment, "id">) {
    const [result] = await databaseClient.query<Result>(
      "update comment set details = ? where id = ?",
      [comment.details],
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
