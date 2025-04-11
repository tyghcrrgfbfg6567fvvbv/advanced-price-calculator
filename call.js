// Dropdown toggle functionality
document.querySelectorAll('.custom-select').forEach(select => {
  const trigger = select.querySelector('.select-trigger');
  const options = select.querySelector('.select-options');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.select-options').forEach(opt => {
      if (opt !== options) {
        opt.style.display = 'none';
        opt.classList.remove('active');
      }
    });

    const isOpen = options.classList.contains('active');
    options.style.display = isOpen ? 'none' : 'block';
    options.classList.toggle('active', !isOpen);
    trigger.classList.toggle('active', !isOpen);
  });

  options.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
      trigger.textContent = option.textContent;
      select.dataset.value = option.dataset.value;
      options.style.display = 'none';
      options.classList.remove('active');
      trigger.classList.remove('active');
    });
  });

  trigger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      trigger.click();
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', e => {
  document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.select-trigger');
    const options = select.querySelector('.select-options');
    if (!select.contains(e.target)) {
      options.style.display = 'none';
      options.classList.remove('active');
      trigger.classList.remove('active');
    }
  });
});

// Calculator logic
document.getElementById("calculate-button").addEventListener("click", function () {
  const weight = parseFloat(document.getElementById("weight").value);
  const weightUnit = document.getElementById("weight-unit").dataset.value;
  const weightUnitDisplay = document.getElementById("weight-unit").querySelector('.select-trigger').textContent.trim();
  const price = parseFloat(document.getElementById("price").value);
  const calculationType = document.getElementById("calculation-type").dataset.value;
  const inputValue = parseFloat(document.getElementById("input-value").value);
  const inputUnit = document.getElementById("input-unit").dataset.value;
  const inputUnitDisplay = document.getElementById("input-unit").querySelector('.select-trigger').textContent.trim();
  const resultDiv = document.getElementById("result");

  // Validation (silent)
  if (isNaN(weight) || isNaN(price) || isNaN(inputValue)) return;
  if (weight <= 0 || price <= 0 || inputValue <= 0) return;
  if (!['kg', 'grams'].includes(weightUnit)) return;
  if (!['price-per-quantity', 'quantity-per-price'].includes(calculationType)) return;
  if (!['kg', 'grams', 'price'].includes(inputUnit)) return;

  const totalWeightInGrams = weightUnit === "kg" ? weight * 1000 : weight;
  const pricePerGram = price / totalWeightInGrams;
  let explanation;

  if (calculationType === "price-per-quantity") {
    if (inputUnit === "price") return;
    const inputWeightInGrams = inputUnit === "kg" ? inputValue * 1000 : inputValue;
    const result = inputWeightInGrams * pricePerGram;
    explanation = `If ${weight.toFixed(2)} ${weightUnitDisplay} costs ₹${price.toFixed(2)}, then the cost for ${inputValue.toFixed(2)} ${inputUnitDisplay} is ₹${result.toFixed(2)}.`;
  } else if (calculationType === "quantity-per-price") {
    if (inputUnit !== "price") return;
    const gramsForPrice = inputValue / pricePerGram;
    const kgForPrice = gramsForPrice / 1000;
    explanation = `If ${weight.toFixed(2)} ${weightUnitDisplay} costs ₹${price.toFixed(2)}, then for ₹${inputValue.toFixed(2)}, you get ${kgForPrice.toFixed(3)} kg (${gramsForPrice.toFixed(0)} g).`;
  }

  resultDiv.innerText = explanation;
});
                            
