"use client";

import { MapPin, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { companyInfo } from "@/constants/content";
import { ContactForm } from "@/components/forms/contact-form";

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-[120px] relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-dark">
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(27, 53, 89, 0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-4xl">
          {/* Contact Info */}
          <div className="lg:text-left text-center">
            <Badge variant="outline" className="mb-md">
              Contact Us
            </Badge>
            <h2 className="text-section-title mb-lg">
              Let&apos;s Start a{" "}
              <span className="gradient-text">Conversation</span>
            </h2>
            <p className="text-foreground-secondary mb-2xl leading-relaxed">
              Have questions about our platform? Ready to explore how Optiveon
              can enhance your market research? We&apos;d love to hear from you.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-xl lg:items-start items-center">
              {/* Office */}
              <div className="flex gap-lg lg:flex-row flex-col lg:text-left text-center items-center">
                <div className="w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center bg-background-card border border-border rounded-lg">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium mb-xs">Office</h4>
                  <p className="text-[0.9375rem] text-foreground-secondary leading-relaxed">
                    {companyInfo.address.street}
                    <br />
                    {companyInfo.address.suite}
                    <br />
                    {companyInfo.address.city}, {companyInfo.address.state}{" "}
                    {companyInfo.address.zip}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-lg lg:flex-row flex-col lg:text-left text-center items-center">
                <div className="w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center bg-background-card border border-border rounded-lg">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium mb-xs">Email</h4>
                  <p className="text-[0.9375rem] text-foreground-secondary">
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="text-accent hover:text-accent-light transition-colors"
                    >
                      {companyInfo.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background-card border border-border rounded-xl p-2xl shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
