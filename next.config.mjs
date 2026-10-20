import createWithVercelToolbar from "@vercel/toolbar/plugins/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

const withVercelToolbar = createWithVercelToolbar();

export default withVercelToolbar(nextConfig);
