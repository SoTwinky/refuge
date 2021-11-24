import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Pets from "./pages/Pets/Pets";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Refuges from "./pages/Refuges/Refuges";
import Refuge from "./pages/Refuges/Refuge";
import Pet from "./pages/Pets/Pet";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/refuges">
                    <Refuges/>
                </Route>
                <Route exact path="/refuge/:url">
                    <Refuge/>
                </Route>
                <Route exact path="/pet/:_id">
                    <Pet/>
                </Route>
                <Route exact path="/pets">
                    <Pets/>
                </Route>
                <Route exact path="/news">
                    <News/>
                </Route>
                <Route exact path="/about">
                    <About/>
                </Route>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
