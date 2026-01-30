export default function AuthLayout({ children }) {
  return (
    <div className=" bg-light flex items-center justify-center ">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
