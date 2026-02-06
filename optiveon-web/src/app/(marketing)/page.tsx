import {
  Hero,
  Features,
  ProductTour,
  RoiCalculator,
  CustomerStories,
  Solutions,
  Technology,
  ActivityFeed,
  InquiryInsights,
  ReleaseRadar,
  StackBand,
  Pricing,
  Contact,
} from "@/components/marketing";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pricing />
      <StackBand />
      <Features />
      <ProductTour />
      <RoiCalculator />
      <CustomerStories />
      <Solutions />
      <Technology />
      <ActivityFeed />
      <InquiryInsights />
      <ReleaseRadar />
      <Contact />
    </>
  );
}
