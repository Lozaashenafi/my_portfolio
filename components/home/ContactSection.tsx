// components/home/ContactSection.tsx
import React from "react";
import { Mail, Phone, MapPin, Download, Github, Linkedin } from "lucide-react";
import { ContactInfoItem, SocialLink } from "../ui/ContactInfoItem";
import MiniHeader from "../ui/MiniHeader";
import prisma from "../../lib/prisma"; // This is now safe because this is a Server Component
import ContactForm from "./ContactForm";

const ContactSection = async () => {
  // 1. Fetch CV on the server
  const cv = await prisma.cv.findFirst({ orderBy: { createdAt: "desc" } });

  return (
    <section
      id="contact"
      className="bg-white dark:bg-dark-primary py-20 px-8 md:px-14"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <MiniHeader title="Get In Touch" number={5} />
          <p className="max-w-xl mx-auto text-dark-tertiary dark:text-soft-white">
            I'm currently open to new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28">
          <div className="space-y-12">
            <h3 className="text-3xl font-bold text-dark-tertiary dark:text-soft-white">
              Let's work together
            </h3>

            <div className="space-y-8">
              <ContactInfoItem
                icon={<Mail className="text-primary" />}
                label="Email"
                value="lozaashenafi@gmail.com"
              />
              <ContactInfoItem
                icon={<Phone className="text-primary" />}
                label="Phone"
                value="+251 937 732 953"
              />
              <ContactInfoItem
                icon={<MapPin className="text-primary" />}
                label="Location"
                value="Addis Abeba, Ethiopia"
              />
            </div>

            <div className="pt-8 space-y-4">
              <SocialLink
                icon={<Download size={18} />}
                text="Download Resume"
                href={cv?.filePath || "#"} // Pass the dynamic link here
              />
              <SocialLink
                icon={<Github size={18} />}
                text="GitHub"
                href="https://github.com/Lozaashenafi"
              />
              <SocialLink
                icon={<Linkedin size={18} />}
                text="LinkedIn"
                href="https://www.linkedin.com/in/loza-ashenafi-773263286/"
              />
            </div>
          </div>

          {/* 2. Render the Form (Client Component) */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
