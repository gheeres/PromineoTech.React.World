const baseUrl = 'http://localhost:3000';

export default class WorldService {
  #countries = [];

  constructor(url) {
    this.url = url || baseUrl;
  }

  /**
   * Retrieves all of the available countries.
   * @returns {Promise[Array.Country]} The countries.
   */
  async getCountries() {
    if (this.#countries.length) {
      return this.#countries;
    }

    const url = `${ this.url }/countries`;
    console.log(`Request data from: ${ url }...`);
    return fetch(url).then(res => res.json())
                     .then((json) => {
                       this.#countries = json; 
                       return this.#countries;
                     });
  }

  /**
   * Retrieves all the cites for a country.
   * @param {String} country  The unique id of the country.
   */
  async getCitiesForCountry(country) {
    if (! country) {
        return [];
    }

    const url = `${ baseUrl }/countries/${ country }/cities`;
    return fetch(url).then(res => res.json())
                     .then((json) => {
                       return json;
                     });
  }
}