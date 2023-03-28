export default async function getData() {
  const response = await fetch("./assets/json/data.json");
  const data = await response.json();
  console.log(data);
  return data;
}
