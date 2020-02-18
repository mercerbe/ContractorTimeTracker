export const convertTimestamp = function(timestamp) {
  var d = new Date(timestamp * 1000);
  let timeStampCon =
    d.getMonth() +
    1 +
    "/" +
    d.getDate() +
    "/" +
    d.getFullYear() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes();

  return timeStampCon;
};

export const msToHMS = function(ms) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;
  // 2- Extract hours:
  var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};
