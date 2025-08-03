import React from "react";
import Header from "@/components/Header";
import TicketPurchase from "@/components/TicketPurchase";
import Footer from "@/components/Footer";

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