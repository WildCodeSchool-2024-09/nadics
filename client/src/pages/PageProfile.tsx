import { useContext } from "react";
import Profile from "../components/ProfileComponent";
import AuthContext from "../context/authContext";
function ProfilePage() {
  const { auth } = useContext(AuthContext);
  return <>{auth ? <Profile /> : <h2>You are not connected</h2>}</>;
}
export default ProfilePage;
