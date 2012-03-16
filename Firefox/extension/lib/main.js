const widgets = require('widget');
const tabs = require('tabs');
const data = require('self').data;
const Request = require('request').Request;
const pageWorker = require('page-worker');
const timers = require('timers');

const notifUrl = 'https://github.com/inbox/notifications';
const updateInterval = 1000 * 60;


var widget = widgets.Widget({
	id: 'github-notifier',
	label: 'GitHub Notifier',
	width: 40,
	contentURL: data.url('icon.html'),
	contentScriptFile: data.url('icon.js'),
	onClick: function() {
		const tab = tabs.activeTab;
		if ( tab.url === 'about:blank' || tab.url === notifUrl ) {
			tab.url = notifUrl;
		} else {
			tabs.open( notifUrl );
		}
	}
});

var update = function() {
	Request({
		url: notifUrl,
		onComplete: function( response ) {
			widget.port.emit( 'parse', response.text );
		}
	}).get();
}

var init = function() {
	timers.setInterval( update, updateInterval );
	update();
};

init();