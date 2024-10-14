import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register'; // Kay�t bile�eni
import Login from './components/Login'; // Giri� bile�eni

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/" exact>
                    <h1>Ana Sayfa</h1>
                </Route>
                {/* Di�er rotalar�n�z buraya eklenebilir */}
            </Switch>
        </Router>
    );
};

export default App;
