import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  email: string;
  password: string;
};

class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (firstname,lastname,birthday,email, password) values ( ?, ?, ?, ?, ?)",
      [user.firstname, user.lastname, user.birthday, user.email, user.password],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific user by users ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        id, 
        firstname, 
        lastname, 
        DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday, 
        email, 
        password, 
        role_id 
      FROM user 
      WHERE id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await databaseClient.query<Rows>("select * from user ");

    // Return the array of users
    return rows as User[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item
  // async update(item: Item) {
  //   ...
  // }

  async update(user: User) {
    // Execute the SQL UPDATE query to update an existing user in the "user" table
    const [result] = await databaseClient.query<Result>(
      "UPDATE `user` SET firstname = ?, lastname = ?, birthday = ? WHERE id = ?",
      [user.firstname, user.lastname, user.birthday, user.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new UserRepository();
