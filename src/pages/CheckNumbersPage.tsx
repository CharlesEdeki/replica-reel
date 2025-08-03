import React from "react";
import Header from "@/components/Header";
import NumberChecker from "@/components/NumberChecker";
import Footer from "@/components/Footer";

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