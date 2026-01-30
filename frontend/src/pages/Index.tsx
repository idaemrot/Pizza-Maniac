"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pizza, Truck, Clock, Leaf } from "lucide-react"; // Icons for features

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center rounded-b-xl">
        <Link to="/" className="text-3xl font-extrabold text-red-700 tracking-tight">
          Pizza Maniac
        </Link>
        <nav className="space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg font-semibold">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md transition-colors duration-200">
              Sign Up
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center bg-cover bg-center rounded-b-3xl shadow-lg overflow-hidden"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white p-6 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              Craving Pizza? We've Got You Covered!
            </h1>
            <p className="text-lg md:text-xl mb-8 drop-shadow-md">
              Experience the freshest ingredients and fastest delivery right to your door.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/user/menu">
                <Button className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-full font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
                  Order Now
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-2 border-white text-black text-lg px-8 py-6 rounded-full font-bold shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-red-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Why Choose Pizza Maniac?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="rounded-2xl shadow-lg border-none p-6 text-center bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
                <Pizza size={48} className="text-red-600 mb-3" />
                <CardTitle className="text-xl font-bold text-gray-800">Delicious Pizzas</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600">
                Crafted with passion, every pizza is a masterpiece of flavor.
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-none p-6 text-center bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
                <Truck size={48} className="text-red-600 mb-3" />
                <CardTitle className="text-xl font-bold text-gray-800">Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600">
                Hot and fresh, delivered right to your doorstep in no time.
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-none p-6 text-center bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
                <Leaf size={48} className="text-red-600 mb-3" />
                <CardTitle className="text-xl font-bold text-gray-800">Fresh Ingredients</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600">
                Only the finest, freshest ingredients make it into our kitchen.
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-none p-6 text-center bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
                <Clock size={48} className="text-red-600 mb-3" />
                <CardTitle className="text-xl font-bold text-gray-800">Easy Ordering</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600">
                A seamless online experience from selection to checkout.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action for Login/Register */}
        <section className="py-16 px-6 bg-red-600 text-white text-center rounded-t-3xl shadow-inner">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join the Pizza Maniac family today and get access to exclusive deals and a personalized ordering experience!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-2 border-white text-black hover:bg-red-700 text-lg px-8 py-6 rounded-full font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
                Login Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6 text-center rounded-t-xl">
        <p className="text-sm">&copy; {new Date().getFullYear()} Pizza Maniac. All rights reserved.</p>
        <p className="text-xs mt-2">Made with passion for pizza lovers.</p>
      </footer>
    </div>
  );
};

export default Index;