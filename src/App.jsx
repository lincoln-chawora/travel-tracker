import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import {AppLayoutPage} from "./pages/AppLayoutPage";
import {CityList} from "./components/CityList";
import {CountryList} from "./components/CountryList";
import {City} from "./components/City.jsx";
import {Form} from "./components/Form.jsx";
import {CitiesProvider} from "./contexts/CitiesContext";

function App() {
  return (
    <CitiesProvider>
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route path="app" element={<AppLayoutPage />}>
                    {/* Navigate (redirect) to cities page immediately, use replace to prevent loop of being stuck on page */}
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route path="cities" element={<CityList />} />
                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<CountryList />} />
                    <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </CitiesProvider>
  )
}

export default App;
