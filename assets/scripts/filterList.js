import applyFilter from "./filter.js";

// Função responsável por adicionar os listeners dos botões de filtro e limpar
export default function filter() {
  document.addEventListener("cardsCreated", () => {
    const skillItem = document.querySelectorAll(".job__skill-item");
    const filterContainer = document.getElementById("filter-list");
    const filterSection = document.getElementById("filter-container");
    const btnClear = document.getElementById("clear-button");
    const filterList = [];

    // Adicione um event listener para cada botão de filtro
    skillItem.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const itemValue = e.target.textContent;
        filterSection.classList.remove("--hidden");

        // Cria novos cards e verifica os existentes afim de impossibilitar duplicidade
        if (!filterList.includes(itemValue)) {
          const filterCard = document.createElement("li");
          filterCard.className = "filter__card";
          filterCard.setAttribute("id", index);
          filterContainer.appendChild(filterCard);

          const filterSkill = document.createElement("p");
          filterSkill.textContent = itemValue;
          filterSkill.className = "filter__value";
          filterCard.appendChild(filterSkill);

          const removeFilter = document.createElement("button");
          removeFilter.className = "filter__remove";
          filterCard.appendChild(removeFilter);

          const removeIcon = document.createElement("img");
          removeIcon.src = "../assets/images/icon-remove.svg";
          removeIcon.alt = "Close icon";
          removeIcon.className = "remove__icon";
          removeFilter.appendChild(removeIcon);

          filterList.push(itemValue);

          // Adicione um listener para o botão que exclui o filtro pai
          removeFilter.addEventListener("click", () => {
            filterCard.remove();
            filterList.splice(filterList.indexOf(itemValue), 1);

            if (filterList.length === 0) {
              filterSection.classList.add("--hidden");
            }

            applyFilter(filterList);
          });
        }

        applyFilter(filterList);
      });
    });

    // Adicione um listener para o botão que exclui todos os filtros
    btnClear.addEventListener("click", () => {
      filterList.length = 0;
      const filterCards = document.querySelectorAll(".filter__card");
      filterCards.forEach((card) => {
        card.remove();
      });

      filterSection.classList.add("--hidden");
      applyFilter(filterList);
    });
  });
}
