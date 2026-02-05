import {
  Hero,
  Features,
  ProductTour,
  Solutions,
  Technology,
  ActivityFeed,
  InquiryInsights,
  StackBand,
  Pricing,
  Contact,
} from "@/components/marketing";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StackBand />
      <Features />
      <ProductTour />
      <Solutions />
      <Technology />
      <ActivityFeed />
      <InquiryInsights />
      <Pricing />
      <Contact />
    </>
  );
}
