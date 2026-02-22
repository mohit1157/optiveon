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
  TrustStrip,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
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
