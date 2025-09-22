declare module "astro:actions" {
	type Actions = typeof import("/Users/photon/Library/Mobile Documents/com~apple~CloudDocs/INDEX/Current/Work/Sinthome/website/sinthome_website/src/actions/index.ts")["server"];

	export const actions: Actions;
}