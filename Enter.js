let results = document.getElementById("products");
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

let generateItems = () => {
	return (results.innerHTML = shopItemsData
		.map((shopItem) => {
			let { id, img, name, price } = shopItem;
			return `
        <div id="${id}" class="vare">
        <img src=${img} alt="">
        <h2>${name}</h2>
        <p>$${price}</p>
        <a onclick="addToCart(${id})" class="btn">Add to cart</a>
        </div>`;
		})
		.join(""));
};
generateItems();

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
};
