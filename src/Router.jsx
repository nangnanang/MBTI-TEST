import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Sign from "./pages/Sign";
import Mypage from "./pages/Mypage";
import Test from "./pages/Test";
import Result from "./pages/Result";
import Layout from "./components/Layout";
import { useContext } from "react";
import { userInfoContext } from "./context/userInfoContext";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 항상 접근 */}
          <Route path="/" element={<Home />} />
          {/* 비로그인 시 접근 */}
          <Route element={<AuthRoute />}>
            <Route path="/sign" element={<Sign />} />
          </Route>
          {/* 로그인 시 접근 */}
          <Route element={<PrivateRoute />}>
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/result" element={<Result />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

const AuthRoute = () => {
  const { token } = useContext(userInfoContext);
  if (token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
const PrivateRoute = () => {
  const { token } = useContext(userInfoContext);

  if (!token) {
    return <Navigate to="/sign#in" />;
  }
  return <Outlet />;
};

// const PrivateRoute = ({element:Element, ...rest}) => {
//     const { token } = useContext(userInfoContext);

//     return token ? <Element {...rest}/> : <Navigate to="/sign#in" />;

// };
