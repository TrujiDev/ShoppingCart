import { listCourses } from "./variables.mjs";
import { addCourse } from "./functions.mjs";

loadEventListeners();

function loadEventListeners() {
  listCourses.addEventListener("click", addCourse);
}
