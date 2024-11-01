import Hero from "./components/Hero";
import DoctorsSection from "./components/DoctorsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DoctorsSection isHome={true} />
    </main>
  );
}
