import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import MainNavigation from "./MainNavigation/MainNavifation";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(()=>import("../pages/MoviePage/MoviePage"));
const MovieDetailsPage = lazy(()=> import("../pages/MoviesDetailsPage/MoviesDetailsPage"));
const NotFoundPage = lazy(()=> import("../pages/NotFoundPage/NotFoundPage"));

const App = () => {
  return (
    <div>
      <MainNavigation />

      <Suspense fallback = {<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage/>
          </Route>

          <Route path ="/movies/:slug">
            <MovieDetailsPage/>
          </Route>

          <Route path ="/movies">
            <MoviesPage/>
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;












/*export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        textTransform: 'uppercase',
        color: '#010101',
        backgroundColor: 'red'
        
      }}
    >
      React homework template
    </div>
  );
};*/
