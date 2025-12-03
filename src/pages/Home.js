import React from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Invitation from "../components/Invitation";
import Gallery from "../components/Gallery";

export default function Home({ onNavigate }) {
  return (
    <section className="space-y-10">
      <Hero onNavigate={onNavigate} />

      <div className="grid md:grid-cols-3 gap-6">
        <Card title="خلوات فردية هادئة" text="وقت للصلاة والراحة في جو روحي هادئ." />
        <Card title="برامج روحية" text="خلوات، دراسات كتاب، وورش روحية مستوحاة من التراث القبطي." />
        <Card title="مؤتمرات واجتماعات" text="قاعات مجهزة للاجتماعات وورش العمل والخدمات المجتمعية." />
      </div>

      <Invitation />
      <Gallery />
    </section>
  );
}

