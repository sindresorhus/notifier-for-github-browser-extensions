/*globals chrome:true*/
(function() {
	'use strict';

	var xhr = function() {
		var xhr = new XMLHttpRequest();
		return function( method, url, callback ) {
			xhr.onreadystatechange = function() {
				if ( xhr.readyState === 4 ) {
					callback( xhr.responseText );
				}
			};
			xhr.open( method, url );
			xhr.send();
		};
	}();

	var App = {
		init: function() {
			this.NOTIFICATIONS_URL = 'https://github.com/inbox/notifications';
			this.CHECK_INTERVAL = 1000 * 60;
			this.bind();
			this.update();
		},
		bind: function() {
			setInterval( this.update, this.CHECK_INTERVAL );
			chrome.browserAction.onClicked.addListener(function() {
				window.open( App.NOTIFICATIONS_URL );
			});
		},
		update: function() {
			xhr( 'GET', App.NOTIFICATIONS_URL, function( data ) {
				var elem = document.createElement('div');
				elem.innerHTML = data;
				var notifElem = elem.querySelector('#notifications');
				if ( notifElem ) {
					var countElem = notifElem.querySelector('.unread_count');
					var badge = countElem ? countElem.textContent : '';
					App.render( badge, [203, 108, 0, 255], '' );
				} else {
					App.render( ':(', [132, 33, 33, 1, 255], 'You have to be logged into GitHub' );
				}
			});
		},
		render: function( badge, color, title ) {
			chrome.browserAction.setBadgeText({
				text: badge
			});
			chrome.browserAction.setBadgeBackgroundColor({
				color: color
			});
			chrome.browserAction.setTitle({
				title: title
			});
		}
	};

	App.init();

})();