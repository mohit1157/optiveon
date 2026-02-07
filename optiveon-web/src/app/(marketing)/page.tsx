import {
  Hero,
  Features,
  ProductTour,
  ValidationLab,
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
      <ValidationLab />
      <Features />
      <ProductTour />
      <RoiCalculator />
      <CustomerStories />
      <Solutions />
      <Technology />
      <ActivityFeed />
      <InquiryInsights />
      <ReleaseRadar />
      <StackBand />
      <Contact />
    </>
  );
}
