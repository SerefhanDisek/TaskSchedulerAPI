import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register'; // Kayýt bileþeni
import Login from './components/Login'; // Giriþ bileþeni

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/" exact>
                    <h1>Ana Sayfa</h1>
                </Route>
                {/* Diðer rotalarýnýz buraya eklenebilir */}
            </Switch>
        </Router>
    );
};

export default App;
