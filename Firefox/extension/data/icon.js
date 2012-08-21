'use strict';

const badge = document.getElementById('badge');


self.port.on('render', function( data ) {
	var countElem;
	var tmp = document.createElement('div');

	tmp.innerHTML = unescape( data );
	countElem = tmp.querySelector('a[href="/notifications"] .count');

	if ( countElem ) {
		if ( countElem.textContent !== '0' ) {
			badge.style.display = 'block';
			badge.textContent = countElem.textContent;
			badge.classList.remove('error');
		} else {
			badge.style.display = 'none';
		}
		self.port.emit( 'success', true );
	} else {
		badge.style.display = 'block';
		badge.textContent = ':(';
		badge.classList.add('error');
		self.port.emit( 'success', false );
	}
	self.port.emit( 'update-widget-width', badge.scrollWidth );
});
