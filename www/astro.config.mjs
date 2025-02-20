import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import config from "./config";
import sst from "astro-sst";

const sidebar = [
  {
    label: "What is Ion",
    link: "/docs/",
  },
  {
    label: "Get Started",
    items: [
      { label: "Next.js", link: "/docs/start/nextjs/" },
      //      { label: "Remix", link: "/docs/start/remix/" },
      //      { label: "Astro", link: "/docs/start/astro/" },
      //      { label: "API", link: "/docs/start/api/" },
    ],
  },
  {
    label: "Concepts",
    items: [
      { label: "Live", link: "/docs/live/" },
      { label: "Linking", link: "/docs/linking/" },
      { label: "Console", link: "/docs/console/" },
      { label: "Components", link: "/docs/components/" },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Cron", link: "/docs/component/aws/cron/" },
      { label: "Astro", link: "/docs/component/aws/astro/" },
      { label: "Remix", link: "/docs/component/aws/remix/" },
      { label: "Nextjs", link: "/docs/component/aws/nextjs/" },
      { label: "Queue", link: "/docs/component/aws/queue/" },
      { label: "Vector", link: "/docs/component/aws/vector/" },
      { label: "Secret", link: "/docs/component/secret/" },
      { label: "Worker", link: "/docs/component/cloudflare/worker/" },
      { label: "Bucket", link: "/docs/component/aws/bucket/" },
      { label: "Router", link: "/docs/component/aws/router/" },
      { label: "Dynamo", link: "/docs/component/aws/dynamo/" },
      { label: "SnsTopic", link: "/docs/component/aws/sns-topic/" },
      { label: "Function", link: "/docs/component/aws/function/" },
      { label: "Postgres", link: "/docs/component/aws/postgres/" },
      { label: "StaticSite", link: "/docs/component/aws/static-site/" },
      {
        label: "ApiGatewayV2",
        link: "/docs/component/aws/apigatewayv2/",
      },
    ],
  },
  {
    label: "Reference",
    items: [
      { label: "CLI", link: "/docs/reference/cli/" },
      { label: "Client", link: "/docs/reference/client/" },
      { label: "Global", link: "/docs/reference/global/" },
      { label: "Config", link: "/docs/reference/config/" },
    ],
  },
  //  {
  //    label: "How to",
  //    items: [
  //      { label: "Migrate from SST", link: "/docs/migrate-from-sst/" },
  //      { label: "Import Resources", link: "/docs/import-resources/" },
  //      { label: "Create an AWS Account", link: "/docs/create-an-aws-account/" },
  //    ],
  //  },
];

if (import.meta.env.DEV) {
  sidebar.push({
    label: "Dummy",
    items: [
      { label: "TS Doc", link: "/dummy/tsdoc/" },
      { label: "Markdown", link: "/dummy/markdown/" },
    ],
  });
}

// https://astro.build/config
export default defineConfig({
  site: "https://ion.sst.dev",
  adapter: sst(),
  server: {
    host: "0.0.0.0",
  },
  redirects: {
    "/install": "https://raw.githubusercontent.com/sst/ion/dev/install",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/dummy/"),
    }),
    starlight({
      title: "Ion",
      logo: {
        light: "./src/assets/logo-light.svg",
        dark: "./src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      favicon: "/favicon.svg",
      pagination: false,
      customCss: [
        "@fontsource-variable/rubik",
        "@fontsource-variable/roboto-mono",
        "@fontsource/ibm-plex-mono/400.css",
        "@fontsource/ibm-plex-mono/400-italic.css",
        "@fontsource/ibm-plex-mono/500.css",
        "@fontsource/ibm-plex-mono/600.css",
        "@fontsource/ibm-plex-mono/700.css",
        "./src/custom.css",
        "./src/styles/markdown.css",
        "./src/styles/tsdoc.css",
      ],
      social: {
        "x.com": config.twitter,
        discord: config.discord,
        github: config.github,
      },
      editLink: {
        baseUrl: "https://github.com/sst/ion/edit/dev/www",
      },
      components: {
        Hero: "./src/components/Hero.astro",
        Head: "./src/components/Head.astro",
        Header: "./src/components/Header.astro",
        Footer: "./src/components/Footer.astro",
        PageTitle: "./src/components/PageTitle.astro",
        MobileMenuFooter: "./src/components/MobileMenuFooter.astro",
      },
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://widget.kapa.ai/kapa-widget.bundle.js",
            "data-website-id": "31ffb9c3-2af4-4b7e-a1ee-060c71c60a89",
            "data-project-name": "Ion",
            "data-project-color": "#E27152",
            "data-modal-header-bg-color": "white",
            "data-button-hide": "true",
            "data-modal-title": "Ask AI",
            "data-font-family": "var(--__sl-font)",
            "data-modal-title-font-family": "var(--__sl-font-headings)",
            "data-modal-border-radius": "0.625rem",
            "data-modal-example-questions":
              "How do I deploy a Next.js app?,How do I set a secret in Ion?,How do I set my AWS credentials?,How do I set a custom domain?",
            "data-modal-override-open-class": "kapa-modal-open",
            "data-project-logo": "/logo-square.png",
            async: true,
          },
        },
        // Add ICO favicon fallback for Safari
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.ico",
            sizes: "32x32",
          },
        },
        // Add light/dark mode favicon
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.svg",
            media: "(prefers-color-scheme: light)",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon-dark.svg",
            media: "(prefers-color-scheme: dark)",
          },
        },
      ],
      sidebar,
    }),
  ],
});
