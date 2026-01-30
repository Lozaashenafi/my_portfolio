import AboutSection from "../../components/home/AboutSection";
import Banner from "../../components/home/Banner";
import ProjectsSection from "../../components/home/ProjectsSection";
import OtherProjects from "../../components/home/OtherProjects";
import SkillsSection from "../../components/home/SkillsSection";
import BlogSection from "../../components/home/BlogSection";
export default function Home() {
  return (
    <>
      <Banner />
      <AboutSection />
      <ProjectsSection />
      <OtherProjects />
      <SkillsSection />
      <BlogSection />
    </>
  );
}
