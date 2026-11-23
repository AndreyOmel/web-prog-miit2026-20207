// Задание 2, вариант 12. Автор: Омельченко А. А.
// Сценарий перестраивает строки таблицы «ТОП-5 учебных дисциплин»
// по нажатии кнопок «Сортировка по алфавиту» и «Обратный порядок».
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Ссылки на элементы страницы
  const tbody = document.getElementById("top5").tBodies[0];
  const status = document.getElementById("sortStatus");
  const btnSortAlpha = document.getElementById("btnSortAlpha");
  const btnReverse = document.getElementById("btnReverse");

  // Состояние порядка строк (для подписи под кнопками)
  let baseOrder = "исходный";
  let reversed = false;

  // Название дисциплины из второй ячейки строки
  function getName(row) {
    return row.cells[1].textContent.trim();
  }

  // Перестраивает строки tbody в порядке элементов массива rows.
  // appendChild переносит уже существующий узел в конец tbody,
  // поэтому строки не копируются, а только меняют позицию.
  function rebuild(rows) {
    for (const row of rows) {
      tbody.appendChild(row);
    }
  }

  // Обновляет подпись с текущим порядком строк
  function showStatus() {
    status.textContent = "Текущий порядок: " + baseOrder +
      (reversed ? ", в обратном порядке" : "");
  }

  // Обработчик кнопки «Сортировка по алфавиту»
  function sortAlphabetically() {
    const rows = Array.from(tbody.rows);
    rows.sort(function (a, b) {
      return getName(a).localeCompare(getName(b), "ru");
    });
    rebuild(rows);
    baseOrder = "по алфавиту";
    reversed = false;
    showStatus();
  }

  // Обработчик кнопки «Обратный порядок»
  function reverseOrder() {
    const rows = Array.from(tbody.rows);
    rows.reverse();
    rebuild(rows);
    reversed = !reversed;
    showStatus();
  }

  // Назначение обработчиков событий click
  btnSortAlpha.addEventListener("click", sortAlphabetically);
  btnReverse.addEventListener("click", reverseOrder);
});
