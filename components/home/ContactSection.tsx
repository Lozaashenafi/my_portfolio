import React from "react";
import { Mail, Phone, MapPin, Download, Github, Linkedin } from "lucide-react";
import { ContactInfoItem, SocialLink } from "../ui/ContactInfoItem";
import MiniHeader from "../ui/MiniHeader";
import prisma from "../../lib/prisma";
import ContactForm from "./ContactForm";
import { ContactMotionWrapper, ContactItemMotion } from "./ContactMotion"; // Import the wrappers

const ContactSection = async () => {
  const cv = await prisma.cv.findFirst({ orderBy: { createdAt: "desc" } });

  return (
    <section
      id="contact"
      className="bg-white dark:bg-dark-primary py-20 px-8 md:px-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Animation */}
        <div className="text-center mb-20">
          <MiniHeader title="Get In Touch" number={5} />
          <p className="max-w-xl mx-auto text-dark-tertiary dark:text-soft-white mt-4">
            I'm currently open to new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28">
          {/* Left Side: Staggered Info Items */}
          <ContactMotionWrapper side="left">
            <ContactItemMotion>
              <h3 className="text-3xl font-bold text-dark-tertiary dark:text-soft-white">
                Let's work together
              </h3>
            </ContactItemMotion>

            <div className="space-y-8">
              <ContactItemMotion>
                <ContactInfoItem
                  icon={<Mail className="text-primary" />}
                  label="Email"
                  value="lozaashenafi@gmail.com"
                />
              </ContactItemMotion>
              <ContactItemMotion>
                <ContactInfoItem
                  icon={<Phone className="text-primary" />}
                  label="Phone"
                  value="+251 937 732 953"
                />
              </ContactItemMotion>
              <ContactItemMotion>
                <ContactInfoItem
                  icon={<MapPin className="text-primary" />}
                  label="Location"
                  value="Addis Abeba, Ethiopia"
                />
              </ContactItemMotion>
            </div>

            <div className="pt-8 space-y-4">
              <ContactItemMotion>
                <SocialLink
                  icon={<Download size={18} />}
                  text="Download Resume"
                  href={cv?.filePath || "#"}
                />
              </ContactItemMotion>
              <ContactItemMotion>
                <SocialLink
                  icon={<Github size={18} />}
                  text="GitHub"
                  href="https://github.com/Lozaashenafi"
                />
              </ContactItemMotion>
              <ContactItemMotion>
                <SocialLink
                  icon={<Linkedin size={18} />}
                  text="LinkedIn"
                  href="https://www.linkedin.com/in/loza-ashenafi-773263286/"
                />
              </ContactItemMotion>
            </div>
          </ContactMotionWrapper>

          {/* Right Side: Form sliding in from the right */}
          <ContactMotionWrapper side="right">
            <ContactForm />
          </ContactMotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
