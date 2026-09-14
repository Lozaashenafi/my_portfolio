export default function AuthLayout({ children }) {
  return (
    <div className=" bg-white dark:bg-dark-primary flex items-center justify-center ">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
