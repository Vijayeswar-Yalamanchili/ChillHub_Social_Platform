let arr1 = ['12','34']
let arr2 = ['qw','233','12',]

// for(let i=0;i<arr2.length;i++){
//     for(let j=0; j<arr1.length;j++){
//         if(arr2[i]=== arr1[j])
//         // return arr1[j]
//     console.log(arr1[j]);
//     }
// }
// console.log(arr1);

let arr3 = arr2.filter((e)=>{
    console.log(arr2);
    return arr1.includes(e)
    // console.log(e,"hi",arr1[0]);
    // return arr1[0] === e
})
console.log(arr3);