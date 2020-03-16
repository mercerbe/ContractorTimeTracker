import {
  format,
  parse,
  startOfMonth as startOfMonthFNS,
  endOfMonth as endOfMonthFNS,
  startOfISOWeek as startOfISOWeekFNS,
  endOfISOWeek as endOfISOWeekFNS
} from "date-fns";

/**
 * @desc returns formatted string from date/string
 * @param 'date - String | Date'
 * @param 'dateFormat - format that output string will be returned'
 * @return string | void
 */

export const convertTimestamp = function(timestamp) {
  var d = new Date(timestamp * 1000);
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ampm = hours >= 12 ? " pm" : " am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  let timeStampCon =
    d.getMonth() +
    1 +
    "/" +
    d.getDate() +
    "/" +
    d.getFullYear() +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    ampm;

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
  return `${hours.toFixed(0)} h, ${minutes.toFixed(0)} min, ${seconds.toFixed(
    0
  )} sec`;
};

export const formatDate = (date, dateFormat) => {
  if (date === null || date === undefined) {
    // console.warn(
    //   `formatDate function accepts string, empty string or date, you provided ${date}`,
    // )
    return "-";
  }

  let dateObject = date === "" ? new Date() : new Date(date);
  return format(dateObject, dateFormat);
};

/**
 * Takes a datetime string and converts it into a string with another format
 *
 * @param dateString - date string
 * @param currentFormat - input datetime format
 * @param finalFormat - output datetime format
 * @returns string
 */
export const parseAndFormatDate = (dateString, currentFormat, finalFormat) => {
  let dateObject = parse(dateString, currentFormat, new Date());

  return format(dateObject, finalFormat);
};

export const parseDate = (dateString, format) => {
  return parse(dateString, format, new Date());
};
