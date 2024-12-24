import React from "react";

function Preview({ details }) {
  return (
    <div className="bg-blue-50 shadow-lg rounded-lg p-6 w-full md:w-1/2">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Resume Preview</h2>
      <div>
        <h3 className="text-xl font-bold">{details.personal?.name || "Your Name"}</h3>
        <p>{details.personal?.email || "Your Email"}</p>
        <p>{details.personal?.phone || "Your Phone"}</p>
        {/* Dynamically render sections */}
      </div>
    </div>
  );
}

export default Preview;
