import {lazy, Suspense} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {CityList} from "./components/CityList";
import {CountryList} from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import {CitiesProvider} from "./contexts/CitiesContext";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const AppLayoutPage = lazy(() => import("./pages/AppLayoutPage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <CitiesProvider>
        <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
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
            </Suspense>
        </BrowserRouter>
    </CitiesProvider>
  )
}

export default App;
