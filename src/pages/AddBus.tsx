
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { AddBusForm } from "@/components/AddBusForm";

export default function AddBus() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        <AddBusForm />
      </main>
    </div>
  );
}
