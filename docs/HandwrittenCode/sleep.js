const sleep = duration => {
  const preDate = new Date()
  duration = isNaN(Number(duration)) ? 0 : Number(duration)
  while (true) {
    if (new Date() - preDate >= duration) return false
  }
}

// promise
const sleepWithPromise = duration => {
  return new Promise((resolve, reject) => setTimeout(resolve, duration))
}

// Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve,reject){
    setTimeout(resolve,time);
  })
}


console.log('睡眠 2 秒！');
console.time('Generator sleep');
// test()
sleepGenerator(2000).next().value.then(()=>{
  console.timeEnd('Generator sleep');
})
console.log('我在 sleep 之后！');
