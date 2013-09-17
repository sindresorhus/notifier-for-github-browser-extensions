/*globals chrome:true, gitHubNotifCount:true */
(function () {
	'use strict';

	function render(badge, color, title, icon) {
        if(badge){
            chrome.browserAction.setBadgeText({
                text: badge
            });
        }


        if(color){
            chrome.browserAction.setBadgeBackgroundColor({
                color: color
            });
        }


        if(title){
            chrome.browserAction.setTitle({
                title: title
            });
        }


        if(icon){
            chrome.browserAction.setIcon({
                path: icon
            });
        }

	}

	function update() {
		gitHubNotifCount(function (count) {
			if (count !== false) {
				if(count>9999){
					count = '∞'
				}
				render(count, [65, 131, 196, 255], 'GitHub Notifier','icon-19.png');
			} else {
                render(null,null,'You have to be connected to the internet and logged into GitHub', 'icon-19-disabled.png');
			}
		});
	}

	chrome.alarms.create({periodInMinutes: 1});
	chrome.alarms.onAlarm.addListener(update);

	chrome.browserAction.onClicked.addListener(function () {
		chrome.tabs.create({
			url: 'https://github.com/notifications'
		});
	});

	update();
})();
