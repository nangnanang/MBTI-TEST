import UserInfoContextProvider from "./context/userInfoContext";
import Router from "./Router";

const App = () => {
  return (
    <>
      <UserInfoContextProvider>
        <Router />
      </UserInfoContextProvider>
    </>
  );
};

export default App;
