import React from "react";
import Form from "next/form";
import { submitUser } from "@/actions/actions";

const FormsPage = () => {
  return (
    <div>
      <h1>Create User</h1>

      <Form action={submitUser}>
        <input type="text" name="name" placeholder="Enter Name" />
        <input type="email" name="email" placeholder="Enter Email" />

        <button type="submit">Submit</button>
      </Form>

      <h1>Search Form</h1>
      <Form action={"/search"}>
        <input type="text" name="query" placeholder="Search Post ID" />
        <button type="submit">Search</button>
      </Form>
    </div>
  );
};

export default FormsPage;
