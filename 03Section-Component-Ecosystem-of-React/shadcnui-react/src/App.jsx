import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Button } from "./components/ui/button.tsx";

function App() {
  return (
    <>
      <Hero />

      <Header />

      <h1 className="text-blue-600 dark:text-orange-400 font-bold">
        Learn to Integrate Tailwind
      </h1>

      <Button variant="outline">Click Here</Button>

      <div className="flex gap-5">
        <Card
          title="Python Course"
          buttonText="Buy Python Course"
          imageUrl="https://images.unsplash.com/photo-1769096914324-c8186f3ae3b6?q=80&w=695&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <Card
          title="JavaScript Course"
          buttonText="Join Now"
          imageUrl="https://images.unsplash.com/photo-1769912651525-0743d3c90318?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <Card
          title="Java Course"
          buttonText="Buy Java Course"
          imageUrl="https://images.unsplash.com/photo-1770670588301-2769fd50a060?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </>
  );
}

export default App;
