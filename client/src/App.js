import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import Welcome from "./Welcome";
function App() {
  const [{ user }] = useStateValue();
  
  return (
    <Router>
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
            <Switch>
            <Route exact path="/">
            <Sidebar />
            <Welcome />
              </Route>
              <Route exact path="/:roomId">
                <Sidebar/>
                <Chat />
              </Route>
              
            </Switch>
          
        </div>
      )}
    </div>
    </Router>
  );
}

export default App;
