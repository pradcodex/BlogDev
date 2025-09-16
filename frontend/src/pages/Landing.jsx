import { CreateUser } from "./CreateUser";
import { Login } from "./Login";
import { useState } from "react";

export function Landing() {

  const [view, setView] = useState(0)
  return (
    <>
      {!view ?
        <>
          <Login />
          <button onClick={() => setView(!view)}>Create new account</button>
        </> : <>
          <CreateUser />
          <button onClick={() => setView(!view)}>Login</button>
        </>
      }
    </>
  );
}
