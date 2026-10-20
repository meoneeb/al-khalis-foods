import { flag } from "flags/next";
import { vercelAdapter } from "@flags-sdk/vercel";

export const homepageDown = flag({
  key: "homepage-down",
  description:
    "Show the payment downtime notice on the homepage instead of the live homepage.",
  defaultValue: false,
  options: [
    { value: false, label: "Live homepage" },
    { value: true, label: "Down page" },
  ],
  adapter: vercelAdapter,
});
