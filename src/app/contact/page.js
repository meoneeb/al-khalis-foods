import ContactScreen from "@/components/pageComponents/contact/contactScreen";
import site from "@/data/site.json";

export const metadata = {
  title: `Contact | ${site.brand.displayName}`,
  description:
    "Contact AL-KHALIS PRIME for bulk spice catalog enquiries, distributor information, and commercial kitchen supply across Pakistan.",
};

export default function Page() {
  return <ContactScreen />;
}
