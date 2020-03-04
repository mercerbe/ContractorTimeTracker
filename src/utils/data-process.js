export const ProcessData = (data, headers) => {
  let normalData = [];

  data.map(item => {
    let tmpObjData = {};
    headers.map(head => {
      tmpObjData = {
        ...tmpObjData,
        [head.value]: item[head.value]
      };
    });
    normalData.push(tmpObjData);
  });
  return normalData;
};
