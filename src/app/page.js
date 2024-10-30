import Image from "next/image";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Doctors from "./components/Doctors";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Doctors />
    </main>
  );
}
