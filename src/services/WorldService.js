const DefaultBaseUrl = 'http://localhost:3000';

export default class WorldService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || DefaultBaseUrl;
  }

  /**
   * Converts a country from a remote / external services to our preferred representation.
   * @param {Object} country The country from the external service.
   * @returns {Object} The country.
   */
  toCountry(country) {
    return {
      code: country.country_code,
      name: country.country_name,
      location: {
        latitude: country.latitude,
        longitude: country.longitude,
      },
      population: country.country_population,
    };
  }

  /**
   * Converts an external city / object into an internal one.
   * @param {Object} city The city to convert.
   * @returns {Object} The converted city.+
   */
  toCity(city) {
    return {
      id: city.city_id,
      name: city.city_name,
      location: {
        latitude: city.latitude,
        longitude: city.longitude,
      },
      population: city.city_population,
    };
  }

  /**
   * Retrieves all of the available / known countries.
   * @returns {Promise} The countries.
   */
  getAllCountries() {
    const url = `${ this.baseUrl }/countries`;
    console.log(`Requesting all countries at ${ url }...`);
    return fetch(url).then(res => res.json())
                     .then((countries) => {
                       return countries.map((country,index) => {
                         return this.toCountry(country);
                       });
                     });
  }

  /**
   * Retrieves the list of cities for a specified country.
   * @param {String} country_code The ISO3155-1 identifier. Both alpha-2 and alpha-3 are supported
   * @returns {Promise} The collection of cities.
   */
  getAllCitiesForCountry(country_code) {
    if (country_code) {
      const url = `${ this.baseUrl }/countries/${ country_code }/cities`;
      console.log(`Requesting cities for ${country_code } at ${ url }...`);
      return fetch(url).then(res => res.json())
                       .then((cities) => cities.map((city,index) => this.toCity(city)));
    }
    return Promise.resolve([]);
  }

  /**
   * Adds a new country.
   */
  addCountry(input) {
  }

  /**
   * Delete an existing country.
   */
  deleteCountry(code) {
  }
}

