import Profil from "../components/ProfilComponent";
import type { Auth } from "../App";
import { useOutletContext } from "react-router-dom";
function ProfilPage() {
  const { auth } = useOutletContext() as { auth: Auth | null };
  return <>{auth ? <Profil /> : <h2>You are not connected</h2>}</>;
}
export default ProfilPage;
