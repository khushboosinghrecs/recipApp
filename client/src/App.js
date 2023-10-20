import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import store from './utills/store';
import RecipeList from './component/RecipeList';
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Body } from './component/Body';
import  RecipeItem  from './component/RecipeItem'
export const appRouter = createBrowserRouter([
  { path: "/",
  element: <App />,
  children:[
  {
    path: "/",
    element: <Body />,
  },
  {
    path: "/recipe/:id",
    element: <RecipeItem />,
  },]
}
]
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Outlet />
      </div>
    </Provider>

  );
}

export default App;
