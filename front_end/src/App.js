import {Routes, Route} from "react-router-dom"
import LoginPage from "./components/login_page/index"
import SearchPage from "./pages/search_page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={ <LoginPage /> }/>
        <Route path="/" element={ <SearchPage/> }/>
      </Routes>

    </>
  );
}

export default App;
