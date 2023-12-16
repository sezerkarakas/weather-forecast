import { createContext, useState, useContext } from "react";

const LocationContext = createContext();

export const LocaitonProvider = ({ children }) => {
  const [location, setLocation] = useState({ lat: 40.649722, lon: 35.835278 });
  const values = {
    location,
    setLocation,
  };
  return (
    <LocationContext.Provider value={values}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
