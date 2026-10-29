/**
 * Nitro gulp config
 */

const config = {
	gulp: {
		dumpViews: {
			// filter corrupt, incomplete or irrelevant views
			// example:
			// viewFilter: (url) => url !== 'incomplete',
		},
		copyAssets: [
			// copies all source files to dest folder
			{
				src: 'src/shared/assets/img/projects/**/*',
				dest: 'public/assets/img/projects',
			},
		],
		minifyImages: [
			// copies and minifies all source images to dest folder; project images are
			// large and already copied by copyAssets, and optipng -o7 takes minutes on them
			{
				src: ['src/shared/assets/img/**/*', '!src/shared/assets/img/projects/**'],
				dest: 'public/assets/img',
			},
		],
		svgSprites: [
			// generates icon sprite with the name of the last folder in src
			{
				src: 'src/patterns/atoms/icon/img/icons/*.svg',
				dest: 'public/assets/svg',
			},
		],
	},
};

module.exports = config.gulp;
