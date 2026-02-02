// app/blog/layout.tsx
import Link from "next/link";
import BlogHeader from "../../components/layout/BlogHeader";
import Footer from "../../components/layout/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50 dark:bg-black min-h-screen">
      <BlogHeader />
      {children}
      <Footer />
    </div>
  );
}
