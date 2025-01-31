// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
// import UserEdit from "./pages/UserEdit";
import ProfileEditComponent from "./components/ProfilEditComponent";
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import CommentDeletePage from "./pages/CommentDeletePage";
import CommentEdit from "./pages/CommentEdit";
import CommentNewPage from "./pages/CommentNewPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilPage from "./pages/PageProfil";
import PasswordRecovery from "./pages/PasswordRecovery";
import PostRequest from "./pages/PostRequest";
import RequestDetails from "./pages/RequestDetails";
import RequestEdit from "./pages/RequestEdit";
import SignupPage from "./pages/SignupPage";
// import ProfileEditComponent from "./components/ProfilEditComponent";
// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    path: "/",

    element: <LandingPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "password_recovery",
        element: <PasswordRecovery />,
      },
      {
        path: "request-details/:id", // Utilisez cette route pour afficher les détails de la demande
        element: <RequestDetails />,
      },
      {
        path: "/users/:id/edit",
        element: <ProfileEditComponent />,
      },
      {
        path: "post_request",
        element: <PostRequest />,
      },
      {
        path: "profil",
        element: <ProfilPage />,
      },
      {
        path: "test_edit/:id",
        element: <RequestEdit />,
      },
      {
        path: "comments",
        element: <CommentNewPage />,
      },
      {
        path: "comments/:id",
        element: <CommentDeletePage />,
      },
      {
        path: "comment_edit/:id",
        element: <CommentEdit />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */
// Original version for backup :

// const router = createBrowserRouter([
//   {
//     path: "/", // The root path
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
//         path: "display-user/:id",
//         element: <DisplayUser />,
//       },
//       {
//         path: "post_request",
//         element: <PostRequest />,
//       },
//     ],
//   },
//   {
//     path: "landingPage",
//     element: <LandingPageComponent />,
//   },
//   // Try adding a new route! For example, "/about" with an About component
// ]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
