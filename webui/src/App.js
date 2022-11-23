import React from "react";
import {useRoutes} from "react-router-dom";
import UsersList from './UsersList';
import Add from "./Add";
import Modify from "./Modify";

function App(){
    return useRoutes([
        {path: "/", element: <UsersList/>},
        {path: "add", element: <Add/>},
        {path: "modify/:id", element: <Modify/>},
    ]);

}
export default App;
