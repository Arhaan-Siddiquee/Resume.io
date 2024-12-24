import React, { useState } from "react";
import Form from "./components/Form";
import Preview from "./components/Preview";
import ExportButton from "./components/ExportButton";

function App() {
  const [details, setDetails] = useState({
    personal: {},
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    hobbies: [],
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mt-8">Resume.io</h1>
      <div className="flex flex-wrap justify-around w-full mt-8 px-4">
        <Form details={details} setDetails={setDetails} />
        <Preview details={details} />
      </div>
      <ExportButton details={details} />
    </div>
  );
}

export default App;
