// Константы для тарифов (объект - это требование доп. задания)
const TARIF_LIMITS = {
    electricityLimit: 100, // Порог в 100 кВт/ч
    electricityLowPrice: 0.15,
    electricityHighPrice: 0.25,
    waterLimit: 5, // Порог в 5 м3
    waterLowPrice: 1.50,
    waterHighPrice: 2.80
};

// Ищем элементы в DOM
const calculateBtn = document.getElementById('calculate-btn');
const resultArea = document.getElementById('result-area');

// Добавляем обработчик события на кнопку
calculateBtn.addEventListener('click', function() {
    // Считываем значения из полей ввода
    const electricityValue = parseFloat(document.getElementById('electricity').value);
    const waterValue = parseFloat(document.getElementById('water').value);

    // 1. Валидация (Доп. задание)
    if (isNaN(electricityValue) || isNaN(waterValue) || electricityValue < 0 || waterValue < 0) {
        resultArea.innerHTML = "Lūdzu, ievadiet derīgus pozitīvus skaitļus!";
        resultArea.classList.add('error');
        return;
    }

    resultArea.classList.remove('error');

    // 2. Логика расчета Электричества
    let electricityTotal = 0;
    if (electricityValue <= TARIF_LIMITS.electricityLimit) {
        electricityTotal = electricityValue * TARIF_LIMITS.electricityLowPrice;
    } else {
        electricityTotal = (TARIF_LIMITS.electricityLimit * TARIF_LIMITS.electricityLowPrice) + 
                           ((electricityValue - TARIF_LIMITS.electricityLimit) * TARIF_LIMITS.electricityHighPrice);
    }

    // 3. Логика расчета Воды
    let waterTotal = 0;
    if (waterValue <= TARIF_LIMITS.waterLimit) {
        waterTotal = waterValue * TARIF_LIMITS.waterLowPrice;
    } else {
        waterTotal = (TARIF_LIMITS.waterLimit * TARIF_LIMITS.waterLowPrice) + 
                     ((waterValue - TARIF_LIMITS.waterLimit) * TARIF_LIMITS.waterHighPrice);
    }

    const grandTotal = electricityTotal + waterTotal;

    // 4. Динамическое отображение результата (без перезагрузки)
    resultArea.innerHTML = `
        <strong>Kopā apmaksai: ${grandTotal.toFixed(2)} €</strong><br>
        <small>Elektrība: ${electricityTotal.toFixed(2)} € | Ūdens: ${waterTotal.toFixed(2)} €</small>
    `;
    
    // Доп. задание: динамическое изменение стиля
    resultArea.style.borderLeftColor = grandTotal > 50 ? "#e67e22" : "#27ae60";
});