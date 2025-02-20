import { useContext } from "react";
import Profile from "../components/ProfileComponent";
import UserContext from "../context/userContext";
function ProfilePage() {
  const { user } = useContext(UserContext);
  return <>{user ? <Profile /> : <h2>You are not connected</h2>}</>;
}
export default ProfilePage;
