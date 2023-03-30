export default function applyFilter(filterList) {
  const jobCards = document.querySelectorAll(".job__card");

  jobCards.forEach((card) => {
    const jobSkills = card.querySelectorAll(".job__skill-item");
    let shouldShow = true;

    // Itera sobre cada valor do filtro selecionado
    filterList.forEach((filterValue) => {
      let skillFound = false;

      // Itera sobre cada habilidade do card e verifica se a habilidade é igual ao valor do(s) filtro(s) selecionado(s)
      jobSkills.forEach((skill) => {
        if (skill.textContent === filterValue) {
          skillFound = true;
        }
      });

      // Se a habilidade não for encontrada no card, não deve ser exibido
      if (!skillFound) {
        shouldShow = false;
      }
    });

    if (shouldShow) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
