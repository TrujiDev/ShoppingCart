// Select DOM elements and assign them to variables
const cart = document.querySelector("#cart"); // Get the element with the ID "cart"
const cartContainer = document.querySelector("#list-cart tbody"); // Get the tbody within the element with the ID "list-cart"
const emptyCartBtn = document.querySelector("#empty-cart"); // Get the button with the ID "empty-cart"
const listCourses = document.querySelector("#list-courses"); // Get the element with the ID "list-courses"

// Create an array to store cart items
let itemsCart = [];

// Call the function to load event listeners
loadEventListeners();

function loadEventListeners() {
  // Listen for click events on the list of courses
  listCourses.addEventListener("click", addCourse);

  // Listen for click events on the cart
  cart.addEventListener("click", deleteCourse);

  // Listen for click events on the empty cart button
  emptyCartBtn.addEventListener("click", () => {
    itemsCart = []; // Empty the cart items array
    cleanHtml(); // Call the function to clear the cart content in the DOM
  });
}

// Function to add a course to the cart
function addCourse(event) {
  event.preventDefault();
  if (event.target.classList.contains("add-cart")) {
    const selectedCourse = event.target.parentElement.parentElement;
    readCourseData(selectedCourse);
  }
}

// Function to delete a course from the cart
function deleteCourse(event) {
  if (event.target.classList.contains("delete-course")) {
    const courseId = event.target.getAttribute("data-id");

    // Filter out the course with the matching id and update the itemsCart array
    itemsCart = itemsCart.filter((course) => course.id !== courseId);

    // Update the cart content in the DOM
    htmlCart();
  }
}

// Function to read data of a selected course
function readCourseData(course) {
  const courseInfo = {
    id: course.querySelector("a").getAttribute("data-id"),
    image: course.querySelector("img").src,
    price: course.querySelector(".price span").textContent,
    quantity: 1,
    title: course.querySelector("h4").textContent,
  };

  // Check if the selected course already exists in the cart
  const exist = itemsCart.some((course) => course.id === courseInfo.id);

  if (exist) {
    // If it exists, increment the quantity of the existing course
    const courses = itemsCart.map((course) => {
      if (course.id === courseInfo.id) {
        course.quantity++;
        return course;
      } else {
        return course;
      }
    });

    // Update the itemsCart array with the updated quantities
    itemsCart = [...courses];
  } else {
    // If it doesn't exist, add the course to the itemsCart array
    itemsCart = [...itemsCart, courseInfo];
  }

  // Update the cart content in the DOM
  htmlCart();
}

// Function to update the cart content in the DOM
function htmlCart() {
  // Clear the existing cart content in the DOM
  cleanHtml();

  // Iterate through the itemsCart array and update the cart content in the DOM
  itemsCart.forEach((course) => {
    const { image, title, price, quantity, id } = course;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${image}" width="150"></td>
      <td>${title}</td>
      <td>${price}</td>
      <td>${quantity}</td>
      <td><a href="#" class="delete-course" data-id="${id}">X</a></td>
    `;

    // Append the row to the cartContainer in the DOM
    cartContainer.appendChild(row);
  });
}

// Function to clean the cart content in the DOM
function cleanHtml() {
  // Remove all child elements from the cartContainer in the DOM
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
}
