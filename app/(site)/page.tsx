import AboutSection from "../../components/home/AboutSection";
import Banner from "../../components/home/Banner";
import ProjectsSection from "../../components/home/ProjectsSection";
import OtherProjects from "../../components/home/OtherProjects";
import SkillsSection from "../../components/home/SkillsSection";
import BlogSection from "../../components/home/BlogSection";
import ContactSection from "../../components/home/ContactSection";
import Experience from "../../components/home/Experience";
import prisma from "../../lib/prisma";

export default async function Home() {
  const experienceData = await prisma.experience.findMany({
    orderBy: {
      startDate: "desc",
    },
  });
  return (
    <>
      <Banner />
      <AboutSection />
      <ProjectsSection />
      <OtherProjects />
      <Experience data={experienceData} />
      <SkillsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
