document.getElementById("searchBtn").addEventListener("click", () => {
  const country = document.getElementById("countryInput").value.trim();
  
  if (country === "") {
    displayOutput("Please enter a country name.");
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then(data => {
      const countryData = data[0];
      const population = countryData.population.toLocaleString();
      const name = countryData.name.common;
      const region = countryData.region;

      displayOutput(`
        <h3>${name}</h3>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Region:</strong> ${region}</p>
      `);
    })
    .catch(error => {
      displayOutput("Could not fetch data. Please try another country.");
    });
});

function displayOutput(html) {
  document.getElementById("output").innerHTML = html;
}
