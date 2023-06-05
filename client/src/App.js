import {BrowserRouter,Routes,Route} from "react-router-dom"
import UserRoute from "./router/UserRoute";
import AdminRoute from "./router/AdminRoute";
import MechanicRoute from "./router/MechanicRoute";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/*' element={<UserRoute/>}/>
      <Route exact path='/admin/*' element={<AdminRoute/>}/>
      <Route exact path='/mechanic/*' element={<MechanicRoute/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
