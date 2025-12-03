import React from "react";

export default function Card({ title, text }) {
  return (
    <article className="bg-divine-50 border-l-4 border-divine rounded-lg p-6 shadow text-right hover:shadow-lg transition-shadow">
      <h3 className="font-semibold text-lg text-divine-700">{title}</h3>
      <p className="mt-2 text-divine-olive text-sm">{text}</p>
    </article>
  );
}

