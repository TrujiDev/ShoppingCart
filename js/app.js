const cart = document.querySelector('#cart');
const cartContainer = document.querySelector('#list-cart tbody');
const emptyCartBtn = document.querySelector('#empty-cart');
const listCourses = document.querySelector('#list-courses');

let itemsCart = [];

loadEventListeners();

/**
 * Loads event listeners for the shopping cart application.
 */
function loadEventListeners() {
	listCourses.addEventListener('click', addCourse);

	emptyCartBtn.addEventListener('click', () => {
		itemsCart = [];
		cleanHtml();
	});

	document.addEventListener('DOMContentLoaded', () => {
		itemsCart = JSON.parse(localStorage.getItem('cart')) || [];
		htmlCart();
	});
}

/**
 * Adds a course to the shopping cart.
 * @param {Event} event - The event object triggered by the user action.
 */
function addCourse(event) {
	event.preventDefault();
	if (event.target.classList.contains('add-cart')) {
		const selectedCourse = event.target.parentElement.parentElement;
		readCourseData(selectedCourse);
	}
}

/**
 * Deletes a course from the shopping cart.
 * @param {Event} event - The event object triggered by the delete button click.
 */
function deleteCourse(event) {
	if (event.target.classList.contains('delete-course')) {
		const courseId = event.target.getAttribute('data-id');

		itemsCart = itemsCart.filter(course => course.id !== courseId);

		htmlCart();
	}
}

/**
 * Reads course data and updates the shopping cart.
 * @param {HTMLElement} course - The course element to read data from.
 */
function readCourseData(course) {
	const courseInfo = {
		id: course.querySelector('a').getAttribute('data-id'),
		image: course.querySelector('img').src,
		price: course.querySelector('.price span').textContent,
		quantity: 1,
		title: course.querySelector('h4').textContent,
	};

	const exist = itemsCart.some(course => course.id === courseInfo.id);

	if (exist) {
		const courses = itemsCart.map(course => {
			if (course.id === courseInfo.id) {
				course.quantity++;
				return course;
			} else {
				return course;
			}
		});

		itemsCart = [...courses];
	} else {
		itemsCart = [...itemsCart, courseInfo];
	}

	htmlCart();
}

/**
 * Renders the items in the shopping cart as HTML.
 */
function htmlCart() {
	cleanHtml();

	itemsCart.forEach(course => {
		const { image, title, price, quantity, id } = course;
		const row = document.createElement('tr');
		row.innerHTML = `
      <td><img src="${image}" width="150"></td>
      <td>${title}</td>
      <td>${price}</td>
      <td>${quantity}</td>
      <td><a href="#" class="delete-course" data-id="${id}">X</a></td>
    `;

		cartContainer.appendChild(row);
	});

	syncstorage();
}

/**
 * Syncs the items in the cart with the local storage.
 */
function syncstorage() {
	localStorage.setItem('cart', JSON.stringify(itemsCart));
}

/**
 * Removes all child elements from the cart container.
 */
function cleanHtml() {
	while (cartContainer.firstChild) {
		cartContainer.removeChild(cartContainer.firstChild);
	}
}
