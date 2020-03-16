import { DataFormat } from "@/utils/data-format";
export const ProcessData = (data, headers) => {
  let normalData = [];

  data.map(item => {
    let tmpObjData = {};
    let formatObjData = {};
    headers.map(head => {
      tmpObjData = {
        ...tmpObjData,
        [head.value]: DataFormat(item[head.value], head)
      };
    });
    normalData.push(tmpObjData);
  });
  return normalData;
};
