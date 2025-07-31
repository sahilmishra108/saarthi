import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <Suspense fallback={<BarLoader className="mt-4 w-full" color="gray" />}>
      {children}
    </Suspense>
  );
}
