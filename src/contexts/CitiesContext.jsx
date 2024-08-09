import {createContext, useContext, useEffect, useState} from "react";

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:9000/cities';

function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCities() {
            try {
                setIsLoading(true)
                const response = await fetch(`${BASE_URL}`, { signal: controller.signal });

                if (!response.ok) throw new Error('Something went wrong with fetching cities.');

                const responseData = await response.json();

                setCities(responseData)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }

        void fetchCities();

        return () => {
            controller.abort();
        }
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true)
            const response = await fetch(`${BASE_URL}${id ? `/${id}` : ''}`);

            if (!response.ok) throw new Error('Something went wrong with fetching city.');

            const responseData = await response.json();

            setCurrentCity(responseData);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true)
            const response = await fetch(`${BASE_URL}${id ? `/${id}` : ''}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error('Something went wrong with deleting city.');

            setCities(cities => (
                cities.filter((city) => city.id !== id)
            ));
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCity)
            });

            const data = await response.json();
            setCities(cities => [...cities, data]);
            setCurrentCity(data);
        } catch (e) {
            console.log(e.message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            getCity,
            createCity,
            deleteCity,
            currentCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCitiesContext() {
    const context = useContext(CitiesContext);

    if (context === undefined) throw Error('Cities context was used outside of post provider.');

    return context;
}

export {CitiesProvider, useCitiesContext};