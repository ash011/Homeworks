//                    array.map 

let array = [15, 25, 33, 4, 5, 6, 7, 8];

Array.prototype.map2 = function (call) {
  let arr = [];
    let array = this
  if (typeof call === "function") {
    for (let i = 0; i < this.length; i++) {
      arr.push(call(this[i], i, array));

    }
  } else {
    throw new TypeError(call + " is not a function");
  }
  return arr;
};

let mappedArray = array.map2((item,index,array) =>{
  return index * 3 
});

console.log("This is a mapped array", mappedArray);

// __________________array.slice______________________

let array1 = [1,2,3,4,5,6,7,8]

Array.prototype.slice1 = function(from, to){
    let arr = []
    if(to<0){
      for(let i = from; i < this.length + (to); i++){
        arr.push(this[i])
      }
    }else{
      for(let i = from; i < to; i++){
      arr.push(this[i])
    }
   }
    return arr
}

let slicedArray = array1.slice1(1, -1)

console.log("This is a sliced array",slicedArray)
