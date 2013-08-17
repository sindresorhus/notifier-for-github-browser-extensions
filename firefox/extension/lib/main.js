'use strict';

const tabs = require('tabs');
const data = require('self').data;
const Request = require('request').Request;
const pageWorker = require('page-worker');
const timers = require('timers');
const toolbarButton = require('toolbarbutton/toolbarbutton').ToolbarButton;

const notifUrl = 'https://github.com/notifications';
const updateInterval = 1000 * 60;


function update() {
	Request({
		url: notifUrl,
		onComplete: function( response ) {
			worker.port.emit( 'render', response.text );
		}
		// Need to add a check if the computer is connected to the internet.
		// Waiting on a `onError` method.
	}).get();
};

let worker = pageWorker.Page({
	contentScriptFile: data.url('icon.js')
});

let tbb = toolbarButton({
	id: 'github-notifier',
	label: 'GitHub Notifier',
	tooltiptext: this.label,
	image: data.url('icon-16.png'),
	onCommand: function () {
		const tab = tabs.activeTab;

		if ( tab.url === 'about:blank' || tab.url === 'about:newtab' || tab.url === notifUrl ) {
			tab.url = notifUrl;
		} else {
			tabs.open( notifUrl );
		}

		timers.setTimeout( update, 1000 * 20 );
		update();
	}
});

tbb.moveTo({
	toolbarID: 'nav-bar',
	forceMove: false // only move from palette
});

worker.port.on('fetched-count', function( count ) {
	count = count > 999 ? '∞' : count;

	if ( count ) {
		tbb.tooltiptext = 'GitHub Notifier';
		if ( count !== '0' ) {
			tbb.badge = {
				text: count,
				color: 'rgb(65, 131, 196)'
			}
		} else {
			tbb.badge = null;
		}
	} else {
		tbb.tooltiptext = 'You have to be logged into GitHub';
		tbb.badge = {
			text: ':(',
			color: 'rgb(166, 41, 41)'
		}
	}
});

timers.setInterval( update, updateInterval );
update();
