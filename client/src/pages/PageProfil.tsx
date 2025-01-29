import { useContext } from "react";
import Profil from "../components/ProfilComponent";
import AuthContext from "../context/authContext";
function ProfilPage() {
  const { auth } = useContext(AuthContext);
  return <>{auth ? <Profil /> : <h2>You are not connected</h2>}</>;
}
export default ProfilPage;
