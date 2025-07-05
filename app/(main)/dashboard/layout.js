import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title leading-tight">
          Industry Insights
        </h1>
      </div>
      <Suspense fallback={<BarLoader className="mt-4 w-full" color="gray" />}>
        {children}
      </Suspense>
    </div>
  );
}
