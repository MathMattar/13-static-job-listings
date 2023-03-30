export function filter() {
  document.addEventListener("cardsCreated", () => {
    const btns = document.querySelectorAll(".job__skill-item");
    const filterContainer = document.getElementById("filter");
    const filterList = [];

    btns.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const btnValue = e.target.textContent;

        filterContainer.classList.remove("--hidden");

        if (!filterList.includes(btnValue)) {
          const li = document.createElement("li");
          li.className = "filter__card";
          li.setAttribute("id", index);
          filterContainer.appendChild(li);

          const p = document.createElement("p");
          p.textContent = btnValue;
          p.className = "filter__value";
          li.appendChild(p);

          const buttons = document.createElement("button");
          buttons.className = "filter__remove";
          li.appendChild(buttons);

          const image = document.createElement("img");
          image.src = "./assets/images/icon-remove.svg";
          image.alt = "Close icon";
          image.className = "remove__icon";
          buttons.appendChild(image);

          filterList.push(btnValue);

          buttons.addEventListener("click", () => {
            li.remove();
            filterList.splice(filterList.indexOf(btnValue), 1);

            if (filterList.length === 0) {
              filterContainer.classList.add("--hidden");
            }
            console.log(filterList);
          });
        }
      });
    });
  });
}
