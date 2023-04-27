import {Routes, Route} from "react-router-dom"
import LoginPage from "./components/login_page/index"
import SearchPage from "./pages/search_page";
import RegisterPage from "./components/register_page";
import MessagePage from "./pages/message_page";
import ProfilePage from "./pages/profile_page";
import NotFound from "./components/not_found";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={ <LoginPage/> }/>
        <Route path="/register" element={ <RegisterPage/> }/>
        <Route path="/message" element={ <MessagePage/> } />
        <Route path="/profile" element={ <ProfilePage/> } />
        <Route path="/" element={ <SearchPage/> }/>
        <Route path="*" element={ <NotFound/> } />
      </Routes>

    </>
  );
}

export default App;
