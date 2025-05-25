import { getRequest } from "@/actions/requests/requests";
import DoctorsSection from "@/components/DoctorsSection";
import Hero from "@/components/Hero";

export default async function Home() {

  const {requests} = await getRequest();

  return (
    <main className="min-h-screen">
      <Hero />
      <DoctorsSection isHome={true}  requests={requests} />
    </main>
  );
}
