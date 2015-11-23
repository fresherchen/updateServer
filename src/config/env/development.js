'use strict';

module.exports = {
	db: {
		// uri: 'mongodb://{{NOTES_DBHOST}}/{{NOTES_DBNAME}}',
		uri: 'mongodb://n01.lxpt.cn:41204/cap-dev',
		options: {
			// user: '{{NOTES_DBUSER}}',
			// pass: '{{NOTES_DBPASS}}'
			user: '',
			pass: ''
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
