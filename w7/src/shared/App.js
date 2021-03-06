import React from "react";

import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { ConnectedRouter } from "connected-react-router";

import Header from "../components/Header";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import Signup from '../pages/Signup';
import Main from '../pages/Main';
import MainRecent from '../pages/MainRecent';
import PostAdd from '../pages/PostAdd';
import Mypage from "../pages/Mypage";
import SearchTagPage from '../pages/SearchTagPage';
import Userpage from "../pages/Userpage";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#121212", minHeight: "100%", position: "relative" }}>
      <Header />
      <ConnectedRouter history={history}>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/post/:id" exact component={PostDetail} />
        <Route path="/" exact component={Main} />
        <Route path="/recent" exact component={MainRecent} />
        <Route path="/write" exact component={PostAdd} />
        <Route path="/write/:id" exact component={PostAdd} />
        <Route path="/My/:nickname" exact component={Mypage} />
        <Route path="/user/:nickname" exact component={Userpage} />
        <Route path="/posting/tags/:tag" exact component={SearchTagPage} />
      </ConnectedRouter>
    </div>
  );
}
export default App;

