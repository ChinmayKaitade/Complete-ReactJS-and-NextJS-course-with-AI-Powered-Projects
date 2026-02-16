import Button from "./Button";

const Card = ({ title = "Default", buttonText = "Check it out", imageUrl }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-xl mt-8 shadow overflow-hidden transition-shadow">
      <img
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt="Sample Image"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Card Title</h2>
        <p className="mt-2 text-gray-600 text-sm">
          {title}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
          necessitatibus quibusdam harum beatae id ratione!
        </p>

        <Button buttonText={buttonText} />
      </div>
    </div>
  );
};

export default Card;

// https://images.unsplash.com/photo-1769096914324-c8186f3ae3b6?q=80&w=695&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

// https://images.unsplash.com/photo-1769912651525-0743d3c90318?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
