// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightAutoSidebar from "starlight-auto-sidebar";
import starlightFullViewMode from "starlight-fullview-mode";

// https://astro.build/config
export default defineConfig({
  site: "https://www.bettercap.org",
  integrations: [
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
            src: "https://evilsocket.net/a.js",
          },
        },
        {
          tag: "script",
          attrs: {
            type: "text/javascript",
          },
          content: "A['\\u0069\\u006E\\u0069\\u0074']({ '\\u0061\\u0063\\u0074\\u0069\\u006F\\u006E': 'none', 'statsEndpoint': '\\u0068\\u0074\\u0074\\u0070\\u0073\\u003A\\u002F\\u002F\\u006E\\u006F\\u0062\\u006F\\u0074\\u002D\\u0073\\u0074\\u0061\\u0074\\u0073\\u002E\\u0065\\u0076\\u0069\\u006C\\u0073\\u006F\\u0063\\u006B\\u0065\\u0074\\u002E\\u0077\\u006F\\u0072\\u006B\\u0065\\u0072\\u0073\\u002E\\u0064\\u0065\\u0076\\u002F\\u006C\\u006F\\u0067' });",
        },
      ],
    }),
  ],
});
