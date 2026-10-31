/**
 * Nitro Exporter Config
 *
 * Exports the static site to export/ for Firebase Hosting (see firebase.json).
 * Asset paths stay absolute (/assets/...) and links stay clean (/about); Firebase
 * serves about.html for /about through cleanUrls.
 */

const config = {
	exporter: [
		{
			dest: 'export',
			i18n: [],
			publics: ['public/*', 'public/assets/**/*'],
			renames: [],
			replacements: [],
			views: true,
			additionalRoutes: [],
			minifyHtml: true,
			zip: false,
		},
	],
};

module.exports = config.exporter;
