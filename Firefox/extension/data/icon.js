const badge = document.getElementById('badge');

self.port.on('parse', function( data ) {
	var tmp = document.createElement('div');
	tmp.innerHTML = unescape( data );
	var notifElem = tmp.querySelector('#notifications');
	if ( notifElem ) {
		var countElem = notifElem.querySelector('.unread_count');
		if ( countElem ) {
			badge.style.display = 'block';
			badge.textContent = countElem.textContent;
			badge.classList.remove('error');
		} else {
			badge.style.display = 'none';
		}
	} else {
		badge.style.display = 'block';
		badge.textContent = ':(';
		badge.classList.add('error');
	}
});