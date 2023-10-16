function addCourse(event) {
  event.preventDefault();
  if (event.target.classList.contains("add-cart")) {
    console.log(event.target);
  }
}

export { addCourse };
