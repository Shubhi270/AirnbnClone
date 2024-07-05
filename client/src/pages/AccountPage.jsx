import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../AccountNavigation";
const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);

  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");

    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "loading";
  }

  if (ready && !user && !redirect) {
    console.log("Redirecting to login because user is not logged in");
    return <Navigate to={"/login"} />;
  }

  

  if (redirect) {
    console.log("Redirecting to:", redirect);
    return <Navigate to={redirect} />;
  }

  console.log("Rendering AccountPage with subpage:", subpage);
  console.log("User context:", user);

  return (
    <div>
     <AccountNavigation></AccountNavigation>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && (<PlacesPage></PlacesPage>)}
    </div>
  );
};

export default AccountPage;
