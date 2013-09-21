document.addEventListener('DOMContentLoaded', function () {
	var form_notification_url = document.getElementById('notification_url');

	GitHubNotify.settings.restore.text(form_notification_url, 'notification_url');

	document.getElementById('save').addEventListener('click', function () {
		GitHubNotify.settings.set('notification_url', form_notification_url.value);
	});

	document.getElementById('reset').addEventListener('click', function () {
		GitHubNotify.settings.reset();
		GitHubNotify.settings.restore.text(form_notification_url, 'notification_url');
	});
});