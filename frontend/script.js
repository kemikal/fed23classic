let list = document.getElementById("list");
let catList = document.getElementById("cat");
let prodList = document.getElementById("prod");

let loginBtn = document.getElementById("login")

// INIT FUNKTION, KOLLA OM NÅGON ÄR INLOGGAD ELLER INTE
if (localStorage.getItem("user")) {
    printLogOutBtn();
    getProdCat();
} else {
    printLoginBtn();
}

// LOGGA IN ELLER UT
loginBtn.addEventListener("click", () => {

    // VI HAR FETCHAT OCH FÅTT SVAR MED USERNS ID

    if (localStorage.getItem("user")) {
        localStorage.removeItem("user")
        list.innerHTML = "";
        printLoginBtn();
    } else {
        localStorage.setItem("user", JSON.stringify("qwer1234"));
        getProdCat();
        printLogOutBtn();
    }
    

})

function printLogOutBtn() {
    loginBtn.innerText = "Logga ut";
}

function printLoginBtn() {
    loginBtn.innerText = "Logga in";
}

// async function fetchCategories() {
//     const categories = await fetch("http://localhost:3000/categories");
//     //console.log("fetch", categories);
//     return categories.json();
// }

// async function fetchProducts(category) {
//     const products = await fetch("http://localhost:3000/products/" + category);
//     return products.json();
// }

// async function printProducts(products) {
//     for (const product of products) {
//         let li = document.createElement("li")
//         li.innerText = product.productName;
//         list.appendChild(li);
//     }
// }

// async function printCatAndProd() {
//     let categories = await fetchCategories();

//     console.log("Categories", categories);
    
//     for (const category of categories) {
//         console.log("cat", category);

//         let li = document.createElement("li");
//         li.innerText = category.productLine;
//         li.style.fontWeight = "bold";
//         list.appendChild(li);

//         const products = await fetchProducts(category.productLine);
//         console.log("products", products);
//         await printProducts(products);

//     }

// }

// printCatAndProd();

// function printProducts(productLine) {
//     fetch("http://localhost:3000/products/" + productLine)
//     .then(res => res.json())
//     .then(data => {
        
//         prodList.innerHTML = "";

//         data.map(prod => {
//             let li = document.createElement("li")
//             li.innerText = prod.productName;

//             prodList.appendChild(li);
//         })
//     })
// }

// function printCategories() {
//     fetch("http://localhost:3000/categories")
//     .then(res => res.json())
//     .then(data => {

//         data.map(cat => {
//             let li = document.createElement("li");
//             li.innerText = cat.productLine;

//             li.addEventListener("click", () => {
//                 printProducts(cat.productLine)
//             })

//             catList.appendChild(li);
//         })

//     })
// }

// printCategories();

function getProdCat() {

    Promise.all([
        fetch("http://localhost:3000/categories").then(res => res.json()),
        fetch("http://localhost:3000/products").then(res => res.json())
    ])
    .then(data => {
        console.log("promise all", data);

        let categories = data[0];
        let products = data[1];

        categories.map(cat => {
            let li = document.createElement("li")
            li.innerText = cat.productLine;
            li.style.fontWeight = "bold";
            list.appendChild(li);

            let prods = products.filter(prod => prod.productLine == cat.productLine) 

            prods.map(prod => {
                li = document.createElement("li")
                li.innerText = prod.productName;

                list.appendChild(li)
            })
        })
    })
  
}