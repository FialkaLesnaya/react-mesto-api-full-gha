import React from "react";

export const currentUserObject = {
  name: "",
  about: "",
  avatar: "",
};

export const CurrentUserContext = React.createContext(currentUserObject);
