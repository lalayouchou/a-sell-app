export default function urlParse () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?g]+/g
  if (url) {
    let arr = url.match(reg)
    for (let v of arr) {
      let tempArr = v.slice(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let value = decodeURIComponent(tempArr[1])
      obj[key] = value
    }
  }
  console.log(obj)
  return obj
}
