import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import { ContactInfoItem, SocialLink } from "../ui/ContactInfoItem";
import MiniHeader from "../ui/MiniHeader";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="bg-white dark:bg-dark-primary py-20 px-8 md:px-14 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <MiniHeader title="Get In Touch" number={5} />
          <p className="text-primary font-mono text-sm mb-4 font-bold uppercase tracking-widest">
            What's Next?
          </p>

          <p className="max-w-xl mx-auto text-dark-tertiary dark:text-soft-white   leading-relaxed">
            I'm currently open to new opportunities and interesting projects.
            Whether you have a question or just want to say hi, I'll do my best
            to get back to you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28">
          {/* Left Column: Contact Info */}
          <div className="space-y-12">
            <h3 className="text-3xl font-bold text-dark-tertiary dark:text-soft-white">
              Let's work together
            </h3>

            <div className="space-y-8">
              <ContactInfoItem
                icon={<Mail className="text-primary" size={24} />}
                label="Email"
                value="hello@johndoe.dev"
              />
              <ContactInfoItem
                icon={<Phone className="text-primary" size={24} />}
                label="Phone"
                value="+1 (555) 123-4567"
              />
              <ContactInfoItem
                icon={<MapPin className="text-primary" size={24} />}
                label="Location"
                value="San Francisco, CA"
              />
            </div>

            {/* Social & Resource Links */}
            <div className="pt-8 space-y-4 ">
              <SocialLink
                icon={<Download size={18} />}
                text="Download Resume"
                href="#"
              />
              <SocialLink
                icon={<Github size={18} />}
                text="View GitHub"
                href="#"
              />
              <SocialLink
                icon={<Linkedin size={18} />}
                text="LinkedIn Profile"
                href="#"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-mono font-bold text-slate-900 dark:text-soft-white uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-soft-white dark:bg-dark-secondary border border-slate-200 dark:border-dark-tertiary p-4 text-slate-900 dark:text-soft-white focus:border-primary outline-none transition-colors rounded-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-mono font-bold text-slate-900 dark:text-soft-white uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-soft-white dark:bg-dark-secondary border border-slate-200 dark:border-dark-tertiary p-4 text-dark-tertiary dark:text-soft-white focus:border-primary outline-none transition-colors rounded-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-mono font-bold text-slate-900 dark:text-soft-white uppercase tracking-wider">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full bg-soft-white dark:bg-dark-secondary border border-slate-200 dark:border-dark-tertiary p-4 text-slate-900 dark:text-soft-white focus:border-primary outline-none transition-colors rounded-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 px-8 rounded-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send size={18} />
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
