import { createContact } from "@/actions/contact";
import ContactForm from "@/components/ContactForm";
import { dbConnect } from "@/lib/db";

export default async function Home() {
  await dbConnect();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      <ContactForm action={createContact} />
    </div>
  );
}
