export default getTime

function getTime(time, template) {
  let date = new Date(time)
  console.log(time)
  if(/(y+)/.test(template)){
    template = template.replace(RegExp.$1, (date.getFullYear() + '').slice(-RegExp.$1.length))
    console.log(template)
  }
  const o ={
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for(let k in o){
    if (new RegExp(`(${k})`).test(template)){
      let v = o[k]+''
      template = template.replace(RegExp.$1, handleZero(v))
    }
  }
  console.log(template)
  return template
}

function handleZero(v) {
  const a = '00' + v
  return a.slice(-2)
}