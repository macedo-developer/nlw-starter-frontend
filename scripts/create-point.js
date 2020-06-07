document.querySelector("select[name=uf]").addEventListener("change", getCities);

function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((response) => response.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUfs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  fetch(url)
    .then((response) => response.json())
    .then((cities) => {
      citySelect.innerHTML = "";
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}