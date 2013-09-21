(function () {
	'use strict';

	var xhr = function () {
		var xhr = new XMLHttpRequest();
		return function(method, url, callback) {
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					callback(xhr.responseText);
				}
			};
			xhr.open(method, url);
			xhr.send();
		};
	}();

	window.GitHubNotify = {
		settings: {
			defaults: {
				'notification_url': 'http://github.com/notifications'
			},
			get: function (name) {
				return window.localStorage.getItem(name) ? window.localStorage.getItem(name) : this.defaults[name];
			},
			set: function (name, value) {
				return window.localStorage.setItem(name, value);
			},
			reset: function () {
				return this.revert('notification_url');
			},
			revert: function (name) {
				return window.localStorage.removeItem(name);
			},
			restore: {
				text: function (element, name) {
					return element.value = GitHubNotify.settings.get(name);
				}
			}
		}
	};

	window.gitHubNotifCount = function (callback) {
		var NOTIFICATIONS_URL = GitHubNotify.settings.get('notification_url')
		var tmp = document.createElement('div');

		xhr('GET', NOTIFICATIONS_URL, function (data) {
			var countElem;
			tmp.innerHTML = data;
			countElem = tmp.querySelector('a[href="/notifications"] .count');

			if (countElem) {
				callback(countElem.textContent !== '0' ? countElem.textContent : '');
			} else {
				callback(false);
			}
		});
	};
})();
