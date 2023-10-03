let Title = document.getElementById ("Title");
let prix = document.getElementById ("Prix");
let Taxe = document.getElementById ("Taxe");
let annonce = document.getElementById ("Annonce");
let reduction = document.getElementById ("Reduction");
let total = document.getElementById ("total");
let compter = document.getElementById ("compter");
let catégorie = document.getElementById ("catégorie");
let submit = document.getElementById ("submit");


let mood ='créer';
let tmp;




// fonction gettotale
function getTotale(){
    
   if (Prix.value !=''){
    let result = (+Prix.value + +Taxe.value + +Annonce.value)
    - +Reduction.value;
    total.innerHTML = result ;
    total.style.background = '#040';
   }else{
    total.innerHTML ='';
    total.style.background = 'rgb(199, 21, 9)';
   }
}

//fonction creation du produit
let dataPro = JSON.parse(localStorage.getItem('produit')) || [];



submit.onclick = function(){
    let newPro ={
        Title: Title.value.toLowerCase(),
        Prix : Prix.value,
        Taxe : Taxe.value,
        Annonce : Annonce.value,
        Reduction : Reduction.value,
        total : total.innerHTML,
        compter : compter.value,
        catégorie : catégorie.value.toLowerCase(),
    }

    // fonction compter
    if (Title.value != '' 
    && Prix.value != '' 
    && catégorie.value != '' 
    && newPro.compter <100){
        if (mood === 'créer'){
            if (newPro.compter > 1){
                        for ( let i = 0 ; i < newPro.compter; i++) {
                            dataPro.push(newPro);
                        }
                
                    }else{
                        dataPro.push(newPro);
                    }
            
        }else {
                   dataPro[tmp] = newPro;
                    mood = 'créer';
                    submit.innerHTML ='créer';
                    compter.style.display ='block';
            
        }
        
         clearData()
    }else {
        // Ajoutez des alertes pour informer l'utilisateur des conditions non remplies
        if (Title.value === '') {
            alert('Veuillez saisir un titre.');
        }
        if (Prix.value === '') {
            alert('Veuillez saisir un prix.');
        }
        if (catégorie.value === '') {
            alert('Veuillez choisir une catégorie.');
        }
        if (newPro.compter >= 100) {
            alert('La valeur de "compter" ne peut pas dépasser 100.');
        }
    }

    //Sauvegarder le données dans localStorage
    localStorage.setItem('produit' , JSON.stringify(dataPro))
    showData() 
} 


//nettoyer inputs
function clearData(){
    Title.value ='';
    Prix.value ='';
    Taxe.value ='';
    Annonce.value ='';
    Reduction.value ='';
    total.innerHTML ='';
    compter.value ='';
    catégorie.value ='';
}

//fonction Lire 
function showData(){
    getTotale();
    let table ='';
    for(let i =0; i<dataPro.length; i++){
        table += `
        <tr>
           <td>${i+1}</td>
           <td>${dataPro[i].Title}</td>
           <td>${dataPro[i].Prix}</td>
           <td>${dataPro[i].Taxe}</td>
           <td>${dataPro[i].Annonce}</td>
           <td>${dataPro[i].Reduction}</td>
           <td>${dataPro[i].total}</td>
           <td>${dataPro[i].catégorie}</td>
           <td><button onclick="updateDate(${i})"> Mise à jour </button></td>
           <td><button onclick="deleteData(${i})" id="supprimer">Supprimer</button></td>
        </tr>
        `
        
    }

   document.getElementById('tbody').innerHTML =table;
   let btnSuprimer = document.getElementById("suprimerTous");
   if (dataPro.length > 0){
    btnSuprimer.innerHTML =`
    <button onclick="deleteAll()"> Supprimer tous (${dataPro.length}) </button>
    `
   }else{
    btnSuprimer.innerHTML ='';
   }
}
showData()



//fonction supprimer les produits
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.produit = JSON.stringify(dataPro);
    showData()
}

function deleteAll(){
    localStorage.clear()
    //dataPro.splice=0
    dataPro = []; // Réinitialisez le tableau à vide
    showData()
}

//fonction mis à jour des produits 
function updateDate(i){
    Title.value = dataPro[i].Title;
    prix.value = dataPro[i].Prix;
    Taxe.value = dataPro[i].Taxe;
    annonce.value = dataPro[i].Annonce;
    Reduction.value = dataPro[i].Reduction;
    getTotale()
    compter.style.display = 'none';
    catégorie.value = dataPro[i].catégorie;
    submit.innerHTML ='Mise à jour';
    mood ='Mise à jour';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

//fonction rechercher les produits
let searchMood = 'Title';

function getSearchMood(id){
    let search = document.getElementById('Rechercher');
    if (id =='searchTitle'){
        searchMood = 'Title';
        
    }else {
        searchMood ='Catégorie';
       
    }
    search.placeholder = 'Rechercher par ' +searchMood;
    search.focus()  
    search.value ='';
    showData();
}

function searchData(value){
    let table ='';
    if (searchMood == 'Title'){
        for(let i =0;i<dataPro.length;i++){
            if (dataPro[i].Title.includes(value.toLowerCase())){
                table += `
                <tr>
                   <td>${i}</td>
                   <td>${dataPro[i].Title}</td>
                   <td>${dataPro[i].Prix}</td>
                   <td>${dataPro[i].Taxe}</td>
                   <td>${dataPro[i].Annonce}</td>
                   <td>${dataPro[i].Reduction}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].catégorie}</td>
                   <td><button onclick="updateDate(${i})"> Mise à jour </button></td>
                   <td><button onclick="deleteData(${i})" id="supprimer">Supprimer</button></td>
                </tr>
                `  
            }
        }


    }else{
        for(let i =0;i<dataPro.length;i++){
            if (dataPro[i].catégorie.includes(value.toLowerCase())){
                table += `
                <tr>
                   <td>${i}</td>
                   <td>${dataPro[i].Title}</td>
                   <td>${dataPro[i].Prix}</td>
                   <td>${dataPro[i].Taxe}</td>
                   <td>${dataPro[i].Annonce}</td>
                   <td>${dataPro[i].Reduction}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].catégorie}</td>
                   <td><button onclick="updateDate(${i})"> Mise à jour </button></td>
                   <td><button onclick="deleteData(${i})" id="supprimer">Supprimer</button></td>
                </tr>
                `  
            }
        }


    }
    document.getElementById('tbody').innerHTML =table;

}

//fonction nettoyer les données

