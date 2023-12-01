import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import path from 'path';


const config: UserConfig = {
	plugins: [
		sveltekit()
	],
	// resolve: {
	// 	alias: {
	// 		$content: path.resolve(__dirname, './src/content'),
	// 	}
	// },
	// assetsInclude: [
	// 	'src/content/**/*',
	// ]
};

export default config;
