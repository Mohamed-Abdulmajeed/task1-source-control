// ! 
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode = 'create';
let ind ;
// console.log("done");
// ! get total
function getTotal(){
    console.log("done");
    
    if(price.value != '' &&taxes.value !='' && ads.value !='' && discount.value !=''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML= result
        total.style.background = '#040'
    }else{
        total.innerHTML = ''
        total.style.background = '#be0505'
    }
}
// ? create product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro=[];
}
submit.onclick= function(){
    console.log('dd');
    
   let newPro = {
    title: title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    category:category.value,
    count:count.value,
   }
if (title.value !='' && price.value != '' && newPro.count <=100) {
    if (mode === 'create') {
     if (newPro.count>1) {
    for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
    }
   }else{
        dataPro.push(newPro);
   } 
}else{
    dataPro[ind] = newPro;
    mode = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block'
}
clearData()

}


localStorage.setItem('product', JSON.stringify(dataPro))
showData()
}

// *clear inputs
function clearData(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
count.value='';
total.innerHTML='';
category.value='';
}

// ! read
function showData(){
let table = ''
for(i=0;i<dataPro.length ;i++){
table += `
<tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].total}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i+1})" id="delete">delete</button></td>
        </tr>
`

}
document.getElementById('tbody').innerHTML = table
let btnDelete = document.getElementById('deleteAll');
if(dataPro.length){
btnDelete.innerHTML = `<button onclick = "deleteAll()">Delete All (${dataPro.length})</button>`
}else{
    btnDelete.innerHTML ='';
}

getTotal();
}
showData()

// ? delete 
function deleteData(ind){
dataPro.splice(ind-1,1);
localStorage.product = JSON.stringify(dataPro)
showData()
}

// *  deleteAll
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0)
    showData()
}
// * count

// ? update
function updateData(i){
    // console.log(i);
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
    getTotal();
    count.style.display = 'none' ;
    submit.innerHTML = 'Update';
    mode = 'update'
    ind = i;
    scroll({
        top : 0,
        behavior : 'smooth'
    })
}

// ! search
let searchMood = 'title';
function getSearchMood(id){
       let search = document.getElementById('search');

   if (id == 'searchTitle') {
    searchMood = 'title';
   }else{
    searchMood = 'category';
   }
       search.Placeholder ='Search by '+ searchMood;

search.focus();
search.value ='';
showData();
}

function searchData(value){
    let table = '';
if (searchMood== 'title') {
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
            table += `
<tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].total}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i+1})" id="delete">delete</button></td>
        </tr>
`
        }
    }
} else {
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
            table += `
<tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].total}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i+1})" id="delete">delete</button></td>
        </tr>
`
        }
    }
}
document.getElementById('tbody').innerHTML = table

}


