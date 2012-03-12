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

	window.gitHubNotifCount = function( callback ) {
		var NOTIFICATIONS_URL = 'https://github.com/inbox/notifications';
		var tmp = document.createElement('div');
		xhr( 'GET', NOTIFICATIONS_URL, function( data ) {
			tmp.innerHTML = data;
			var notifElem = tmp.querySelector('#notifications');
			if ( notifElem ) {
				var countElem = notifElem.querySelector('.unread_count');
				var count = countElem ? countElem.textContent : '';
				callback( count );
			} else {
				callback( false );
			}
		});
	};

})();