document.addEventListener('DOMContentLoaded', function () {
	var form_notification_url = document.getElementById('notification_url');

	function loadSettings(){
		form_notification_url.value = GithubNotify.settings.get('notification_url');
	}

	loadSettings();

	document.getElementById('save').addEventListener('click', function () {
		GitHubNotify.settings.set('notification_url', form_notification_url.value);
	});

	document.getElementById('reset').addEventListener('click', function () {
		GitHubNotify.settings.reset();
		loadSettings();
	});
});