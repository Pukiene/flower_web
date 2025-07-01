//Stores product details 
let flowers = [
  { id: 1, name: "Queen of Night - Tulip Bulbs", price: 15, stock: 5, category: "Bulbs", picture: "t1.jpg", description:"Whimsical, luxurious, and exquisite velvet-coloured tulips are perfect for making the outdoors stand out."},
  { id: 2, name: "Estella Rijnveld - Tuli Bulbs", price: 20, stock: 3, category: "Bulbs", picture: "t2.jpg", description:"The Estella Rijnveld tulip is a stunning and unique variety known for its striking red and white fringed petals."},
  { id: 3, name: "Angelique - Tulip Bulbs ", price: 25, stock: 7, category: "Bulbs", picture: "t3.jpg", description:"The Angelique Tulip is one of the most beloved double late tulips, admired for its soft pink, peony-like blooms, with its delicate, ruffled petals and gentle pastel hues. Angelique brings a romantic, elegant charm to any garden."},
  { id: 4, name: "Thomas Edison - Dahlia Tubers", price: 18, stock: 4, category: "Tubers", picture: "d1.jpg",description: "The Thomas Edison Dahlia is a striking, dahlia known for its large, velvety blooms and rich colour."},
  { id: 5, name: "Fleurel - Dahlia Tubers", price: 22, stock: 6, category: "Tubers", picture: "d2.jpg", description: "The Fleurel Dahlia is a breathtaking flower dahlia, famous for its massive, creamy white blooms that can grow up to 25 cm."},
  { id: 6, name: "Cornel Red - Dahlia Tubers", price: 35, stock: 2, category: "Tubers", picture: "d3.jpg",description:"The Cornel Red Dahlia is a stunning ball dahlia variety known for its perfectly rounded, deep red blooms. " },
  { id: 7, name: "Buff Beauty - Rose Bushes", price: 10, stock: 8, category: "Bushes", picture: "r1.jpg", description: "The Buff Beauty Rose is a classic hybrid musk rose, admired for its soft apricot-peach blooms with a tea-like fragrance. "},
  { id: 8, name: "Gertrude Jekyll - Rose Bushes", price: 15, stock: 5, category: "Bushes", picture: "r2.jpg",description: "The Gertrude Jekyll Rose is one of the most beloved English roses, known for its rich pink, densely petaled blooms and pungent, classic old-rose fragrance."},
  { id: 9, name: "The Pilgrim - Rose Bushes", price: 12, stock: 10, category: "Bushes", picture: "r3.jpg",description:"The Pilgrim Rose is a stunning English climbing rose admired for its soft yellow, fully double blooms and perfectly symmetrical rosette shape." },
  { id: 10, name: "Etoile de Hollande - Rose Bushes", price: 8, stock: 12, category: "Bushes", picture: "r4.jpg",description:"The Etoile de Hollande Rose is a classic climbing hybrid tea rose, famous for its deep crimson-red, velvety petals and strong fragrance." }
];

// Toast message
function showToast(message) {
  const toastContainer = document.getElementById("toast-container");//toast conteineris
  const toast = document.createElement("div");
  toast.className = "toast show";//css
  toast.textContent = message;// Set the visible message text inside the toast

  toastContainer.appendChild(toast);// padaro maza konteineri

  setTimeout(() => {// automaticall hide masage is 3s
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);// remove from DOM
  }, 3000);
}

// Add product to basket
function addToBasket(id) {// Get the current basket from localStorage, or use an empty array if it doesn't exist
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let product = flowers.find((p) => p.id === id);//finde the flowes by id

  if (product.stock > 0) {// check if the product is in stock
    let basketItem = basket.find((item) => item.id === id);
    if (basketItem) {
      basketItem.quantity++;// If product already exists in the basket, increase its quantity
    } else {// If product is not in the basket, add it with quantity set to 1
      basket.push({ ...product, quantity: 1 });
    }
    product.stock--;//Decrease product stock by 1 since one is being added to the basket
    localStorage.setItem("basket", JSON.stringify(basket));// Save the updated basket 
    updateflowers();// ubdait stok
    updateBasketCount();// ubdait basket icon on nav
    showToast(`✅ "${product.name}" added to the basket!`);// Show a toast that the product was adde
  } else {
    showToast(`❌ "${product.name}" is out of stock!`);// If out of stock, show an error toast
  }
}

// Update product list UI
function updateflowers() {
  const categories = {
    Bulbs: "Tulips-flowers",
    Tubers: "Dahlias-flowers",
    Bushes:  "Roses-flowers",
  };

  // Clear existing flower display
  Object.values(categories).forEach(
    (id) => (document.getElementById(id).innerHTML = "")// Empty each section
  );

  // Loop through the flower array
  flowers.forEach((product) => {// Add a class to style this product card
    const productElement = document.createElement("div");// in the baskit new div
    productElement.className = "product";

    let imageTag = `<img src="${product.picture}" alt="${product.name}" style="width:100%; border-radius:5px;">`;
// Create the HTML for the product image
    let buttonDisabled = product.stock === 0 ? "disabled" : ""; // Determine if the "Add to Basket" button should be disabled
    let buttonText = product.stock === 0 ? "Out of Stock" : "Add to Basket";// Set button text based on stock availability

    productElement.innerHTML = `
      ${imageTag}<!-- Display the product image -->
      <h3>${product.name}</h3><!-- Show the product name -->
      <p aria-label="Flower description: ${product.description}">Description: ${product.description}</p>
      <p>Price: £${product.price}</p><!-- Show the product price -->
      <p>Stock: ${product.stock}</p><!-- Show how many items are in stock -->
      <button onclick="addToBasket(${product.id})" ${buttonDisabled} aria-label="Add ${product.name} to Basket">${buttonText}</button>
    `;
    //utton text: "Add to Basket" or "Out of Stock
    document.getElementById(categories[product.category])
            .appendChild(productElement);
  });
}

// Update the basket count in the top nav
function updateBasketCount() {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];   // Get the current basket from Storage, or use an empty array if nothing is stored
  let totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);// Calculate the total number of items by summing the quantity of each product in the basket
  document.getElementById("basket-count").textContent = totalItems;// Display the total number in the basket counter element in the nav bar
}

// Track "saved" items in the nav
function updateSavedCount() {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];  // Get the list of saved items from Storage, or use an empty array if it's empty
  let totalSaved = saved.reduce((sum, item) => sum + item.quantity, 0); // Calculate total number of saved items by summing up their quantities
  document.getElementById("saved-count").textContent = totalSaved;// Display the saved count in the nav element with id "saved-count"
}

//=======================================================
// Basket Modal
//=======================================================
let lastFocusedElement = null;
//==========
//kybord navigashan
//============
function openBasket() {// Function to open the basket modal
  const modal = document.getElementById("basket-modalinis");// Get the modal element by its ID
  modal.style.display = "block";//display css
  updateBasket();
  lastFocusedElement = document.activeElement;// Save the element that had focus before the modal opened
  modal.focus();// Move keyboard focus

  document.addEventListener("keydown", handleBasketKeydown);// Add a keydown event listener to handle keyboard interactions (like ESC key)
}

function closeBasket() {//close the basket modal
  document.getElementById("basket-modalinis").style.display = "none";

  document.removeEventListener("keydown", handleBasketKeydown);

  if (lastFocusedElement) {//restor focus last elements 
    lastFocusedElement.focus();
  }
}

function handleBasketKeydown(e) {// handle keyboard input while modal is open
  if (e.key === "Escape") {// If the pressed key is Escape
    closeBasket();// Close the basket modal
  }
}

function updateBasket() {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];// take current table or empty table
  let basketElement = document.getElementById("basket");//DOM element wher where basket items will be displayed
  basketElement.innerHTML = "";// Clear any existing content inside the basket container

  let totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);//total number
  let totalCost = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);//total cost of all items in the basket

  basket.forEach((item) => {
    // Wrap text and buttons in separate divs with your new CSS classes
    let itemElement = document.createElement("div");
    itemElement.classList.add("basket-item"); // new class
  
    itemElement.innerHTML = `
      <div class="basket-item-details">
      ${item.quantity}x ${item.name} - £${(item.price * item.quantity).toFixed(2)}<!-- Show quantity and total price -->
    </div>
    <div class="basket-item-buttons"><!-- Container for action buttons -->
      <button onclick="increaseFromBasket(${item.id})" aria-label="Add one more ${item.name} to Basket">+</button><!-- Add one more -->
      <button onclick="removeFromBasket(${item.id})" aria-label="Remove ${item.name} from Basket">-</button>      <!-- Remove one  -->
      <button onclick="saveForLater(${item.id})" aria-label="Save ${item.name} for Later">Save for Later</button> <!-- Save item -->
    </div>
    `;
  
    basketElement.appendChild(itemElement);// Append the constructed item element into the basket container in the modal
  });

  document.getElementById("total-items").textContent = totalItems;// Update the Total Items display in the modal footer
  document.getElementById("total-cost").textContent = totalCost.toFixed(2);//Total Cost display in the modal footer
  updateflowers();// Refresh product list on the page
}

function increaseFromBasket(id) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let product = flowers.find(p => p.id === id);// Find the matching product in the flowers array by ID
  let basketItem = basket.find(item => item.id === id);// Find the item in the basket by ID
  if (product && product.stock > 0 && basketItem) {// in the baskit going if is in stock
    basketItem.quantity++;// add quantity
    product.stock--;// Decrease available stock
    localStorage.setItem("basket", JSON.stringify(basket));// Save the updated basket back
    updateBasket();
    updateBasketCount();
    updateflowers();
    showToast(`✅ Increased quantity for "${product.name}"`);
  } else {
    showToast(`❌ "${product.name}" is out of stock!`);
  }
}


function removeFromBasket(id) {// Function to remove one unit of a product from the basket (or remove it completely if only one left)
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let index = basket.findIndex((item) => item.id === id);// Find the index of the item in the basket based on its ID

  if (index !== -1) {// Proceed only if the item exists in the basket
    let item = basket[index];
    if (item.quantity > 1) {//more than one of the item is in the basket, decrease the quantity
      item.quantity--;
    } else {
      basket.splice(index, 1);
    }
    let product = flowers.find((p) => p.id === id); // Find the corresponding product in the main 
    if (product) {// If the evebal, restore one unit of stock

      product.stock++;
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    updateBasket();
    updateBasketCount();
    updateflowers();
    showToast(`🗑️ "${item.name}" removed from the basket!`);
  }
}

//=======================================================
// Save for Later logic
//=======================================================
function saveForLater(id) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let saved  = JSON.parse(localStorage.getItem("saved"))  || [];
  let index  = basket.findIndex(item => item.id === id);

  if (index !== -1) {// If the item exists in the basket
    let item = basket[index];
    basket.splice(index, 1);

    // restore stock, since not purchasing
    let product = flowers.find(p => p.id === id);// Restore the stock of the product since it's not being purchased now
    if (product) {
      product.stock += item.quantity;// Add back the quantity to stock
    }

    saved.push(item);// Add the item to the saved 
    // Save updated basket 
    localStorage.setItem("basket", JSON.stringify(basket));
    localStorage.setItem("saved",  JSON.stringify(saved));

    updateBasket();
    updateBasketCount();
    updateSavedCount();
    updateflowers();
    showToast(`💾 "${item.name}" saved for later!`);
  }
}

function moveToBasket(id) {//move an item from the "Saved for Later"
  let saved  = JSON.parse(localStorage.getItem("saved"))  || [];
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let index  = saved.findIndex(item => item.id === id);

  if (index !== -1) {
    // Proceed only if the item exists in the saved list
    let item    = saved[index];
    let product = flowers.find((p) => p.id === id);

    if (product && product.stock >= item.quantity) {// Check if there's enough stock to move the item back to the basket
      product.stock -= item.quantity;

      let existing = basket.find(x => x.id === id);// fide flower by id
      if (existing) {
        existing.quantity += item.quantity;// patirina ar yra uztektinai 
      } else {
        basket.push({ ...product, quantity: item.quantity }); // If not, add it as a new item to the basket
      }
      saved.splice(index, 1);// remove fro save lis

      // Save updated basket and saved lists back to web
      localStorage.setItem("basket", JSON.stringify(basket));
      localStorage.setItem("saved",  JSON.stringify(saved));
      updateSavedModal();
      updateBasket();
      updateBasketCount();
      updateSavedCount();
      updateflowers();
      showToast(`🛒 "${item.name}" moved back to the basket!`);
    } else {
      showToast(`❌ Not enough stock to move "${item.name}" to basket.`);
    }
  }
}

function removeFromSaved(id) {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  let index = saved.findIndex(item => item.id === id);
  if (index !== -1) {
    let item = saved[index];
    saved.splice(index, 1);
    localStorage.setItem("saved", JSON.stringify(saved));
    updateSavedModal(); 
    updateSavedCount(); 
    showToast(`🗑️ "${item.name}" removed from Saved for Later!`);
  }
}

//=======================================================
// Saved Modal
//=======================================================
function openSaved() {
  updateSavedModal();
  const savedModal = document.getElementById("saved-modalinis"); // Get the modal element by ID
  savedModal.style.display = "block";// Make the modal visible
  lastFocusedElement = document.activeElement;// Save the last focused element 
  savedModal.focus();//keyboard 
  document.addEventListener("keydown", handleSavedKeydown);//keyboard ecs key
}

function closeSaved() {
  document.getElementById("saved-modalinis").style.display = "none";
  document.removeEventListener("keydown", handleSavedKeydown);
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function handleSavedKeydown(e) {
  if (e.key === "Escape") {
    closeSaved();
  }
}

function updateSavedModal() {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  let container = document.getElementById("saved-later");// Get the DOM element where saved 
  container.innerHTML = "";

  saved.forEach(item => { // Loop through each item in the saved array
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="basket-item-details">
      ${item.quantity}x ${item.name} - £${(item.price * item.quantity).toFixed(2)}
      </div>
      <div class="Update-basket-item-buttons">
      <button onclick="moveToBasket(${item.id})" aria-label="Move ${item.name} to Basket">Move to Basket</button>
      <button onclick="removeFromSaved(${item.id})" aria-label="Remove ${item.name} from Saved for Later">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });
}

//=======================================================
// Summary & Checkout
//=======================================================
function openSummary() {
  updateSummary();
  document.getElementById("summary-modalinis").style.display = "flex";
  closeBasket();
}

function closeSummary() {
  document.getElementById("summary-modalinis").style.display = "none";
}

function updateSummary() {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  const tableBody = document.getElementById("summary-table-body");
  tableBody.innerHTML = "";

  let totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);// Calculate total cost of all items
  let totalCost = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);// // Loop through each basket item to create a table row

  basket.forEach((item) => {
    let row = document.createElement("tr");// Create a new table row
    let itemCell  = document.createElement("td");// Cell for item name
    let qtyCell   = document.createElement("td");// Cell for quantity
    let totalCell = document.createElement("td");// Cell for total price

    itemCell.textContent  = item.name; // Set product name
    qtyCell.textContent   = item.quantity;// Set product quantity
    totalCell.textContent = (item.price * item.quantity).toFixed(2);// Set total price for this item

    row.appendChild(itemCell);// Add item name to row
    row.appendChild(qtyCell);// Add quantity to row
    row.appendChild(totalCell);// Add total price to row
    tableBody.appendChild(row);// Append row to summary table
  });

  document.getElementById("summary-total-items").textContent = totalItems;
  document.getElementById("summary-total-cost").textContent  = totalCost.toFixed(2);
}

function proceedToPayment() {
  closeSummary();// Close the summary modal
  checkout(); // Open the checkout modal
}

function checkout() {
  document.getElementById("checkout-modalinis").style.display = "flex";// Show the checkout modal
  lastFocusedElement = document.activeElement;// focused accessibility
  document.addEventListener("keydown", handleCheckoutKeydown);//keydown
}

function closeCheckout() {
  document.getElementById("checkout-modalinis").style.display = "none";
}

function handleCheckoutKeydown(e) {
  if (e.key === "Escape") {//checkout modal
    closeCheckout();
  }
}

document
  .getElementById("checkout-form")//get id 
  .addEventListener("submit", function (event) {
    event.preventDefault();// Prevent actual form submission

    alert("Processing payment...");
    setTimeout(() => {
      //coforrm mesage
      alert("🌟 Your order has been placed successfully! Thank you for choosing us!");
      localStorage.removeItem("basket");
      updateBasket();
      updateBasketCount();
      closeCheckout();
    }, 2000); // Delay of 2 seconds
  });

// Initialize everything
updateflowers();
updateBasketCount();
updateSavedCount(); // so nav shows saved items

