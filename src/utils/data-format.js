import { formatDollar } from "@/utils/format-dollar";
import {
  convertTimestamp,
  msToHMS
} from "@/views/timetracker/utils/timestamp-converter";

export const DataFormat = (data, header) => {
  if (header.class) {
    switch (header.class) {
      case "timestamp":
        return convertTimestamp(data.seconds);
        break;
      case "duration":
        return msToHMS(data);
        break;
      case "dollar":
        return formatDollar(data);
        break;

      default:
        break;
    }
  } else {
    return data;
  }
};
