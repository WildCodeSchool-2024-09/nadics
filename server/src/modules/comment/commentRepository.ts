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
type RequestComment = {
  details: string;
  user_id: number;
  request_id: number;
  firstname: string;
  lastname: string;
  avatar: string;
};

class CommentRepository {
  // The C of CRUD - Create operation

  async create(newComment: Omit<Newcomment, "id">) {
    // Execute the SQL INSERT query to add a new request to the "request" table
    const [result] = await databaseClient.query<Result>(
      "insert into comment (details,user_id,request_id) values ( ?, ?, ?)",
      [newComment.details, newComment.user_id, newComment.request_id],
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

  async update(comment: Omit<Comment, "id">) {
    const [result] = await databaseClient.query<Result>(
      "update comment set details = ? where id = ?",
      [comment.details],
    );

    return result.affectedRows;
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

    // Return the array of users
    return rows as RequestComment[];
  }
  async readAllRequest(request_id: number) {
    // Execute the SQL SELECT query to retrieve all users from the "comment" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        comment.id, 
        DATE_FORMAT(comment.date, '%Y-%m-%d') AS date, 
        comment.details,
        comment.user_id, 
        comment.request_id,
        user.firstname,
        user.lastname,
        user.avatar
      FROM comment JOIN user ON user.id=comment.user_id WHERE comment.request_id=?`,
      [request_id],
    );

    // Return the array of users
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
