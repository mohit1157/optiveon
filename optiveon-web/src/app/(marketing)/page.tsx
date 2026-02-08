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
  Pricing,
  CommonQuestions,
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
      <Pricing />
      <Features />
      <RoiCalculator />
      <Solutions />
      <Technology />
      <ActivityFeed />
      <InquiryInsights />
      <ReleaseRadar />
      <CommonQuestions />
      <Contact />
    </>
  );
}
