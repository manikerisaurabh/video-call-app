
import React from "react";
import Form from "./components/Form";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
        <h1 className="text-center text-5xl font-extrabold text-gray-900 mb-8">
          <span className="text-blue-600">Saurabh</span> x{" "}
          <span className="text-teal-500">Video-app</span>
        </h1>
        <p className="text-center text-xl text-gray-600 mb-10">
          Join your channel and start the conversation!
        </p>
        <Form />
      </div>
    </div>
  );
}
