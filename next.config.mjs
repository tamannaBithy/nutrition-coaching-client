import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    domains: ["localhost"], // Changed to domains and specified the domain
  },
  publicRuntimeConfig: {
    basePath: "",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withPWA({ dest: "public" })(nextConfig));
