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

import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://optiveon.com",
    "name": "Optiveon",
    "description": "Algorithmic trading research and strategy validation infrastructure.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://optiveon.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
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
