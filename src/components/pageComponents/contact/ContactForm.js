"use client";

import { useState } from "react";
import clsx from "clsx";
import StyledButton from "@/components/commonComponents/StyledButton";

const INITIAL = {
  name: "",
  email: "",
  company: "",
  phone: "",
  topic: "general",
  message: "",
};

export default function ContactForm({ form, embedded = false }) {
  const [fields, setFields] = useState(INITIAL);

  const update = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...fields, submittedAt: new Date().toISOString() };
    console.log("Contact form submission:", payload);
  };

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className={clsx(
        embedded
          ? "space-y-6"
          : "card card-body space-y-5",
      )}
      noValidate
    >
      {!embedded ? (
        <div>
          <h2>{form.title}</h2>
          <p className="prose-muted-sm mt-2">{form.subtitle}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="form-label" htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            className="form-field"
          />
        </div>
        <div className="space-y-2">
          <label className="form-label" htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            className="form-field"
          />
        </div>
        <div className="space-y-2">
          <label className="form-label" htmlFor="contact-company">
            Company / kitchen
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            value={fields.company}
            onChange={(e) => update("company", e.target.value)}
            className="form-field"
          />
        </div>
        <div className="space-y-2">
          <label className="form-label" htmlFor="contact-phone">
            Phone <span className="text-muted">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="form-field"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="form-label" htmlFor="contact-topic">Topic</label>
        <select
          id="contact-topic"
          name="topic"
          required
          value={fields.topic}
          onChange={(e) => update("topic", e.target.value)}
          className="form-field-select"
        >
          {form.topics.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="form-label" htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          className="form-field min-h-[8rem] resize-y"
        />
      </div>

      <StyledButton type="submit" size="md" className="w-full sm:w-auto">
        {form.submitLabel}
      </StyledButton>
    </form>
  );
}
