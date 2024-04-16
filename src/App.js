import react,{useState} from "react";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from './routes/index';
import * as auth from './helpers/auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const isLoggedIn = auth.isAuth()

  const getRoutes = (routes, _privateRoute) =>
    routes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse, _privateRoute);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });


  return (
    <div className="app">
      {isLoggedIn ?
        <>
          <Header />
          <Routes>
          {getRoutes(privateRoutes, true)}
        </Routes>
        </>
        :
        <>
        <Routes>
          {getRoutes(publicRoutes)}
        </Routes>
        </>
      }
    </div>
  );
}

export default App;
