import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

interface Impacted_person {
  firstname: string;
  lasttname: string;
  avatar: string;
}

class Impacted_personRepository {
  async create(request_id: number, impacted_personIds: number[]) {
    if (impacted_personIds.length === 0) {
      return;
    }

    // Préparer les valeurs pour l'insertion en masse
    const values = impacted_personIds.map((userId) => [request_id, userId]);

    // Effectuer l'insertion en masse
    const [result] = await databaseClient.query<ResultSetHeader>(
      "INSERT INTO impacted_person (request_id, user_id) VALUES ?",
      [values],
    );

    return result.insertId;
  }

  async read(requestId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT user.firstname, user.lastname,user.avatar
      FROM user JOIN impacted_person ON user.id= impacted_person.user_id where impacted_person.request_id=?`,
      [requestId],
    );

    return rows as Impacted_person[];
  }
}

export default new Impacted_personRepository();
