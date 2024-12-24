import React, { useState } from "react";

function Form({ details, setDetails }) {
  const [section, setSection] = useState("personal");

  const handleInputChange = (key, value) => {
    setDetails({ ...details, [section]: { ...details[section], [key]: value } });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 capitalize">{section} Details</h2>

      {section === "personal" && (
        <>
          <div className="mb-4">
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Phone</label>
            <input
              type="tel"
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
        </>
      )}

      {/* Add similar forms for education, experience, etc. */}

      <div className="mt-6">
        <button
          onClick={() => setSection("education")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next: Education
        </button>
      </div>
    </div>
  );
}

export default Form;
