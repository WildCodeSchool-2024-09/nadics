// import request from "supertest";
// import app from "../../src/app";
// import dotenv from "dotenv";

// dotenv.config({ path: ".env" });

// describe("Test pour création d utilisateur", () => {
//   beforeEach(() => {
//     //test d'intégration

//     // C'est une BDD fictive
//     app.locals.user = [];
//   });

//   test("devrait créer un utilisateur et le retourner", async () => {
//     const newUser = {
//       email: "dakhaa.g@gmail.com",
//       firstname: "Dakhaa",
//       surname: "G",
//       birthday: "2020-12-23",
//       password: "plop",
//       confirmpassword: "plop",
//     };

//     // rajout de /api
//     // seb dit qu'il faut envoyer les infos via un chemin pour le sql
//     const response = await request(app).post("/api/users").send(newUser);

//     expect(response.status).toBe(201);
//     expect(response.body).toEqual({
//       // le res.json du add user ne contient qu'un id donc il faut checkerque ça
//       id: 1,
//     });
//   });
// });

// //   test("devrait renvoyer tous les utilisateurs", async () => {
// //     const user1 = { name: "Cédric", email: "cedricchefdu69@hotmail.fr" };
// //     const user2 = { name: "Nadir", email: "nadir.reventethermomix@gmail.com" };

// //     // rajout de /api
// //     await request(app).post("/api/users").send(user1);
// //     await request(app).post("/api/users").send(user2);

// //     //browse
// //     const response = await request(app).get("/api/users");

// //     //dans browse il y a pas de renvoi de status 200,il faut ajouter dans le actions ?
// //     expect(response.status).toBe(200);
// //     expect(response.body).toEqual([
// //       { id: 1, name: "Cédric", email: "cedricchefdu69@hotmail.fr" },
// //       { id: 2, name: "Nadir", email: "nadir.reventethermomix@gmail.com" },
// //     ]);
// //   });

// //   test("Renvoi une erreur 400 si le nom ou email sont manquants", async () => {
// //     const incompleteUser = { name: "no email" };
// //     const response = await request(app).post("/api/users").send(incompleteUser);

// //     expect(response.status).toBe(400);
// //     expect(response.body).toEqual({ error: "Email et nom requis" });
// //   });
