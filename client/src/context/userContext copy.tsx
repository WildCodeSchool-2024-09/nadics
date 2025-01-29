// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../context/userContext";
// import type { UserTypeContext } from "../context/userContext";

// function DeleteUser() {
//   const { user } = useContext<UserTypeContext>(UserContext);
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);

//   const handleDelete = async () => {
//     if (user?.sub) {
//       try {
//         const response = await fetch(
//           ${import.meta.env.VITE_API_URL}/api/users/${user.sub},
//           {
//             method: "DELETE",
//           },
//         );

//         if (response.ok) {
//           alert("Account deleted successfully.");
//           navigate("/");
//         } else {
//           alert("Failed to delete account. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         alert("An error occurred while deleting the account.");
//       }
//     }
//   };

//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => setShowModal(true)}
//         id="delete-button"
//       >
//         Delete my account
//       </button>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <p>
//               ❌ Are you sure you want to delete your account? This action
//               cannot be undone.
//             </p>
//             <button type="button" id="delete-button-yes" onClick={handleDelete}>
//               🔴Yes, delete
//             </button>
//             <button
//               type="button"
//               id="delete-button-cancel"
//               onClick={() => setShowModal(false)}
//             >
//               🟢Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default DeleteUser;

// ////////////

// import "./Navbar.css";
// import { useContext, useState } from "react";
// import type { SetStateAction } from "react";
// import { Link } from "react-router-dom";
// import type { Auth } from "../App";
// import defaultAvatar from "../assets/images/avatar.jpg";
// import logo from "../assets/images/logo-removebg.png";
// import UserContext from "../context/userContext";
// import type { UserTypeContext } from "../context/userContext";

// interface NavbarProps {
//   setAuth: React.Dispatch<React.SetStateAction<Auth | null>>; // Typage correct de setAuth
//   auth: Auth | null;
// }

// function Navbar({ auth, setAuth }: NavbarProps) {
//   const handleLogout = () => {
//     // Supprimer cookie "authToken"
//     document.cookie =
//       "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

//     // Déconnexion en mettant auth à null
//     setAuth(null);
//   };

//   const { user } = useContext<UserTypeContext>(UserContext);

//   const [burger_class, setBurger_class] = useState("burger-bar unClicked");
//   const [menu_class, setMenu_class] = useState("menu hidden");
//   const [isMenuClicked, setMenuClicked] = useState(false);

//   const [hoveredLink, setHoveredLink] = useState(""); // État pour suivre le lien survolé

//   const handleMouseEnter = (link: SetStateAction<string>) => {
//     setHoveredLink(link);
//   };
//   const handleMouseLeave = () => {
//     setHoveredLink("");
//   };

//   const updateMenu = () => {
//     if (!isMenuClicked) {
//       setBurger_class("burger-bar clicked");
//       setMenu_class("menu visible");
//     } else {
//       setBurger_class("burger-bar unClicked");
//       setMenu_class("menu hidden");
//     }
//     setMenuClicked(!isMenuClicked);
//   };
//   return (
//     <header>
//       <Link to="/home">
//         <img src={logo} alt="logo" className="logoImg" />
//       </Link>
//       <nav>
//         <div
//           className="menu_burger"
//           onClick={updateMenu}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === " ") {
//               updateMenu(); // Simulate click on "Enter" or "Space"
//               e.preventDefault(); // Prevent scrolling for "Space"
//             }
//           }}
//         >
//           <div className={burger_class} />
//           <div className={burger_class} />
//           <div className={burger_class} />
//         </div>
//         <Link to="/profil">
//           {auth && user && (
//             <img
//               src={
//                 user.avatar
//                   ? ${import.meta.env.VITE_API_URL}/${user.avatar}
//                   : defaultAvatar
//               }
//               alt="avatar"
//               id="avatar_icon"
//             />
//           )}
//         </Link>
//       </nav>
//       <div className={menu_class}>
//         <Link
//           to="/login"
//           className={homeLink ${hoveredLink === "login" ? "hovered" : ""}} // survole de souris il change classname
//           onMouseEnter={() => handleMouseEnter("login")}
//           onMouseLeave={handleMouseLeave}
//           onClick={updateMenu}
//         >
//           Login
//         </Link>
//         <Link
//           to="/home"
//           className={homeLink ${hoveredLink === "home" ? "hovered" : ""}} // survole de souris il change classname
//           onMouseEnter={() => handleMouseEnter("home")}
//           onMouseLeave={handleMouseLeave}
//           onClick={updateMenu}
//         >
//           Home
//         </Link>
//         <Link
//           to="/profil"
//           className={homeLink ${hoveredLink === "profil" ? "hovered" : ""}}
//           onMouseEnter={() => handleMouseEnter("profil")}
//           onMouseLeave={handleMouseLeave}
//           onClick={updateMenu}
//         >
//           Profil
//         </Link>
//         <Link
//           to="/post_request"
//           className={homeLink ${hoveredLink === "post_request" ? "hovered" : ""}}
//           onMouseEnter={() => handleMouseEnter("post_request")}
//           onMouseLeave={handleMouseLeave}
//           onClick={updateMenu}
//         >
//           Create request
//         </Link>
//         <Link
//           to="/signup"
//           className={homeLink ${hoveredLink === "signup" ? "hovered" : ""}}
//           onMouseEnter={() => handleMouseEnter("signup")}
//           onMouseLeave={handleMouseLeave}
//           onClick={updateMenu}
//         >
//           Sign up
//         </Link>
//         <Link
//           to="/login"
//           className={homeLink ${hoveredLink === "logout" ? "hovered" : ""}}
//           onMouseEnter={() => handleMouseEnter("logout")}
//           onMouseLeave={handleMouseLeave}
//           onClick={handleLogout}
//         >
//           Logout
//         </Link>
//       </div>
//     </header>
//   );
// }

// export default Navbar;

// import { useContext, useState } from "react";
// import defaultAvatar from "../assets/images/avatar.jpg";
// import editIcon from "../assets/images/edit-icon.png";
// import "../components/ProfilComponent.css";

// import UserContext from "../context/userContext";
// import type { UserTypeContext } from "../context/userContext";
// import DeleteUser from "./DeleteUser";

// function Profil() {
//   const { user, setUser } = useContext<UserTypeContext>(UserContext);
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file) {
//       setAvatarFile(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!avatarFile || !user) {
//       alert("File not selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("avatar", avatarFile);

//     try {
//       const response = await fetch(
//         ${import.meta.env.VITE_API_URL}/upload-avatar/${user.sub},
//         {
//           method: "POST",
//           headers: {},
//           body: formData,
//         },
//       );

//       const data = await response.json();
//       if (response.ok) {
//         // Mettre à jour l'utilisateur avec le nouvel avatar
//         setUser((prevUser) => {
//           if (prevUser) {
//             return { ...prevUser, avatar: data.avatar };
//           }
//           return null;
//         });
//         alert("Avatar updated");
//       } else {
//         alert(data.message || "Une erreur s'est produite.");
//       }
//     } catch (error) {
//       console.error("An error occurred while uploading avatar", error);
//       alert("Erreur de connexion au serveur.");
//     }
//   };

//   return (
//     <div id="page_container">
//       {user && (
//         <main id="mainProfile">
//           <form
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             id="avatar_icon_container"
//           >
//             <div id="icon_container">
//               <input
//                 type="file"
//                 name="avatar"
//                 onChange={handleFileChange}
//                 id="input_upload"
//               />
//               <button type="button" className="button_icon">
//                 <img src={editIcon} alt="edit icon" id="edit_icon" />
//               </button>
//             </div>
//             <div id="avatar_container">
//               <img
//                 src={
//                   user.avatar
//                     ? ${import.meta.env.VITE_API_URL}/${user.avatar}
//                     : defaultAvatar
//                 }
//                 alt="avatar pic"
//                 id="avatar"
//               />
//             </div>
//             <button type="submit" id="button_icon-update">
//               <span>Update your avatar</span>
//             </button>
//           </form>
//           <div id="champ_container">
//             <div className="text_container">
//               <h3>{user.firstname}</h3>
//               <button type="button" className="button_icon">
//                 <img src={editIcon} alt="edit icon" className="edit_icon" />
//               </button>
//             </div>
//             <div className="text_container">
//               <h3>{user.lastname}</h3>
//               <button type="button" className="button_icon">
//                 <img src={editIcon} alt="edit icon" className="edit_icon" />
//               </button>
//             </div>
//             <div className="text_container">
//               <h3>{user.birthday}</h3>
//               <button type="button" className="button_icon">
//                 <img src={editIcon} alt="edit icon" className="edit_icon" />
//               </button>
//             </div>
//           </div>
//           <div id="lien_container">
//             <a href="Change my password" id="lien_change">
//               Change my password
//             </a>
//             <br />
//             <DeleteUser />
//           </div>
//         </main>
//       )}
//     </div>
//   );
// }

// export default Profil;

// import databaseClient from "../../../database/client";

// import type { Result, Rows } from "../../../database/client";

// type User = {
//   id: number;
//   firstname: string;
//   lastname: string;
//   birthday: string;
//   email: string;
//   hashed_password: string;
// };
// type UserToken = {
//   id: number;
//   firstname: string;
//   lastname: string;
//   birthday: string;
//   avatar: string;
//   email: string;
//   hashed_password: string;
// };

// class UserRepository {
//   // The C of CRUD - Create operation

//   async create(user: Omit<User, "id">) {
//     // Execute the SQL INSERT query to add a new user to the "user" table
//     const [result] = await databaseClient.query<Result>(
//       "insert into user (firstname,lastname,birthday,email, hashed_password) values ( ?, ?, ?, ?, ?)",
//       [
//         user.firstname,
//         user.lastname,
//         user.birthday,
//         user.email,
//         user.hashed_password,
//       ],
//     );

//     // Return the ID of the newly inserted user
//     return result.insertId;
//   }

//   // The Rs of CRUD - Read operations

//   async read(id: number) {
//     // Execute the SQL SELECT query to retrieve a specific user by users ID
//     const [rows] = await databaseClient.query<Rows>(
//       SELECT
//         id,
//         firstname,
//         lastname,
//         DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday,
//         avatar,
//         email,
//         hashed_password,
//         role_id
//       FROM user
//       WHERE id = ?,
//       [id],
//     );

//     // Return the first row of the result, which represents the user
//     return rows[0] as User;
//   }

//   async readAll() {
//     // Execute the SQL SELECT query to retrieve all users from the "user" table
//     const [rows] = await databaseClient.query<Rows>(select  id,
//         firstname,
//         lastname,
//         DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday,
//         avatar,
//         email,
//         hashed_password,
//         role_id  from user );

//     // Return the array of users
//     return rows as User[];
//   }

//   async readByEmailWithPassword(email: string) {
//     const [rows] = await databaseClient.query<Rows>(
//       SELECT  id,
//         firstname,
//         lastname,
//         DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday,
//         avatar,
//         email,
//         hashed_password,
//         role_id
//        FROM user
//        WHERE email = ?,
//       [email],
//     );

//     return rows[0] as UserToken;
//   }

//   // The U of CRUD - Update operation
//   // TODO: Implement the update operation to modify an existing item
//   // async update(item: Item) {
//   //   ...
//   // }

//   async update(user: User) {
//     // Execute the SQL UPDATE query to update an existing user in the "user" table
//     const [result] = await databaseClient.query<Result>(
//       "UPDATE user SET firstname = ?, lastname = ?, birthday = ? WHERE id = ?",
//       [user.firstname, user.lastname, user.birthday, user.id],
//     );

//     // Return how many rows were affected
//     return result.affectedRows;
//   }

//   async createAvatar(userId: number, avatarPath: string) {
//     const [result] = await databaseClient.query<Result>(
//       "UPDATE user SET avatar = ? WHERE id = ?",
//       [avatarPath, userId],
//     );
//     return result;
//   }

//   // The D of CRUD - Delete operation
//   // TODO: Implement the delete operation to remove an item by its ID

//   async delete(id: number) {
//     const [result] = await databaseClient.query<Result>(
//       "delete from user where id=? ",
//       [id],
//     );
//     return result.affectedRows;
//   }
// }

// export default new UserRepository();

// import type { RequestHandler } from "express";

// // Import access to data
// import userRepository from "./userRepository";

// // The B of BREAD - Browse (Read All) operation
// const browse: RequestHandler = async (req, res, next) => {
//   try {
//     // Fetch all users
//     const users = await userRepository.readAll();

//     // Respond with the users in JSON format
//     res.json(users);
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// // The R of BREAD - Read operation
// const read: RequestHandler = async (req, res, next) => {
//   try {
//     // Fetch a specific user based on the provided ID
//     const userId = Number(req.params.id);
//     const user = await userRepository.read(userId);

//     // If the user is not found, respond with HTTP 404 (Not Found)
//     // Otherwise, respond with the user in JSON format
//     if (user == null) {
//       res.sendStatus(404);
//     } else {
//       res.json(user);
//     }
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// // The E of BREAD - Edit (Update) operation
// const edit: RequestHandler = async (req, res, next) => {
//   try {
//     // Update a specific category based on the provided ID
//     const user = {
//       id: Number(req.params.id),
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       birthday: req.body.birthday,
//       email: req.body.email,
//       hashed_password: req.body.hashed_password,
//     };

//     const affectedRows = await userRepository.update(user);

//     // If the category is not found, respond with HTTP 404 (Not Found)
//     // Otherwise, respond with the category in JSON format
//     if (affectedRows === 0) {
//       res.sendStatus(404);
//     } else {
//       res.sendStatus(204);
//     }
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// // The A of BREAD - Add (Create) operation
// const add: RequestHandler = async (req, res, next) => {
//   try {
//     const newUser = {
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       birthday: req.body.birthday,
//       email: req.body.email,
//       hashed_password: req.body.hashed_password,
//     };

//     // Create the user
//     const insertId = await userRepository.create(newUser);

//     if (!insertId) {
//       throw new Error("Failed to create program.");
//     }
//     // Respond with HTTP 201 (Created) and the ID of the newly inserted user
//     res.status(201).json({ insertId });
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// // The D of BREAD - Destroy (Delete) operation
// const destroy: RequestHandler = async (req, res, next) => {
//   try {
//     const userId = Number(req.params.id);
//     await userRepository.delete(userId);
//     res.sendStatus(204);
//   } catch (err) {
//     next(err);
//   }
// };
// export default { browse, read, edit, add, destroy };

// CREATE TABLE role (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     rolename VARCHAR(50) NOT NULL
// );

// CREATE TABLE user (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     firstname VARCHAR(50) NOT NULL,
//     lastname VARCHAR(50) NOT NULL,
//     birthday DATE NOT NULL,
//     avatar VARCHAR(255),
//     email VARCHAR(50) NOT NULL UNIQUE,
//     hashed_password VARCHAR(255) NOT NULL,
//     role_id INT DEFAULT 2,
//     CONSTRAINT fk_user_role
// 	      FOREIGN KEY (role_id)
//         REFERENCES role(id)
//         ON DELETE SET NULL
// );

// CREATE TABLE request (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     title VARCHAR(50) NOT NULL,
//     theme VARCHAR(50) NOT NULL,
//     details TEXT NOT NULL,
//     user_id INT NOT NULL DEFAULT 1,
//     CONSTRAINT fk_request_user
//         FOREIGN KEY (user_id)
//         REFERENCES user(id)
//         ON DELETE CASCADE

// );

// CREATE TABLE comment (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     details TEXT NOT NULL,
//     date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     user_id INT NOT NULL,
//     request_id INT NOT NULL,
//     CONSTRAINT fk_comment_user
//         FOREIGN KEY (user_id)
//         REFERENCES user(id)
//         ON DELETE CASCADE,
//     CONSTRAINT fk_comment_request
//         FOREIGN KEY (request_id)
//         REFERENCES request(id)
//         ON DELETE CASCADE
// );

// insert into role(rolename)
// values
//   ("admin"),
//   ("visiteur");

// insert into user(firstname, lastname,birthday, email, hashed_password, role_id)
// values
//   ("Toto", "Tutu", "1994-02-05" , "toto.tutu@mail.com", "123456", 1),
//   ("Tata", "Titi", "2000.01.02","tata.titi@mail.com", "78910", 2);

// insert into request(date,title, theme, details, user_id)
// values
//   ("1994.12.24","titre1", "theme1", "bcp de details1", 1),
//   ("1994.11.24","titre2", "theme2", "bcp de details2", 2);

// insert into comment(details, date, user_id, request_id)
// values
//   ("jesuispasdaccord", "1994.11.25", 1, 1),
//   ("jesuisdaccord", "1994.11.26", 2, 2);

// // Import necessary modules from React and React Router
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";

// /* ************************************************************************* */

// // Import the main app component
// import App from "./App";
// import { UserProvider } from "./context/userContext";
// import HomePage from "./pages/HomePage";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import ProfilPage from "./pages/PageProfil";
// import PasswordRecovery from "./pages/PasswordRecovery";
// import PostRequest from "./pages/PostRequest";
// import RequestEdit from "./pages/RequestEdit";
// import SignupPage from "./pages/SignupPage";
// import UserEdit from "./pages/UserEdit";

// // Import additional components for new routes
// // Try creating these components in the "pages" folder

// // import About from "./pages/About";
// // import Contact from "./pages/Contact";

// /* ************************************************************************* */

// // Create router configuration with routes
// // You can add more routes as you build out your app!
// const router = createBrowserRouter([
//   {
//     path: "/",

//     element: <LandingPage />,
//   },
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "home",
//         element: <HomePage />,
//       },
//       {
//         path: "login",
//         element: <LoginPage />,
//       },
//       {
//         path: "signup",
//         element: <SignupPage />,
//       },
//       {
//         path: "password_recovery",
//         element: <PasswordRecovery />,
//       },
//       {
//         path: "/users/:id/edit",
//         element: <UserEdit />,
//       },
//       {
//         path: "post_request",
//         element: <PostRequest />,
//       },
//       {
//         path: "profil",
//         element: <ProfilPage />,
//       },
//       {
//         path: "test_edit/:id",
//         element: <RequestEdit />,
//       },
//     ],
//   },
//   // Try adding a new route! For example, "/about" with an About component
// ]);

// // Find the root element in the HTML document
// const rootElement = document.getElementById("root");
// if (rootElement == null) {
//   throw new Error(Your HTML Document should contain a <div id="root"></div>);
// }

// // Render the app inside the root element
// createRoot(rootElement).render(
//   <StrictMode>
//     <UserProvider>
//       <RouterProvider router={router} />
//     </UserProvider>
//   </StrictMode>,
// );

// //////////

// import express from "express";
// const router = express.Router();
// import path from "node:path";
// import multer from "multer";
// import authAction from "./auth/authAction";
// import commentActions from "./modules/comment/commentActions";
// /* ************************************************************************* */
// // Define Your API Routes Here
// /* ************************************************************************* */
// // Define user-related routes
// import requestActions from "./modules/request/requestActions";
// import uploads from "./modules/users/uploadsAction";
// import userActions from "./modules/users/userAction";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../public/uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, ${Date.now()}-${file.originalname});
//   },
// });

// const upload = multer({ storage });

// router.get("/api/comments", commentActions.browse);
// router.get("/api/comments/:id", commentActions.read);

// router.get("/api/users", userActions.browse);
// router.get("/api/users/:id", userActions.read);

// router.post("/api/login/", authAction.login);
// router.post("/api/users/", authAction.hashPassword, userActions.add);
// router.delete("/api/users/:id", userActions.destroy);

// router.post("/upload-avatar/:id", upload.single("avatar"), uploads.addAvatar);

// router.get("/api/request", requestActions.browse);

// router.get("/api/request/:id", requestActions.read);
// router.put("/api/request/:id", requestActions.edit);

// router.post("/api/request/", authAction.verifyToken, requestActions.add);
// router.delete("/api/request/:id", requestActions.destroy);
// /* ************************************************************************* */
// export default router;

// import { jwtDecode } from "jwt-decode";
// import { createContext, useEffect, useState } from "react";

// export type UserType = {
//   sub: number;
//   firstname: string;
//   lastname: string;
//   birthday: string;
//   avatar: string;
// };

// export type UserTypeContext = {
//   user: UserType | null; // Permet d'avoir un utilisateur ou null au départ
//   setUser: React.Dispatch<React.SetStateAction<UserType | null>>; // Typage correct pour setUser
// };

// const defaultValue: UserTypeContext = {
//   user: null, // Pas d'utilisateur par défaut
//   setUser: () => {}, // Valeur par défaut temporaire
// };

// const UserContext = createContext<UserTypeContext>(defaultValue); // creation de context

// const getCookie = (name: string) => {
//   const value = ; ${document.cookie};
//   const parts = value.split(; ${name}=);
//   if (parts.length === 2) return parts.pop()?.split(";").shift();
// };

// export const UserProvider = ({
//   // creation de provider pour passer context
//   children,
// }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<UserType | null>(null);

//   useEffect(() => {
//     const authToken = getCookie("authToken");
//     if (authToken) {
//       const decodedToken = jwtDecode<UserType>(authToken);
//       // Extraire les informations nécessaires
//       setUser(decodedToken);
//     }
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;

// rajoute moi une logique dans le fichier DeleteUser.tsx pour que quand je supprime un user, il se logout automatiquement, tiens ce code ci-dessus pour comprendre ce que j'ai fais
