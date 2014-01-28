module.exports = function (ms) {
  ms = Number(ms);
  if(!/^\d+$/.test(ms)) ms = ms*1000;
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  //return { d: d, h: h, m: m, s: s };
  s = s > 9 ? s : '0'+s;
  return m+':'+s;
};
