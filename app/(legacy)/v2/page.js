import LegacyPage from "@/components/LegacyPage";

export const metadata = { alternates: { canonical: "/v2" } };

export default function V2() {
  return <LegacyPage version="v2" />;
}
