import "./App.css";
import {router} from "./config/router"
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <>
    <RouterProvider router={router}/>
    
    </>
  );
}

export default App;
