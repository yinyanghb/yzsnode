var log4js = require("log4js");
var appConfig = require('../config/app-config');

log4js.configure({
	appenders: [{　　　
		type: 'console'
	}, {
		type: 'dateFile',
		filename: appConfig.logPath || 'logs/',
		pattern: "yyyy-MM-dd.log",
		maxLogSize: 1024,
		alwaysIncludePattern: true
    }],
	replaceConsole: true
});

log4js.setGlobalLogLevel(appConfig.logLevel || log4js.levels.INFO);

exports.getLogger = function(file){
	return log4js.getLogger(file || "log");
};
