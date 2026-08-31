import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Mail,
  Package,
  Phone,
  MapPin,
} from "lucide-react";
import Eyebrow from "@/components/commonComponents/Eyebrow";
import StyledButton from "@/components/commonComponents/StyledButton";
import MotionSection, {
  MotionItem,
} from "@/components/commonComponents/MotionSection";
import AudienceChips from "@/components/pageComponents/home/AudienceChips";
import ContactForm from "@/components/pageComponents/contact/ContactForm";
import site from "@/data/site.json";

const CHANNEL_ICONS = {
  mail: Mail,
  phone: Phone,
  map: MapPin,
  building: Building2,
  package: Package,
};

function ContactChannelRow({ channel }) {
  const Icon = CHANNEL_ICONS[channel.icon] ?? Mail;
  const row = (
    <div className="flex items-start gap-3 py-4">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-brand"
        aria-hidden
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-muted">
          {channel.label}
        </p>
        <p className="mt-1 text-sm font-medium text-zinc-900">
          {channel.value}
        </p>
        {channel.hint ? (
          <p className="mt-0.5 text-xs text-muted">{channel.hint}</p>
        ) : null}
      </div>
    </div>
  );

  if (!channel.href) return row;

  const isExternal =
    channel.href.startsWith("http") || channel.href.startsWith("mailto");

  const wrapperClass =
    "block -mx-2 rounded-lg px-2 transition hover:bg-surface-stone/50";

  if (isExternal) {
    return (
      <a href={channel.href} className={wrapperClass}>
        {row}
      </a>
    );
  }

  return (
    <Link href={channel.href} className={wrapperClass}>
      {row}
    </Link>
  );
}

export default function ContactScreen() {
  const { contactPage, focus } = site;

  return (
    <>
      <section></section>
      <section className="relative overflow-hidden">
        {/* Split background: white hero band + stone body */}
        <div className="section-container relative z-10 py-10 md:py-12 lg:py-14">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-8">
            <div className="max-w-xl lg:col-start-1 lg:row-start-1">
              <Eyebrow>{contactPage.hero.eyebrow}</Eyebrow>
              <h1 className="mt-3 text-balance">
                Connect with{" "}
                <span className="gradient-text">Al-Khalis Prime</span>
              </h1>
              <p className="prose-muted text-base mt-4">
                {contactPage.hero.subtitle}
              </p>
              {/* <p className="mt-3 text-sm leading-relaxed text-muted">
                {contactPage.intro}
              </p> */}
            </div>

            {/* Floating form: spans intro + reach-us rows on desktop */}
            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-stretch">
              <div
                id="contact-form-panel"
                className="rounded-3xl border border-border/80 bg-white p-6 shadow-2xl shadow-zinc-900/[0.08] ring-1 ring-black/[0.04] sm:p-8 lg:sticky lg:top-24 lg:-translate-y-3"
              >
                <div className="mb-6 border-b border-border/60 pb-6">
                  <h2 className="text-xl sm:text-2xl">
                    {contactPage.form.title}
                  </h2>
                  <p className="prose-muted-sm mt-2">
                    {contactPage.form.subtitle}
                  </p>
                </div>
                <ContactForm form={contactPage.form} embedded />
              </div>
            </div>

            <div className="lg:col-start-1 lg:row-start-2">
              <h2 className="text-lg">Reach us directly</h2>
              <p className="prose-muted-sm mt-2">
                Business enquiries for bulk spice supply and catalog questions.
              </p>
              <div className="mt-5 divide-y divide-border/60">
                {contactPage.channels.map((channel) => (
                  <ContactChannelRow key={channel.id} channel={channel} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-10">
            <div className="rounded-3xl border border-border bg-stone-900 p-6 text-center shadow-sm sm:p-8">
              <h2 className="text-lg sm:text-xl text-white">
                {contactPage.ordering.title}
              </h2>
              <div className="prose-muted mx-auto mt-4 space-y-1 text-white text-sm">
                {contactPage.ordering.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <StyledButton
                href="/products"
                variant="secondary"
                size="md"
                className="mt-6 w-full sm:w-auto"
              >
                Browse product catalog
                <ArrowRight className="h-4 w-4" aria-hidden />
              </StyledButton>
            </div>
          </div>
        </div>
      </section>

      <MotionSection
        tone="light"
        containerClassName="max-w-4xl mx-auto text-center !py-10 md:!py-12"
      >
        <MotionItem>
          <Eyebrow variant="muted" align="center">
            {contactPage.audiences.title}
          </Eyebrow>
          <p className="prose-muted mx-auto mt-3 max-w-2xl">
            {contactPage.audiences.body}
          </p>
        </MotionItem>
        <AudienceChips audiences={focus.audiences} />
      </MotionSection>
    </>
  );
}
