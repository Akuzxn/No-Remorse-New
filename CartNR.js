let basket = JSON.parse(localStorage.getItem("data")) || [];
let shopItemsData = [
	{
		id: "black_hoodie1",
		name: "Black NO REMORSE Hoodie",
		price: 20,
		img: "./img_NR/placeholder2.jpg",
	},
	{
		id: "white_hoodie",
		name: "White NO REOMRSE Hoodie",
		price: 20,
		img: "./img_NR/placeholder4.jpg",
	},
	{
		id: "gray_hoodie",
		name: "Gray NO REMORSE Hoodie",
		price: 20,
		img: "./img_NR/placeholder3.jpg",
	},
	{
		id: "cream_hoodie",
		name: "Cream NO REMORSE Hoodie",
		price: 20,
		img: "./img_NR/placeholder1.jpg",
	},
];

let items = document.getElementById("items");

let generateItems = () => {
	return (items.innerHTML = basket
		.map((basketItem) => {
			let { id, item } = basketItem;
			let { img, name, price } = shopItemsData.find((x) => x.id === id);
			let search = basket.find((x) => x.id === id) || [];
			return `
        <div id="${id}" class="vare">
        <img src=${img} alt="">
        <h2>${name}</h2>
        <p>$${price * item}</p>
        <p class="amount">Amount: ${search.item === undefined ? 0 : search.item}</p>
        <a onclick="decrement(${id})" class="btn1">Remove from cart</a>
        <a onclick="addToCart(${id})" class="btn2">Add to cart</a>
        </div>`;
		})
		.join(""));
};
generateItems();

let decrement = (id) => {
	let selectedItem = id;
	let search = basket.find((x) => x.id === selectedItem.id);

	if (search === undefined) return;
	else if (search.item === 0) return;
	else {
		search.item -= 1;
	}
	basket = basket.filter((x) => x.item !== 0);
	localStorage.setItem("data", JSON.stringify(basket));
	generateItems();
	generateTotal();
};

let addToCart = (id) => {
	let selectedItem = id;
	let search = basket.find((vare) => vare.id === selectedItem.id);

	if (search === undefined) {
		basket.push({
			id: selectedItem.id,
			item: 1,
		});
	} else {
		search.item += 1;
	}
	localStorage.setItem("data", JSON.stringify(basket));
	generateItems();
	generateTotal();
};

let total = document.getElementById("total");

let generateTotal = () => {
	let totalSum = basket.reduce((acc, cur) => {
		let { price } = shopItemsData.find((x) => x.id === cur.id);
		return acc + price * cur.item;
	}, 0);
	if (totalSum === 0)
		return (total.innerHTML = `
    <p>Nothing in your cart<p>
    <a href="./Product.html" class="checkout-button btn" id="checkout-button">To store</a>
    
    `);
	return (total.innerHTML = `
    <p>Total: $${totalSum}<p>
    <a onClick="checkout()" href="./checkout.html" class="checkout-button btn" id="checkout-button">Checkout</a>
    `);
};
generateTotal();

let checkout = () => {
	localStorage.clear();
	basket = [];
	generateItems();
	generateTotal();
};
