import getData from "./connectJson.js";
import filter from "./filterList.js";

const jobContainer = document.getElementById("job-list");

// Função responsável por criar os elementos HTML
async function createCard() {
  const data = await getData();
  const jobList = [];

  // Faz um loop através de cada item da resposta do arquivo JSON
  data.forEach((job, index) => {
    const card = document.createElement("li");
    card.className = "job__card";
    card.setAttribute("id", index);

    const divContainer = document.createElement("div");
    divContainer.className = "job__container";
    card.appendChild(divContainer);

    const logo = document.createElement("img");
    logo.src = job.logo;
    logo.alt = job.company;
    logo.className = "job__logo";
    divContainer.appendChild(logo);

    const divData = document.createElement("div");
    divData.className = "job__data";
    divContainer.appendChild(divData);

    const divInfo = document.createElement("div");
    divInfo.className = "job__info";
    divData.appendChild(divInfo);

    const company = document.createElement("h2");
    company.className = "job__name";
    company.textContent = job.company;
    divInfo.appendChild(company);

    // Verifica de contém e adiciona badges
    if (job.new || job.featured) {
      const sectionBadge = document.createElement("section");
      sectionBadge.className = "job__badge-container";
      divInfo.appendChild(sectionBadge);

      if (job.new) {
        const newBadge = document.createElement("p");
        newBadge.className = "job__badge-item";
        newBadge.textContent = "NEW!";
        sectionBadge.appendChild(newBadge);
      }

      if (job.featured) {
        const featBadge = document.createElement("p");
        featBadge.className = "job__badge-item --feat";
        featBadge.textContent = "FEATURED";
        sectionBadge.appendChild(featBadge);
      }
    }

    // Adiciona borda para destacar as vagas que contém os badges
    if (job.new && job.featured) {
      card.classList.add("--border");
    }

    const divDetails = document.createElement("div");
    divDetails.className = "job__details";
    divData.appendChild(divDetails);

    const position = document.createElement("h1");
    position.className = "job__position";
    position.textContent = job.position;
    divDetails.appendChild(position);

    const section = document.createElement("section");
    section.className = "job__featured-container";
    divDetails.appendChild(section);

    const postDate = document.createElement("p");
    postDate.className = "job__featured-item";
    postDate.textContent = job.postedAt;
    section.appendChild(postDate);

    const divider = document.createElement("p");
    divider.className = "job__featured-item --divider";
    divider.textContent = job.contract;
    section.appendChild(divider);

    const location = document.createElement("p");
    location.className = "job__featured-item";
    location.textContent = job.location;
    section.appendChild(location);

    const nav = document.createElement("nav");
    nav.className = "job__skills-list";
    card.appendChild(nav);

    // Cria uma lista de habilidades necessárias para a vaga
    const skillItems = [job.role, job.level, ...job.languages, ...job.tools];

    // Faz um loop em cada habilidade e cria um botão para cada uma
    skillItems.forEach((skill) => {
      const skillItem = document.createElement("button");
      skillItem.setAttribute("type", "button");
      skillItem.className = "job__skill-item";
      skillItem.textContent = skill;

      nav.appendChild(skillItem);
    });

    jobContainer.appendChild(card);
    jobList.push(card);
  });

  // Cria um novo evento para indicar que os elementos foram criados
  const creationCompleted = new Event("cardsCreated");
  document.dispatchEvent(creationCompleted);
}

createCard();
filter();
