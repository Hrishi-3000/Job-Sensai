import React, { useState, useEffect } from "react";

function App() {
  // Example state and effect
  const [message, setMessage] = useState("Welcome to React!");

  useEffect(() => {
    console.log("App mounted");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold">{message}</h1>
    </div>
  );
}
export default App;
