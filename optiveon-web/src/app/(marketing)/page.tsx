import {
  Hero,
  Features,
  ProductTour,
  ValidationLab,
  CustomerStories,
  Solutions,
  Technology,
  ReleaseRadar,
  Contact,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductTour />
      <ValidationLab />
      <Features />
      <Solutions />
      <Technology />
      <ReleaseRadar />
      <CustomerStories />
      <Contact />
    </>
  );
}
