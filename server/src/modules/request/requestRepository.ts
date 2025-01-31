import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Request {
  id: number;
  date: Date;
  title: string;
  theme: string;
  details: string;
}
interface RequestAdd {
  id: number;
  date: Date;
  title: string;
  theme: string;
  details: string;
  user_id: number;
}

class RequestRepository {
  // The C of CRUD - Create operation
  // a test to take user_id into account when creating a new request
  // async create(request: Omit<Request, "id"> & { userId: number }) {
  //   // Exécuter la requête SQL INSERT pour ajouter une nouvelle requête liée à un utilisateur
  //   const [result] = await databaseClient.query<Result>(
  //     "INSERT INTO request (title, theme, details, user_id) VALUES (?, ?, ?, ?)",
  //     [request.title, request.theme, request.details, request.userId],
  //   );

  //   // Retourner l'ID de la requête nouvellement insérée
  //   return result.insertId;
  // }

  async create(request: Omit<RequestAdd, "id">) {
    // Execute the SQL INSERT query to add a new request to the "request" table
    const [result] = await databaseClient.query<Result>(
      "insert into request (title,theme,details,user_id) values ( ?, ?, ?, ?)",
      [request.title, request.theme, request.details, request.user_id],
    );

    // Return the ID of the newly inserted request
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT request.*, DATE_FORMAT(request.date, '%Y-%m-%d') AS date , user.firstname, user.lastname,user.avatar
      FROM request JOIN user ON user.id= request.user_id`,
    );

    return rows as Request[];
  }

  //Search a request via id
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT request.*, DATE_FORMAT(request.date, '%Y-%m-%d') AS date , user.firstname, user.lastname,user.avatar
      FROM request JOIN user ON user.id= request.user_id where request.id=?`,
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

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from request where id=? ",
      [id],
    );
    return result.affectedRows;
  }
}
export default new RequestRepository();
