import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />

  <main className="grow p-6 max-w-5xl mx-auto">
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Waste Collection & Transport Tracker</h2>
          <p className="mb-4">
            Track pickups, assign drivers, and monitor vehicle locations in real-time. Our system ensures efficient waste management in your community.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Login</Link>
            <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">Residents</h3>
            <p>Request pickups, view your scheduled pickups, and track waste collection status in real-time.</p>
          </div>

          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">Drivers</h3>
            <p>Receive assigned pickups, update your live location, and ensure timely waste collection.</p>
          </div>

          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">Admin</h3>
            <p>Manage pickups, assign drivers, and monitor overall waste collection operations efficiently.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
