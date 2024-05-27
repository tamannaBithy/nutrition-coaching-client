// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

import NotFound from "@/components/Common/NotFound";

export const metadata = {
  title: "Page not found",
  description: "404 Page not found",
};

export default function NotFoundPage() {
  return <NotFound />;
}
