'use strict';

self.port.on('render', function( data ) {
	let countElem;
	let tmp = document.createElement('div');

	tmp.innerHTML = unescape( data );
	countElem = tmp.querySelector('a[href="/notifications"] .count');

	self.port.emit( 'fetched-count', countElem && countElem.textContent );
});
