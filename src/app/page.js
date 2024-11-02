import DoctorsSection from "@/components/DoctorsSection";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DoctorsSection isHome={true} />
    </main>
  );
}
