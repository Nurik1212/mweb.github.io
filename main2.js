        // Функция для обновления таблицы результатов из localStorage
        function updateEntTable() {
            const results = JSON.parse(localStorage.getItem('entResults')) || [];
            const tableBody = document.getElementById("entResultsTable");
            tableBody.innerHTML = ''; // Очистить таблицу перед заполнением

            results.forEach((result, index) => {
                const totalScore = result.mathLitScore + result.readingScore + result.historyScore + result.mathScore + result.informaticsScore;
                const tableRow = document.createElement('tr');
                
                tableRow.innerHTML = `
                    <td>${result.studentName}</td>
                    <td>${result.mathLitScore}</td>
                    <td>${result.readingScore}</td>
                    <td>${result.historyScore}</td>
                    <td>${result.mathScore}</td>
                    <td>${result.informaticsScore}</td>
                    <td>${totalScore}</td>
                    <td><button class="delete-btn" data-index="${index}">Удалить</button></td>
                `;
                
                tableBody.appendChild(tableRow);
            });

            // Добавляем обработчики событий для кнопок удаления
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    deleteStudent(index);
                });
            });
        }

        // Функция для удаления ученика по индексу
        function deleteStudent(index) {
            const results = JSON.parse(localStorage.getItem('entResults')) || [];
            results.splice(index, 1); // Удаляем ученика из массива
            localStorage.setItem('entResults', JSON.stringify(results));
            updateEntTable(); // Обновляем таблицу
        }

        // Обработчик формы для добавления результатов ЕНТ
        document.getElementById("entResultsForm").addEventListener("submit", function(event) {
            event.preventDefault();

            const studentName = document.getElementById("studentName").value;
            const mathLitScore = parseInt(document.getElementById("mathLitScore").value);
            const readingScore = parseInt(document.getElementById("readingScore").value);
            const historyScore = parseInt(document.getElementById("historyScore").value);
            const mathScore = parseInt(document.getElementById("mathScore").value);
            const informaticsScore = parseInt(document.getElementById("informaticsScore").value);

            // Сохраняем результаты в localStorage
            const results = JSON.parse(localStorage.getItem('entResults')) || [];
            results.push({ studentName, mathLitScore, readingScore, historyScore, mathScore, informaticsScore });
            localStorage.setItem('entResults', JSON.stringify(results));

            // Обновляем таблицу
            updateEntTable();

            // Очистка полей формы
            document.getElementById("entResultsForm").reset();
        });

        // Обработчик для очистки результатов
        document.getElementById("clearEntResultsBtn").addEventListener("click", function() {
            localStorage.removeItem('entResults');
            updateEntTable(); // Обновляем таблицу, чтобы отобразить пустой список
        });

        // Загружаем таблицу при загрузке страницы
        window.onload = updateEntTable;