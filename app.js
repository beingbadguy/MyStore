const itemsDiv = document.querySelector(".items");
const proDiv = document.querySelector("#item");
const cart = document.querySelector(".cart");
const Realcart = document.querySelector(".cartup");
const not = document.querySelector(".notification");

const total = document.querySelector("h3");
const menu = document.querySelector("#open");
const close = document.querySelector("#close");

menu.addEventListener("click", () => {
  itemsDiv.style.display = "none";
  Realcart.classList.add("activeCart");
  menu.style.display = "none";
  close.style.display = "block";

  console.log("i was clicked");
});
close.addEventListener("click", () => {
  itemsDiv.style.display = "flex";

  Realcart.classList.remove("activeCart");
  menu.style.display = "block";
  close.style.display = "none";

  console.log("i was clicked");
});

let priceArray = [];
const apiFetch = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=12");
  const data = await response.json();

  data.map((item) => {
    const div = document.createElement("div");
    div.setAttribute("id", "item");
    itemsDiv.appendChild(div);

    const productImg = document.createElement("img");
    productImg.src = item.image;
    div.appendChild(productImg);

    const titleName = document.createElement("h5");
    titleName.innerText = item.title;
    div.appendChild(titleName);

    const price = document.createElement("p");
    price.innerText = Math.floor(item.price) + " $";
    div.appendChild(price);

    const btn = document.createElement("button");
    btn.innerText = "Add to cart";
    div.appendChild(btn);
    btn.setAttribute("id", `${item.id}`);
    let sum = 0;
    // cart logic

    btn.addEventListener("click", () => {
      setTimeout(() => {
        not.style.display = "block";
      }, 100);
      setTimeout(() => {
        not.style.display = "none";
      }, 1000);
      const cartDiv = document.createElement("div");
      cartDiv.setAttribute("class", "products");

      const cartImg = document.createElement("img");
      cartImg.src = item.image;
      cartDiv.appendChild(cartImg);

      const cartTitle = document.createElement("h5");
      cartTitle.innerText = item.title;
      cartDiv.appendChild(cartTitle);

      const cartP = document.createElement("p");
      cartP.innerText = Math.floor(item.price) + " $";
      cartDiv.appendChild(cartP);

      const btnDel = document.createElement("button");
      btnDel.setAttribute("class", "delete");
      btnDel.innerText = "Remove";
      cartDiv.appendChild(btnDel);
      //   total.innerText = 0;

      priceArray.push(item.price);
      for (i = 0; i < priceArray.length; i++) {
        sum = sum + priceArray[i];
      }
      //   console.log(Math.floor(sum));
      total.innerText = Math.floor(sum) + " $";
      //   console.log(priceArray);

      btnDel.addEventListener("click", () => {
        // console.log("i'm clicked ", item.id);
        cart.removeChild(cartDiv);

        const position = priceArray.indexOf(item.price);
        // console.log(priceArray.indexOf(item.price));

        priceArray.splice(position, 1);

        // console.log(priceArray);
        const updatedSum = priceArray.reduce((acc, price) => acc + price, 0);
        total.innerText = Math.floor(updatedSum) + " $";
      });

      cart.appendChild(cartDiv);

      //   console.log(`i just clicked ${item.id}`);
    });

    // console.log(item);
  });
};
apiFetch();
