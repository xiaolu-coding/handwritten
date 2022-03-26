export class Debounced {
  static use(fn: Function, awit: number = 1000, immediate: boolean = false) {
    let timer: number
    return (...args: any) => {
      if (timer) clearInterval(timer)
      if (immediate) {
        if (!timer) fn.apply(this, args)
        timer = setTimeout(function() {
          timer = null
        }, awit)
      } else {
        timer = setTimeout(() => { fn.apply(this, args) }, awit)
      }
    }
  }
}

export class Throttle {
  static use(fn: Function, awit: number = 1000, immediate: boolean = true) {
    //时间戳
    if (immediate) {
      let prevTime = 0
      return (...args: any) => {
        let nowTime = Date.now()
        if (nowTime - prevTime >= awit) {
          fn.apply(this, args)
          prevTime = nowTime
        }
      }
    } else {
      //定时器
      let timer:  number
      return (...args: any) => {
        if (!timer) {
          fn.apply(this, args)
          timer = setTimeout(() => {
            timer && clearTimeout(timer)
            timer = null
          }, awit)
        }
      }
    }
  }
}


