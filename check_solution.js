
const fs = require("fs");
const vm = require("vm");
const code = fs.readFileSync("task.js", "utf8");
vm.runInThisContext(code);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const library = new Library("Библиотека имени Ленина");
library.addBook(new DetectiveBook(
  "Артур Конан Дойл",
  "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
  2019,
  1008
));
library.addBook(new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168));
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

assert(library.findBookBy("releaseDate", 1924).name === "Мурзилка", "Поиск журнала не прошёл");
assert(library.findBookBy("releaseDate", 1919) === null, "Не должен быть найден отсутствующий экземпляр");

const issuedBook = library.giveBookByName("Машина времени");
assert(issuedBook !== null && library.books.length === 3, "Выдача книги не прошла");

issuedBook.state = 50;
issuedBook.fix();
assert(issuedBook.state === 75, "Восстановление книги не прошло");

library.addBook(issuedBook);
assert(library.books.length === 4, "Восстановленная книга не принята обратно");

const tooDamaged = new Magazine("Повреждённый журнал", 1919, 20);
tooDamaged.state = 30;
library.addBook(tooDamaged);
assert(library.findBookBy("name", "Повреждённый журнал") === null, "Книга c state=30 не должна добавляться");

const student = new Student("Иван Петров");
student.addMark(3, "математика");
student.addMark(5, "математика");
student.addMark(5, "история");
student.addMark(5, "история");
assert(student.getAverageBySubject("математика") === 4, "Среднее по предмету вычислено неверно");
assert(student.getAverage() === 4.5, "Общее среднее вычислено неверно");

console.log("Все проверки пройдены.");
