module.exports = (obj, ...fields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) return (newObj[el] = obj[el]);
  });
  return newObj;
};
