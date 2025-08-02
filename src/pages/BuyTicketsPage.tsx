import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TicketPurchase from "@/components/TicketPurchase";

const BuyTicketsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TicketPurchase />
      <Footer />
    </div>
  );
};

export default BuyTicketsPage;