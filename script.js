let shopping_card_container = document.getElementById('shopping-card-container');
const navlinks = document.querySelectorAll('.nav-link');
const search_box = document.getElementById('search-box');
const search_btn = document.getElementById('searchBtn');
const no_item_text = document.querySelector('.no-item');
const no_item_text_two = document.querySelector('.no-item-2');
const shopping_list_body = document.querySelector('.shopping-list-body');
const alert_box = document.querySelector('.alertBox');
const closeAlertBtn = document.querySelector('.closeAlertBtn');
const numberOfitem = document.querySelector('.number-item');
const totalPrice = document.querySelector('.total-price');
let count = 0;

//localStorage.removeItem('cart_items');

//array for localstorage
let items_arr = JSON.parse(localStorage.getItem('cart_items')) || [];


//show cart items from localstorage
for(let itemObj of items_arr) {
    let shopping_item = createShoppingItem(itemObj.item_name, itemObj.item_img, itemObj.item_price);
    shopping_list_body.prepend(shopping_item);
    count++;
    numberOfitem.innerText = count;
    no_item_text_two.style.display = 'none';
    calculateTotalPrice();
    
    //calculate total price when user input quantity in input box
    let quantity_inputs = shopping_list_body.querySelectorAll('.quantity-input');
    for(let quantityInput of quantity_inputs) {
        quantityInput.addEventListener('input', function() {
            calculateTotalPrice();
        })
    }
    
}

//array
const products_arr = [
    [
        {item_name: 'Shoes 1', item_img: 'images/shoes_1.jpg', item_price: '120'},
        {item_name: 'Shoes 2', item_img: 'images/shoes_2.jpg', item_price: '90'},
        {item_name: 'Shoes 3', item_img: 'images/shoes_3.jpg', item_price: '100'},
        {item_name: 'Shoes 4', item_img: 'images/shoes_4.jpg', item_price: '115'},
        {item_name: 'Shoes 5', item_img: 'images/shoes_5.jpg', item_price: '168'},
        {item_name: 'Shoes 6', item_img: 'images/shoes_6.jpg', item_price: '121'},
        {item_name: 'Shoes 7', item_img: 'images/shoes_7.jpg', item_price: '89'}
    ],

    [
        {item_name: 'Pants 1', item_img: 'images/pants_1.jpg', item_price: '76'},
        {item_name: 'Pants 2', item_img: 'images/pants_2.jpg', item_price: '87'},
        {item_name: 'Pants 3', item_img: 'images/pants_3.jpg', item_price: '42'},
        {item_name: 'Pants 4', item_img: 'images/pants_4.jpg', item_price: '73'},
        {item_name: 'Pants 5', item_img: 'images/pants_5.jpg', item_price: '41'},
    ],

    [
        {item_name: 'Shirt 1', item_img: 'images/shirt_1.jpg', item_price: '64'},
        {item_name: 'Shirt 2', item_img: 'images/shirt_2.jpg', item_price: '81'},
        {item_name: 'Shirt 3', item_img: 'images/shirt_3.jpg', item_price: '41'},
        {item_name: 'Shirt 4', item_img: 'images/shirt_4.jpg', item_price: '85'},
        {item_name: 'Shirt 5', item_img: 'images/shirt_5.jpg', item_price: '43'},
    ],

    [
        {item_name: 'Speaker 1', item_img: 'images/speaker_1.jpg', item_price: '76'},
        {item_name: 'Speaker 2', item_img: 'images/speaker_2.jpg', item_price: '83'},
        {item_name: 'PS4 Controller 1', item_img: 'images/ps4_controller_1.jpg', item_price: '112'},
        {item_name: 'PS4 Controller 2', item_img: 'images/ps4_controller_2.jpg', item_price: '125'},
        {item_name: 'Smart Watch', item_img: 'images/smart_watch_1.jpg', item_price: '316'},
        {item_name: 'Camera', item_img: 'images/camera_1.jpg', item_price: '417'},
        {item_name: 'Headphone', item_img: 'images/headphone_1.jpg', item_price: '218'},
    ],
]

//At first, show item cards
for(let item of products_arr[0]) {
    shopping_card_container.append(createItemCard(item));
}

//create an item card, this function returns an item card
function createItemCard(item) {
    let itemCard = document.createElement('div');
    itemCard.classList.add('col-6', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-3', 'item-card');
    itemCard.innerHTML = `<div class="card">
    <div class="card-body">
      <img
        class="w-100"
        src="${item.item_img}"
        alt="product-image"
      />
    </div>
    <div class="card-footer bg-dark text-white py-3">
      <div class="mb-1 item-name">${item.item_name}</div>
      <div class="d-flex align-items-center justify-content-between">
        <span class="">$<span class="item-price">${item.item_price}</span> </span>
        <i
          class="fa-solid text-center fa-bag-shopping fs-5 bg-danger rounded rounded-circle addToCartBtn"
          style="
            cursor: pointer;
            margin-top: 2px;
            width: 35px;
            height: 35px;
            line-height: 35px;
          "
        ></i>
      </div>
    </div>
  </div>`;

  return itemCard;
}

//remove previous item card
function removeItemCard() {
    let item_cards = document.querySelectorAll('.item-card');
    for(let card of item_cards) {
        card.remove();
    }
}

//user click nav link(product name)
for(let nav of navlinks) {
    
    nav.addEventListener('click', function() {
        removeItemCard(); //remove previous item cards

        let product_id = this.id; //when user click nav link, it will get id
        for(let item of products_arr[product_id]) {
            shopping_card_container.append(createItemCard(item));
        }
    })

    
}

//find products in search box
search_box.addEventListener('input', function() {
    no_item_text.style.display = 'none';
    removeItemCard(); //remove previous item cards
    for(let item_arr of products_arr) {
        for(let item of item_arr) {
            if(item.item_name.toLowerCase().includes(this.value) && this.value !== '') {
                shopping_card_container.append(createItemCard(item));
            }
        }
    }
    
    //if item is not found
    let item_cards = document.querySelectorAll('.item-card');
    if(item_cards.length === 0) {
        no_item_text.style.display = 'block';
    }

    if(this.value === '') {
        no_item_text.style.display = 'none';
        //show first products
        for(let item of products_arr[0]) {
            shopping_card_container.append(createItemCard(item));
        }
    }
})


//user click add to cart button
shopping_card_container.addEventListener('click', function(event) {
    if(event.target.classList.contains('addToCartBtn')) {
        no_item_text_two.style.display = 'none';

        //get item card
        let item_card = event.target.parentElement.parentElement.parentElement.parentElement;
        let item_name = item_card.querySelector('.item-name').textContent;
        let item_img = item_card.querySelector('img').src;
        let item_price = parseFloat(item_card.querySelector('.item-price').innerText);

        //make sure not to add the same item twice or more
        let list_item_names = shopping_list_body.querySelectorAll('.list-item-name');
        for(let list_name of list_item_names) {
            if(item_name === list_name.textContent) {
                alert_box.style.display = 'block';
                return;
            }
        }
        
        //add items to shopping cart
        let shopping_item = createShoppingItem(item_name, item_img, item_price);
        shopping_list_body.prepend(shopping_item);

        //make item obj and add to array and store the array in localstorage
        let itemObj = makeItemObj(item_name, item_img, item_price);
        items_arr.push(itemObj);
        localStorage.setItem('cart_items', JSON.stringify(items_arr));
        
        //number of items when user click add to cart button
        count++;
        numberOfitem.innerText = count;

        //calculate total price when user click add to cart button
        calculateTotalPrice();

        //calculate total price when user input quantity in input box
        let quantity_inputs = shopping_list_body.querySelectorAll('.quantity-input');
        for(let quantityInput of quantity_inputs) {
            quantityInput.addEventListener('input', function() {
                calculateTotalPrice();
            })
        }
    }
})

//delete cart items
shopping_list_body.addEventListener('click', function(event) {
    if(event.target.classList.contains('deleteBtn')) {
        if(confirm('Are you sure to delete?')) {
            event.target.parentElement.parentElement.remove();
            calculateTotalPrice();
            count--;
            numberOfitem.innerText = count;

            //get item name
            let cart_item_name = event.target.parentElement.parentElement.querySelector('.list-item-name').innerText;
            items_arr = items_arr.filter(function(item_obj) {
                return cart_item_name !== item_obj.item_name;
            })

            localStorage.setItem('cart_items', JSON.stringify(items_arr));

            if(items_arr.length === 0) {
                no_item_text_two.style.display = 'block';
            }
        }
    }
})

//make item object
function makeItemObj(item_name, item_img, item_price) {
    return {
        item_name,
        item_img,
        item_price
    }
}

//create shopping list item
function createShoppingItem(item_name, item_img, item_price) {
    let shoppingItem = document.createElement('div');
    shoppingItem.classList.add('shopping-item');
    shoppingItem.innerHTML = `<div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
    <img src="${item_img}" alt="" style="width: 100px; height: 100px;">
    <div class="d-flex flex-column align-items-center ">
      <div class="list-item-name">${item_name}</div>
      <div class="my-2">$ <span class="itemPrice">${item_price}</span></div>
        <input type="number" style="width: 60px; padding-left: 5px;" class="quantity-input fw-bold" value="1">
    </div>
    <i class="fa-solid fa-trash-can fs-5 text-danger deleteBtn" style="cursor: pointer;"></i>
  </div>`;

  return shoppingItem;
}

//close alert button
closeAlertBtn.addEventListener('click', function() {
    alert_box.style.display = 'none';
})

//calculate total price
function calculateTotalPrice() {
    let total_price = 0;
    let quantity_inputs = shopping_list_body.querySelectorAll('.quantity-input');
    let itemPrices = shopping_list_body.querySelectorAll('.itemPrice');

    for(let i = 0; i < quantity_inputs.length; i++) {
        let quantity = parseFloat(quantity_inputs[i].value);
        if(!quantity) {
            quantity = 0;
        }
        total_price += (parseFloat(itemPrices[i].textContent) * quantity);
    }
    
    totalPrice.innerText = total_price;
    
}

