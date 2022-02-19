import React from "react";

import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { ConnectedRouter } from "connected-react-router";

import Header from "../components/Header";
import Login from "../pages/Login";
import PostList from "../components/PostList";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Signup from '../page/Signup';
import Main from '../page/Main';
import MainRecent from '../page/MainRecent';
import PostAdd from '../page/PostAdd';

function App() {
  return (
    <div className="App" style={{backgroundColor:"#121212"}}>
      <Header />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Login} />
        <Route path="/user/signup" exact component={Signup} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/write/:id" exact component={PostWrite} />
        <Route path="/post" exact component={PostDetail} />
        <Route path="/" exact component={Main} />
        <Route path="/recent" exact component={MainRecent} />
        <Route path="/write" exact component={PostAdd} />
      </ConnectedRouter>
    </div>
  );
}
export default App;

