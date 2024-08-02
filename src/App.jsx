import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import {AppLayoutPage} from "./pages/AppLayoutPage";
import {CityList} from "./components/CityList";
import {useEffect, useState} from "react";
import {CountryList} from "./components/CountryList";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

const BASE_URL = 'http://localhost:9000/cities';
function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCities() {
            try {
                setIsLoading(true)
                const response = await fetch(BASE_URL, {signal: controller.signal});

                if (!response.ok) throw new Error('Something went wrong with fetching questions.');

                const data = await response.json();
                setCities(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();

        return () => {
            controller.abort();
        }
    }, [setCities]);

  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayoutPage />}>
                {/* Navigate (redirect) to cities page immediately, use replace to prevent loop of being stuck on page */}
                <Route isLoading={isLoading} index element={<Navigate replace to="cities" />} />
                <Route isLoading={isLoading} path="cities" element={<CityList cities={cities} />} />
                <Route path="cities/:id" element={<City />} />
                <Route isLoading={isLoading} path="countries" element={<CountryList cities={cities} />} />
                <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
