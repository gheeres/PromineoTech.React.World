const defaultBaseUrl = 'http://localhost:3000';

export default class WorldService {
  /**
   * Creates an instance of the WorldService class.
   * @param {String} url The optional base url of the service.
   */
  constructor(url) {
    this.url = url || defaultBaseUrl;
  }

  /**
   * Retrieves all available countries.
   */
  getAllCountries() {
    let url = `${ this.url }/countries`;
    return fetch(url).then(res => res.json())
                     .then((data) => {
                       return data.map((d,index) => {
                         return {
                           code: d.country_code,
                           name: d.country_name,
                           continent: d.continent,
                           population: d.country_population
                         };
                       });
                     });
  }
}