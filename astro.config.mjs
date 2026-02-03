// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightAutoSidebar from "starlight-auto-sidebar";
import starlightFullViewMode from "starlight-fullview-mode";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.bettercap.org",
  integrations: [
    sitemap(),
    starlight({
      title: "bettercap",
      editLink: {
        baseUrl: "https://github.com/bettercap/website/edit/master/",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/bettercap/bettercap",
        },
        {
          icon: "rss",
          label: "Blog",
          href: "https://www.evilsocket.net/tags/bettercap/",
        },
      ],
      sidebar: [
        {
          label: "Project",
          autogenerate: { directory: "project" },
        },
        {
          label: "Usage",
          autogenerate: { directory: "usage" },
        },
        {
          label: "Modules",
          autogenerate: { directory: "modules" },
        },
      ],
      favicon: "/favicon.png",
      plugins: [starlightAutoSidebar(), starlightFullViewMode()],
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://platform.twitter.com/widgets.js",
            async: true,
          },
        },
        {
          tag: "script",
          attrs: {
            type: "application/ld+json",
          },
          content: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "BetterCAP",
            "description": "The Swiss Army knife for WiFi, Bluetooth Low Energy, wireless HID hijacking, CAN-bus and IPv4/IPv6 network reconnaissance and MITM attacks.",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Linux, macOS, Windows, Android",
            "url": "https://www.bettercap.org",
            "downloadUrl": "https://github.com/bettercap/bettercap/releases",
            "softwareVersion": "2.x",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Person",
              "name": "Simone Margaritelli",
              "url": "https://www.evilsocket.net",
              "sameAs": [
                "https://github.com/evilsocket",
                "https://twitter.com/evilsocket"
              ]
            },
            "codeRepository": "https://github.com/bettercap/bettercap",
            "programmingLanguage": "Go"
          }),
        },
      ],
    }),
  ],
});
