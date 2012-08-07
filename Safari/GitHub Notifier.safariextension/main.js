/*globals safari, gitHubNotifCount */
(function() {
	'use strict';

	function render( badgeText, title ) {
		var icon = safari.extension.toolbarItems[0];
		icon.badge = badgeText;
		icon.toolTip = title;
		icon.disabled = badgeText === false;
	}

	function update() {
		gitHubNotifCount(function( count ) {
			if ( count !== false ) {
				render( count, 'GitHub Notifier' );
			} else {
				render( false, 'You have to be connected to the internet and logged into GitHub' );
			}
		});
	}

	var UPDATE_INTERVAL = 1000 * 60;

	safari.application.addEventListener('command', function( e ) {
		if  ( e.command === 'open-notifications' ) {
			var win = safari.application.activeBrowserWindow;
			var url = 'https://github.com/notifications';
			if ( win.activeTab.url ) {
				win.openTab().url = url;
			} else {
				win.activeTab.url = url;
			}
		}
	});

	setInterval( update, UPDATE_INTERVAL );

	update();

})();
