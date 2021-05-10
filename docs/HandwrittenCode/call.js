Function.prototype.myCall = function (context = windows, ...args) {
    context._fn = this
    const result = context._fn(...args)
    delete context._fn
    return result
}

