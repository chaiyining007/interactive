let _clientW,
_clientH,
_fontsize,
self = this;
let u = navigator.userAgent;

_clientW = document.documentElement.clientWidth;
_clientH = document.documentElement.clientHeight;
if (_clientW > 750) {
_clientW = 750;
} else if (_clientW < 320) {
_clientW = 320;
}
_fontsize = parseInt(_clientW / 7.5) + "px";
document.documentElement.style.fontSize = _fontsize;
document.documentElement.style.minHeight = `${_clientH}px`;