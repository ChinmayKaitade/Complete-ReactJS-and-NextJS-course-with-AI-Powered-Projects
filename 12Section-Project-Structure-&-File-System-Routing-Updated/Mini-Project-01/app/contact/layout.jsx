import React from "react";

const ContactLayoutPage = ({ children }) => {
  return (
    <div>
      <h1>Header</h1>
      {children}
      <h1>Footer</h1>
    </div>
  );
};

export default ContactLayoutPage;
