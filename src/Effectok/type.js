//                                                                         Object.prototype. 
//                     getType()           getBaseType()     typeof()      toString.call() 
//                                 
//  undefined          undefined           value             undefined     [object Undefined]       
//  1                  number              value             number        [object Number]            
//  '1'                string              value             string        [object String]               
//  false              boolean             value             boolean       [object Boolean]
//  null               null                value             object        [object Null]  
//  ()=>{}             function            value             function      [object Function] 
//  new Set            set                 value             object        [object Set]         
//  {}                 object              container         object        [object Object]          
//  [],new Array       array               container         object        [object Array]          
//  new Map            map                 container         object        [object Map]


//此文件封装了js的数据类型
//我把 object map array 规定为容器类型  
// set 和其他规定为值类型
//定义了操作这些类型的函数
export function getType(obj) {
  if(obj === null) return 'null'
  let ret = typeof(obj); 
  if(ret === 'object') {
    return Object.prototype.toString.call(obj).replace('object ', '').replace('[','').replace(']','').toLowerCase();
  }
  return ret
}

export function getBaseType (obj) {
  if(obj == null) return 'value'
  let type = typeof(obj)
  if(type === 'object' && Object.prototype.toString.call(obj) !== '[object Set]') {
    return 'container'
  }
  return 'value'
}

export function getSize(obj) {
  if(getBaseType(obj) === 'value') return 1
  let type =  getType(obj)
  switch(type) {
    case 'object':
      return Object.keys(obj).length
    case 'array':
      return obj.length
    case 'map':
      return obj.size
  }
}

export function getValue(obj, key) {
  if(getBaseType(obj) === 'value') return obj 
  let type =  getType(obj)
  switch(type) {
    case 'object':
      return obj[key]
    case 'array':
      return obj[key]
    case 'map':
      return obj.get(key)
  }
}

export function copyValue(value) {
  if(getBaseType(value) !== 'value') {
    console.log('copyValue 类型错误' + getType(value));
  }
  let type = getType(value)
  if(type !== 'set') return value
  let set = new Set()
  for(let x of value) {
    set.add(x)
  }
  return set
}

export function valueEqual(value1, value2) {
  let type1 = getType(value1)
  let type2 = getType(value2)
  if(type1 !== type2 || type1 === 'object' || type1 === 'array' || type1 === 'map') {
    console.log('错误的类型: valueEqual(' + type1 + ', ' + type2 + ')   ' + 'value1 == ' + value1 +"   value2 ==" + value2  );
    return
  }
  if(type1 !== 'set') {
    if(value1 === value2) return true
    else return false
  }
  //到这只能是set类型
  let size1 = value1.size
  let size2 = value2.size
  if(size1 !== size2) return false
  for (var x of value1) {   
    if(!value2.has(x))
      return false
  }
  return true
}

export function forEach(container, each){
  let ret
  let type = getType(container)
  switch(type) {
    case 'object':
      for(let key in container) {
        ret = each(container[key], key)  
        if(typeof ret !== 'undefined') return ret
      }
      break;
    case 'array':
      for(let key in container) {
        ret = each(container[key], key)  
        if(typeof ret !== 'undefined') return ret
      }
      break;
    case 'map':
      for(let key of container.keys()) {
        ret = each(container.get(key), key)
        if(typeof ret !== 'undefined') return ret
      }
      break;
  }
}

export function traversalDescendantsWithPath(container, func) {
  if(getBaseType(container) === 'value')
    return 
  let ret
  let containerStk = [container]
  let PathStk = ['']
  while(containerStk.length !== 0){
    let curContainer = containerStk.shift()
    let curPath = PathStk.shift()
    let curType = getType(curContainer)
    forEach(curContainer, (val, key) => {
      let childPath = getChildRelativePath(curPath, curType, key)
      let relativePath = childPath
      ret = func(val, key, relativePath)
      if(ret !== undefined) return ret
      if(getBaseType(val) === 'container') {
        containerStk.push(val)
        PathStk.push(childPath)
      }
    })
  }    
}

export function traversalDescendants(container, func) {
  if(getBaseType(container) === 'value')
    return 
  let ret
  let containerStk = [container]
  while(containerStk.length !== 0){
    let curContainer = containerStk.shift()
    forEach(curContainer, (val, key) => {    
      ret = func(val, key)
      if(ret !== undefined) return ret
      if(getBaseType(val) === 'container') {
        containerStk.push(val)
      }
    })
  }    
}

export function getDescendants(container) {
  let ret = []
  traversalDescendants(container, (value, key) => {
    ret.push(value)
  })
  return ret
}

export function doubleTraversalDescendants(container1, container2, func){
  if(getBaseType(container1) === 'value')
    return 
  let ret
  let containerStk1 = [container1]
  let containerStk2 = [container2]
  while(containerStk1.length !== 0){
    let curContainer1 = containerStk1.shift()
    let curContainer2 = containerStk2.shift()
    forEach(curContainer1, (val1, key) => {   
      let val2 = getValue(curContainer2, key)
      ret = func(val1, val2, key)
      if(ret !== undefined) return ret
      if(getBaseType(val1) === 'container') {
        containerStk1.push(val1)
        containerStk2.push(val2)
      }
    })
  }    
}

export function doubleTraversalDescendantsWithPath(container1, container2, func){
  if(getBaseType(container1) === 'value')
    return 
  let ret
  let containerStk1 = [container1]
  let containerStk2 = [container2]
  let PathStk = ['']
  while(containerStk1.length !== 0 && containerStk2.length !== 0) {
    let curContainer1 = containerStk1.shift()
    let curContainer2 = containerStk2.shift()
    let curPath = PathStk.shift()
    let curType = getType(curContainer1)
    forEach(curContainer1, (val1, key) => {   
      let val2 = getValue(curContainer2, key)
      let childPath = getChildRelativePath(curPath, curType, key)
      let relativePath = childPath
      ret = func(val1,val2, key, relativePath)
      if(ret !== undefined) return ret
      if(getBaseType(val1) === 'container') {
        containerStk1.push(val1)
        containerStk2.push(val2)
        PathStk.push(relativePath)
      }
    })
  }    
}

export function equal(obj1, obj2) {
  // 类型为基本类型时,如果相同,则返回true 否则是false
  // 如果是引用类型的话  而且非容器类型 比如function 如果不是一个引用  fasle 
  if(getBaseType(obj1) === 'value')
    return valueEqual(obj1, obj2)
  let type1 = getType(obj1)
  let type2 = getType(obj2)
  if(type1 !== type2) return false
  let size1 = getSize(obj1)
  let size2 = getSize(obj2)
  if(size1 !== size2) return false
  let ret = forEach(obj1, function(value, key){
    if (!equal(value, getValue(obj2, key))) { 
      return false
    }
  })
  if(ret !== undefined) return ret
  return true
}

export function copy(obj) {
  if(getBaseType(obj) === 'value')
  return copyValue(obj)
  let type = getType(obj)
  let ret
  switch(type) {
    case 'object':  ret = {};         break;
    case 'array':   ret = [];         break;
    case 'map':     ret = new Map();  break;
  }
  forEach(obj, function(value, key){
    switch(type) {
      case 'object':  ret[key] = copy(value);         break;
      case 'array':   ret[key] = copy(value);         break;
      case 'map':     ret.set(copy(key), copy(value));  break; 
    }
  })
  return ret
}
//特殊使用
export function getChildRelativePath(fatherRelativePath, type, key) {
  switch(type){
    case 'object':
      return fatherRelativePath + '.' + key
    case 'array':
      return fatherRelativePath +'['+  key +']'
    case 'map':
      return  fatherRelativePath + '.get(' + key +')'
    default:
      console.log('getChildRelativPath 类型错误' + type);
  }
}

export function getAssignKeyByRelativePath(relativePath) {
  // if(relativePath.includes('.')) { //把.get(key)变成 [key]
  //   relativePath = '[' +  relativePath.slice(5,relativePath.length -1) + ']'
  // }
  relativePath.replace('.get(', '[')
  relativePath.replace(')',']')
  return relativePath
}

//leftPath不能为空 否则会赋值失败
export function assignByPath(left, leftPath , right, rightPath = '') {
  let rightVal = copy(eval('right' + rightPath))
  eval('left' + leftPath + ' = rightVal')
}

export function isRoot(pointer){
  return !pointer.includes('.') && !pointer.includes('[')
}

export function getFatherPointer(pointer){
  let array = pointer.lastIndexOf('[')
  let other = pointer.lastIndexOf('.')
  if(array > other) return pointer.slice(0, array)
  else return pointer.slice(0, other)
}





