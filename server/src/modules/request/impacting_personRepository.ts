import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

interface Impacting_person {
  firstname: string;
  lasttname: string;
  avatar: string;
}

class Impacting_personRepository {
  async create(request_id: number, impacting_personIds: number[]) {
    if (impacting_personIds.length === 0) {
      return;
    }

    // Préparer les valeurs pour l'insertion en masse
    const values = impacting_personIds.map((userId) => [request_id, userId]);

    // Effectuer l'insertion en masse
    const [result] = await databaseClient.query<ResultSetHeader>(
      "INSERT INTO impacting_person (request_id, user_id) VALUES ?",
      [values],
    );

    return result.insertId;
  }

  async read(requestId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT user.firstname, user.lastname,user.avatar
      FROM user JOIN impacting_person ON user.id= impacting_person.user_id where impacting_person.request_id=?`,
      [requestId],
    );

    return rows as Impacting_person[];
  }
}

export default new Impacting_personRepository();
