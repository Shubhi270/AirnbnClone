import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import PlacesPage from "./pages/PlacesPage";
import PlacesForm from "./pages/PlacesForm";
import PageForPlace from "./pages/PageForPlace";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />

          <Route path="/account/places/new" element={<PlacesForm />} />

          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<PageForPlace />} />

          <Route path="/account/bookings" element={<BookingsPage />} />

          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
