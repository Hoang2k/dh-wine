import ContactForm from "@/components/Contact/ContactForm";
import ContactInfo from "@/components/Contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="container mx-auto px-4 lg:px-30 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form (Client Component) */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>

          {/* Contact info (Server Component tĩnh) */}
          <div className="lg:col-span-4">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
