import './App.css';
import TopBar from './Components/TopBar';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <TopBar />
          </Route>

          <Route path="/home">
            <Home/>
          </Route>
       </Switch>
      </div>
    </Router>
  );
}

export default App;
