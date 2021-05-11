// 创建了一个全新的对象；
// 会被执行 [[Prototype]]（也就是 __proto__ ）链接；
// this 指向新创建的对象；
// 通过 new 创建的每个对象将最终被 [[Prototype]] 链接到这个函数的prototype对象上；
// 如果函数没有返回对象类型 Object(包含 Functoin , Array , Date , RegExg, Error)，那么 new 表达式中的函数调用将返回该对象引用。

const isComplexDataType = () => ['object', 'function'].includes(typeof obj) && obj !== null;

const myNew = function () {
  const obj = new Object();
  const Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype

  const ret = Constructor.apply(obj, arguments)
  return isComplexDataType(ret) ? ret : obj
}

const myNew2 = (fn, ...rest) => {
  const instance = {};
  instance.__proto__ = fn.prototype

  const res = fn.apply(instance, rest)
  return isComplexDataType(res) ? res : instance
};


