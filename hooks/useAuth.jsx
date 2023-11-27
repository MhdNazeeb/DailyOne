import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Auth } from "../config/authentication";

export default function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(Auth, (user) => {
      // console.log( user,"got user");
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsub;

  }, []);

  return { user };

}
