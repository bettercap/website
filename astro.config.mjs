// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
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
			],
		}),
	],
});
