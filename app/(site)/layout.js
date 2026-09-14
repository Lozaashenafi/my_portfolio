import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto bg-light dark:bg-dark-primary">{children}</main>
    </>
  );
}
