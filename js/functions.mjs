function addCourse(event) {
  event.preventDefault();
  if (event.target.classList.contains("add-cart")) {
    const selectedCourse = event.target.parentElement.parentElement;
    readCourseData(selectedCourse);
  }
}

function readCourseData(course) {
    const courseInfo = {
        id: course.querySelector('a').getAttribute('data-id'),
        image: course.querySelector('img').src,
        price: course.querySelector('.price span').textContent,
        quantity: 1,
        title: course.querySelector('h4').textContent
    }
}

export { addCourse };
