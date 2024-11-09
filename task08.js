let container = document.getElementsByClassName("container")[0];
let btn = document.querySelector("button");
let input = document.querySelector("input")

btn.addEventListener("click", () => {
    let value = input.value;
    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (data.length === 0) {
        alert("No Data Available");
        displayData(data);
    } else {
        let result = data.filter(obj => obj["category"] === value);
        displayData(result);
    }
})

async function getData() {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    localStorage.setItem("data", JSON.stringify(data));
    displayData(data);
}

function displayData(data) {
    container.innerHTML = "";
    if (data.length === 0) {
        alert("No Data Available");
    } else {
        data.forEach((obj, index) => {
            let div = document.createElement("div");
            div.className = "item";
            div.innerHTML =
                `<img src = ${obj["image"]}>
                <p><b>ID : </b>${obj["id"]}</p>
                <p><b>TITLE : </b>${obj["title"]}</p>
                <p><b>PRICE : </b>${obj["price"]}</p>
                <p><b>DESCRIPTION : </b>${obj["description"]}</p>
                <p><b>CATEGORY : </b>${obj["category"]}</p>`;
            container.appendChild(div);
        });
    }
}

function deleteData(index) {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    displayData(data);
}

getData();