import { dbConnect } from "@/lib/db";
import Contact from "@/lib/models/Contact";
import React from "react";

const Dashboard = async () => {
  await dbConnect();

  const contacts = await Contact.find();

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Contact Messages</h1>

      {contacts.map((contact) => (
        <div key={contact._id} className="border p-4 mb-4">
          <h3>{contact.name}</h3>
          <p>{contact.email}</p>
          <p>{contact.message}</p>

          <button>{contact.status}</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
