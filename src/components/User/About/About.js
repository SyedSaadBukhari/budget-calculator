import React from "react";

const About = ({ user }) => (
  <section className="bg-white rounded-lg overflow-hidden mb-6">
    <header className="bg-gray-50 px-6 py-3">
      <h2 className="text-lg font-medium text-gray-900">About Me</h2>
    </header>
    <main className="px-6 py-4">
      <p className="text-gray-500 text-sm leading-relaxed">
        {user?.aboutUser ?? "No information provided."}
      </p>
    </main>
  </section>
);

export default About;
