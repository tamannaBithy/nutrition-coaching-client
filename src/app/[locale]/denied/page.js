import Denied from "@/components/Common/Denied";

export const metadata = {
  title: "Access Denied",
  description: "You do not have the required access level to view this page",
};

export default function page() {
  return <Denied />;
}
