import Header from "../../components/layout/Header";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* If you have a Footer, put it here too */}
    </>
  );
}
