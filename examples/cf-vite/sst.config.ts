/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "cf-vite",
      removalPolicy: input?.stage === "production" ? "retain" : "remove",
      providers: {
        cloudflare: {
          accountId: "24beb0945bae6b37c2b147db108c6ec8",
        },
      },
    };
  },
  async run() {
    new sst.cloudflare.StaticSite("Web", {
      build: {
        command: "bun run build",
        output: "dist",
      },
      domain: {
        hostname: "vite.sstion.com",
        zoneId: "415e6f4652b6d95b775d350f32119abb",
      },
    });
  },
});
