// Домашнее задание к лекции «Классы в JavaScript»

class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (value < 0) {
      this._state = 0;
    } else if (value > 100) {
      this._state = 100;
    } else {
      this._state = value;
    }
  }

  fix() {
    this.state = this.state * 1.5;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const foundBook = this.books.find((book) => book[type] === value);
    return foundBook || null;
  }

  giveBookByName(bookName) {
    const bookIndex = this.books.findIndex((book) => book.name === bookName);

    if (bookIndex === -1) {
      return null;
    }

    return this.books.splice(bookIndex, 1)[0];
  }
}

// Дополнительное задание из student_tests.js.
class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark < 1 || mark > 5) {
      return;
    }

    if (!this.marks[subject]) {
      this.marks[subject] = [];
    }

    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    const subjectMarks = this.marks[subject];

    if (!subjectMarks || subjectMarks.length === 0) {
      return 0;
    }

    const total = subjectMarks.reduce((sum, mark) => sum + mark, 0);
    return total / subjectMarks.length;
  }

  getAverage() {
    const allMarks = Object.values(this.marks).flat();

    if (allMarks.length === 0) {
      return 0;
    }

    const total = allMarks.reduce((sum, mark) => sum + mark, 0);
    return total / allMarks.length;
  }
}
