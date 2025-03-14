// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import CGU from "./components/CGU";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ProfileEditComponent from "./components/ProfileEditComponent";
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import CommentNewPage from "./pages/CommentNewPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/PageProfile";
import PasswordRecovery from "./pages/PasswordRecovery";
import PostRequest from "./pages/PostRequest";
import RequestDetails from "./pages/RequestDetails";
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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/CGU",
    element: <CGU />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
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
        path: "password_recovery",
        element: <PasswordRecovery />,
      },
      {
        path: "request-details/:id",
        element: <RequestDetails />,
      },
      {
        path: "post_request",
        element: <PostRequest />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "/users/:id/edit",
        element: <ProfileEditComponent />,
      },
      {
        path: "comments",
        element: <CommentNewPage />,
      },
    ],
  },
]);

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
