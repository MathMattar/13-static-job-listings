import getData from "./connectJson.js";

const jobList = document.getElementById("job-list");

async function createCard() {
  const data = await getData();

  data.forEach((job) => {
    const li = document.createElement("li");
    li.className = "job__card";

    const divContainer = document.createElement("div");
    divContainer.className = "job__container";
    li.appendChild(divContainer);

    const img = document.createElement("img");
    img.src = job.logo;
    img.alt = job.company;
    img.className = "job__logo";
    divContainer.appendChild(img);

    const divData = document.createElement("div");
    divData.className = "job__data";
    divContainer.appendChild(divData);

    const divInfo = document.createElement("div");
    divInfo.className = "job__info";
    divData.appendChild(divInfo);

    const h2 = document.createElement("h2");
    h2.className = "job__name";
    h2.textContent = job.company;
    divInfo.appendChild(h2);

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

    if (job.new && job.featured) {
      li.classList.add("--border");
    }

    const divDetails = document.createElement("div");
    divDetails.className = "job__datails";
    divData.appendChild(divDetails);

    const h1 = document.createElement("h1");
    h1.className = "job__position";
    h1.textContent = job.position;
    divDetails.appendChild(h1);

    const section = document.createElement("section");
    section.className = "job__featured-container";
    divDetails.appendChild(section);

    const date = document.createElement("p");
    date.className = "job__featured-item";
    date.textContent = job.postedAt;
    section.appendChild(date);

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
    li.appendChild(nav);

    const skillItems = [job.role, job.level, ...job.languages, ...job.tools];

    skillItems.forEach((skill) => {
      const button = document.createElement("button");
      button.setAttribute("type", "button");
      button.className = "job__skill-item";
      button.classList.add(skill);
      button.textContent = skill;
      nav.appendChild(button);
    });

    jobList.appendChild(li);
  });
}

createCard();
