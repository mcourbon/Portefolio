import LegacyPage from "@/components/LegacyPage";

export const metadata = { alternates: { canonical: "/v1" } };

export default function V1() {
  return <LegacyPage version="v1" />;
}
