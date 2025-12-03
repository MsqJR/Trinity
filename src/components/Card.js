import React from "react";

export default function Card({ title, text }) {
  return (
    <article className="bg-white rounded-lg p-6 shadow text-right">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{text}</p>
    </article>
  );
}

