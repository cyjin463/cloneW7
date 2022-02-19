import { Router, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore"


import Signup from '../page/Signup';
import Main from '../page/Main';
import MainRecent from '../page/MainRecent';
import PostAdd from '../page/PostAdd';

import './App.css';

function App() {
  return (
    <div>
      <ConnectedRouter history={history}>
        <Route path="/user/signup" exact component={Signup} />
        <Route path="/" exact component={Main} />
        <Route path="/recent" exact component={MainRecent} />
        <Route path="/write" exact component={PostAdd} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
