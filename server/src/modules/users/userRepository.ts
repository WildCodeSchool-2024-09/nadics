import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  email: string;
  hashed_password: string;
};
type UserToken = {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  avatar: string;
  email: string;
  hashed_password: string;
};

class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (firstname, lastname, birthday, email, hashed_password) values ( ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.birthday,
        user.email,
        user.hashed_password,
      ],
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
        avatar,
        email, 
        hashed_password, 
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
    const [rows] = await databaseClient.query<Rows>(`select  id, 
        firstname, 
        lastname, 
        DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday, 
        avatar,
        email, 
        hashed_password, 
        role_id  from user `);

    // Return the array of users
    return rows as User[];
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT  id, 
        firstname, 
        lastname, 
        DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday, 
        avatar,
        email, 
        hashed_password, 
        role_id 
       FROM user 
       WHERE email = ?`,
      [email],
    );

    return rows[0] as UserToken;
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

  async createAvatar(userId: number, avatarPath: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET avatar = ? WHERE id = ?",
      [avatarPath, userId],
    );
    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from user where id=? ",
      [id],
    );
    return result.affectedRows;
  }
}

export default new UserRepository();
