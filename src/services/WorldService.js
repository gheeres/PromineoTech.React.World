const baseUrl = `http://localhost:3000`;

export default class WorldService {
  constructor(url) {
    this.url = url || baseUrl;
  }

  async allCountries() {
    let url = `${ this.url }/countries`;
    console.log(`Fetching all countries from ${ url }...`);
    let response = await fetch(url);
    let json = await response.json();
    return json;
  }
}