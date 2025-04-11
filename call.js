// Dropdown toggle functionality
document.querySelectorAll('.custom-select').forEach(select => {
  const trigger = select.querySelector('.select-trigger');
  const options = select.querySelector('.select-options');

  if (!trigger || !options) {
    console.error('Dropdown structure is incorrect.');
    return;
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();

    // Close all other dropdowns
    document.querySelectorAll('.select-options').forEach(opt => {
      if (opt !== options) {
        opt.style.display = 'none';
        opt.classList.remove('active');
      }
    });

    // Toggle the current dropdown
    const isOpen = options.classList.contains('active');
    options.style.display = isOpen ? 'none' : 'block';
    options.classList.toggle('active', !isOpen);
    trigger.classList.toggle('active', !isOpen);
  });

  // Handle option selection
  options.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
      trigger.textContent = option.textContent;
      select.dataset.value = option.dataset.value;
      options.style.display = 'none';
      options.classList.remove('active');
      trigger.classList.remove('active');
    });
  });

  // Handle keyboard accessibility
  trigger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      trigger.click();
    }
  });
});

// Calculate button functionality
document.getElementById("calculate-button").addEventListener("click", function () {
  const weight = parseFloat(document.getElementById("weight")?.value);
  const weightUnit = document.getElementById("weight-unit")?.value;
  const price = parseFloat(document.getElementById("price")?.value);
  const calculationType = document.getElementById("calculation-type")?.value;
  const inputValue = parseFloat(document.getElementById("input-value")?.value);
  const inputUnit = document.getElementById("input-unit")?.value;
  const resultDiv = document.getElementById("result");

  // Validate inputs
  if (isNaN(weight) || isNaN(price) || isNaN(inputValue)) {
    resultDiv.innerText = "Please enter valid numeric inputs.";
    return;
  }
  if (!weightUnit || !calculationType || !inputUnit) {
    resultDiv.innerText = "Please select all dropdown options.";
    return;
  }

  // Convert weight to grams if necessary
  const totalWeightInGrams = weightUnit === "kg" ? weight * 1000 : weight;
  if (totalWeightInGrams <= 0 || price <= 0) {
    resultDiv.innerText = "Weight and price must be greater than 0.";
    return;
  }

  const pricePerGram = price / totalWeightInGrams;
  let result, explanation;

  if (calculationType === "price-per-quantity") {
    // Input value is weight (kg or grams)
    const inputWeightInGrams =
      inputUnit === "kg" ? inputValue * 1000 : inputValue;

    if (inputWeightInGrams <= 0) {
      resultDiv.innerText = "Input weight must be greater than 0.";
      return;
    }

    result = inputWeightInGrams * pricePerGram;
    explanation = `If ${weight}${weightUnit} costs ₹${price}, then the cost for ${inputValue} ${inputUnit} is ₹${result.toFixed(
      2
    )}.`;
  } else if (calculationType === "quantity-per-price") {
    // Input value is price
    if (inputUnit !== "price") {
      resultDiv.innerText =
        "For weight calculation, the input unit must be set to 'price'.";
      return;
    }

    if (inputValue <= 0) {
      resultDiv.innerText = "Input price must be greater than 0.";
      return;
    }

    const gramsForPrice = inputValue / pricePerGram;
    const kgForPrice = gramsForPrice / 1000;

    explanation = `If ${weight}${weightUnit} costs ₹${price}, then for ₹${inputValue}, you will get ${kgForPrice.toFixed(
      3
    )} kg (${gramsForPrice.toFixed(0)} g).`;
  } else {
    resultDiv.innerText = "Invalid calculation type selected.";
    return;
  }

  resultDiv.innerText = explanation;
});
