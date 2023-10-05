const defaultBaseUrl = 'http://localhost:3000';

const simulatedDelay = 0; // 3000 = 3 second delay

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
                       return new Promise((resolve) => {
                        setTimeout(() => {
                          resolve(data.map((d,index) => {
                            return {
                              code: d.country_code,
                              name: d.country_name,
                              continent: d.continent,
                              population: d.country_population
                            };
                          }));
                        }, simulatedDelay);
                       });
                     });
  }

  /**
   * Removes or deletes the requested country.
   * @param {String} code The unique id of the country.
   * @returns {Promise} The removed country if successful.
   */
  deleteCountry(code) {
    if (code) {
      let url = `${ this.url }/countries/${ code }`;
      return fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(json => {
          return json;
        });
    }

    return Promise.resolve({});
  }

  /**
   * Retrieves all the cities for the specified country.
   * @param {String} country  The unique id of the country.
   * @returns {Promise} The resulting cities, if any, otherwise and empty array.
   */
  getCitiesForCountry(country) {
    if (country) {
      let url = `${ this.url }/countries/${ country }/cities`;
      return fetch(url).then(res => res.json())
                       .then(json => {
                         return new Promise((resolve) => {
                          setTimeout(() => {
                            resolve(json.map((c) => {
                              return {
                                id: c.city_id,
                                name: c.city_name,
                                latitude: c.latitude,
                                longitude: c.longitude,
                                population: c.city_population
                              };
                            }));
                          }, simulatedDelay);
                         });
                       });
    }
    return Promise.resolve([]);
  }
}