import React from "react";

import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { ConnectedRouter } from "connected-react-router";

import Header from "../components/Header";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostList from "../components/PostList";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

function App() {
  return (
    <div className="App" style={{backgroundColor:"#121212"}}>
      <Header />
      <ConnectedRouter history={history}>
        {/* <Route path="/" exact component={PostList} /> */}
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/write/:id" exact component={PostWrite} />
        <Route path="/post" exact component={PostDetail} />
      </ConnectedRouter>
    </div>
  );
}
export default App;

