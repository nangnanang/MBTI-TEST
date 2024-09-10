import { useLocation } from "react-router-dom";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

const Sign = () => {
  const hash = useLocation().hash;
  const signPage = () => {
    if (hash === "#in") return true;
    if (hash === "#up") return false;
  };

  return (
    <div className="flex flex-col bg-indigo-100 p-9 w-2/5 justify-center items-center m-auto">
      {signPage() ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default Sign;
