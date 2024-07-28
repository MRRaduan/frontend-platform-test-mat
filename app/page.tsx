import { Suspense } from "react";
import Library from "../components/Library";

export default function Home() {
  return (
    <>
      <Suspense key="1" fallback="loadding">
        <Library />
      </Suspense>
    </>
  );
}
