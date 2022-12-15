import React from "react";
import {useRoutes} from "react-router-dom";
import UsersList from './pages/UsersList';
import Add from "./pages/Add";

function App(){
    return useRoutes([
        {path: "/", element: <UsersList/>},
        {path: "add", element: <Add/>},
    ]);

}
export default App;
