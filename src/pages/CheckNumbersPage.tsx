import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NumberChecker from "@/components/NumberChecker";

const CheckNumbersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NumberChecker />
      <Footer />
    </div>
  );
};

export default CheckNumbersPage;