import {
  Hero,
  Features,
  ProductTour,
  ValidationLab,
  CustomerStories,
  Solutions,
  Technology,
  ActivityFeed,
  InquiryInsights,
  ReleaseRadar,
  Contact,
} from "@/components/marketing";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CustomerStories />
      <ProductTour />
      <ValidationLab />
      <Features />
      <Solutions />
      <Technology />
      <ActivityFeed />
      <InquiryInsights />
      <ReleaseRadar />
      <Contact />
    </>
  );
}
