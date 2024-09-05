let mImages = document.querySelector("#menu-images");
document.addEventListener("DOMContentLoaded", getMenu());
let yourOrder = [];
function getMenu() {
  fetch("data.json")
    .then((Response) => Response.json())
    .then((data) => {
      data.forEach((element) => {
        let maindiv = document.createElement("div");
        maindiv.className = "img-div";
        let img = document.createElement("img");
        img.src = "assests/menuimg.svg";
        img.style.width = "20vw";
        let babydiv = document.createElement("div");
        babydiv.className = "priceName";
        let babydiv1 = document.createElement("div");
        let babydiv2 = document.createElement("div");
        babydiv1.innerText = `${element.name}`;
        babydiv2.innerText = `$${element.price}`;
        maindiv.appendChild(img);
        babydiv.appendChild(babydiv1);
        babydiv.appendChild(babydiv2);
        maindiv.appendChild(babydiv);
        mImages.appendChild(maindiv);
      });
    });
  result();
}

function randomOrder() {
  return new Promise((resolve) => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        let randomNum = Math.ceil(Math.random() * 25);
        data.forEach((element) => {
          if (element.id == randomNum) {
            yourOrder.push(element);
          }
        });
        resolve();
      });
  });
}

function TakeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Promise.all([randomOrder(), randomOrder(), randomOrder()]).then(() => {
        resolve(yourOrder);
      });
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let orderPrepObject = { order_status: true, paid: false };
      resolve(orderPrepObject);
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let payOrderObject = { order_status: true, paid: true };
      resolve(payOrderObject);
    }, 1000);
  });
}

function thankyouFnc() {
  alert("THANKYOU FOR EATING WITH US TODAY! SEE YOU SOON");
}

function result() {
  TakeOrder()
    .then((data) => {
      console.log(`YOUR ORDER:`, data);
      return orderPrep();
    })
    .then((data) => {
      console.log(`ORDER PREPRATION STATUS:`, data);
      return payOrder();
    })
    .then((data) => {
      console.log(`PAYMENT STATUS:`, data);

      thankyouFnc();
    });
}
