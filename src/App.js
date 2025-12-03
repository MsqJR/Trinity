import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Facilities from "./pages/Facilities";
import Booking from "./pages/Booking";
import Calendar from "./pages/Calendar";

export default function App() {
  const [page, setPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-900 font-sans">
      <Header onNavigate={setPage} current={page} setSidebarOpen={setSidebarOpen} />
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onNavigate={(p) => {
          setPage(p);
          setSidebarOpen(false);
        }}
      />

      <main className="container mx-auto px-6 py-24">
        {page === "home" && <Home onNavigate={setPage} />}
        {page === "about" && <About />}
        {page === "facilities" && <Facilities onNavigate={setPage} />}
        {page === "booking" && <Booking />}
        {page === "calendar" && <Calendar />}
      </main>

      <Footer />
    </div>
  );
}

