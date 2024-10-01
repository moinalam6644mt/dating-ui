import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [alluserData, setAlluserData] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [language,setLanguage]=useState('english');
  const [myGalleryData,setMyGalleryData]=useState([]);
  const [allLanguageKey,setAllLanguageKey]=useState(null);
  const [memberId,setMemberId]=useState(null)
  return (
    <AuthContext.Provider
      value={{
        alluserData,
        setAlluserData,
        selectedValue,
        setSelectedValue,
        language,
        setLanguage,
        myGalleryData,
        setMyGalleryData,
        allLanguageKey,
        setAllLanguageKey,
        memberId,
        setMemberId

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 