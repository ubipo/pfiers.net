import preprocess from 'svelte-preprocess';
import importAssets from 'svelte-preprocess-import-assets'
import adapter from '@sveltejs/adapter-static';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		importAssets,
		typescript: { },
		scss: {
			prependData: '@use "sass:color";\n@import "src/styles/style.scss";'
		},
	}),

	kit: {
		adapter: adapter()
	},

	vitePlugin: {
		experimental: {
			uesVitePreprocess: true,
		}
	},
};

export default config;
