let array =[1,[25,[6],7],{a:4,b:6,c:[5,6]},null,'qwerty',()=>{}]

function flatter(arr){
  let newArr = [];
  const flat = (arr)=>{
    for(let i in arr){
      if(typeof arr[i] === "object" && arr[i] !== null){
        flat(arr[i])
      }else{
        newArr.push(arr[i])
      }
    } 
  }
  flat(arr)
  return newArr
}

let newArray = flatter(array)

console.log(newArray)
