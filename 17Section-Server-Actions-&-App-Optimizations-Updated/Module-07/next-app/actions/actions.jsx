"use server";

export async function createTodo(formData) {
  "use server";

  const title = formData.get("title");
  console.log("Creating a Todo: ", title);
}

export async function updateTodo(title, desc, isCompleted) {
  const newData = {
    title,
    desc,
    isCompleted,
  };

  // db call

  return {
    success: true,
    message: "Updated Successfully!",
  };
}

export async function submitUser(formData) {
  const name = formData.get("name");
  const email = formData.get("email");

  console.log("Submitting User Data: ", name, email);

  // db logic
}
