import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WorkIndex from "@/components/WorkIndex";
import FeaturedWork from "@/components/FeaturedWork";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkIndex />
        <FeaturedWork />
      </main>
      <Footer />
    </>
  );
}
