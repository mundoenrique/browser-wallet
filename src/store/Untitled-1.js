const myFn = (value, obj) => {
  console.log(value);
  obj && console.log(obj);
};

myFn('vale', { key: 'value' });
