const getType = (data) =>
  Object.prototype.toString.call(data).slice(8, -1);
