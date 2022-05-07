const CountHour = (valEnd, valstart) => {
  return minsToStr(strToMins(valEnd) - strToMins(valstart));
};

function strToMins(t) {
  var s = t.split(':');
  return Number(s[0]) * 60 + Number(s[1]);
}

function minsToStr(t) {
  return Math.trunc(t / 60) + ':' + ('00' + (t % 60)).slice(-2);
}

export default CountHour;
