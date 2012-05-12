'use strict';

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
	width: 11 + 16 + 1, // sadface + icon + 1px needed for unknown reason
	contentURL: data.url('icon.html'),
	contentScriptFile: data.url('icon.js'),
	onClick: function() {
		const tab = tabs.activeTab;
		if ( tab.url === 'about:blank' || tab.url === notifUrl ) {
			tab.url = notifUrl;
		} else {
			tabs.open( notifUrl );
		}
		timers.setTimeout( update, 1000 * 20 );
		update();
	}
});

widget.port.on('update-widget-width', function( badgeWidth ) {
	const iconWidth = 16;
	widget.width = badgeWidth + iconWidth + 1;
});

widget.port.on('success', function( status ) {
	const errorMsg = 'You have to be logged into GitHub';
	widget.tooltip = status ? '' : errorMsg;
});

var update = function() {
	Request({
		url: notifUrl,
		onComplete: function( response ) {
			widget.port.emit( 'render', response.text );
		}
		// TODO: Need to add a check if the computer is connected to the internet.
		// Waiting on a `onError` method.
	}).get();
}

var init = function() {
	timers.setInterval( update, updateInterval );
	update();
};

init();