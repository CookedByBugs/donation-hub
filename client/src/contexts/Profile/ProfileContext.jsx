import React, { createContext, useContext } from "react";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  return (
    <ProfileContext.Provider value={{}}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);

export default ProfileProvider;
