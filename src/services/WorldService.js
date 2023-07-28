const defaultUrl = 'http://localhost:3000';

/**
 * Service for interacting with cities, countries and languages of the world.
 */
export default class WorldService {
  #languages = [];
  #countries = [];

  /**
   * Creates an instance of the WorldService class.
   * @param {string} url The optional base url of the service.
   */
  constructor(url) {
    this.url = url || defaultUrl;
  }

  /**
   * Retrieves all countries that speak the specified language.
   * @param {string} language The unique language code.
   * @returns {Array.CountryLanguageDetail} The list of countries / language details.
   */
  async getCountriesThatSpeakLanguage(language) {
    if (! language) {
      return [];
    }

    const url = `${ this.url }/languages/${ language }/countries`;
    console.info(`Requesting data from: ${ url }...`);
    return fetch(url).then(res => res.json())
                     .then((json) => {
                       return json.map(c => {
                        return {
                          country_code: c.country.country_code,
                          country_name: c.country.country_name,
                          is_official: c.is_official,
                          language_percentage: c.language_percentage
                        };
                       });
                     });
  }

  /**
   * Retrieves all of the available languages.
   * @returns {Array.Language} The list of known languages.
   */
  async getLanguages() {
    if ((this.#languages || []).length) {
      return this.#languages;
    }

    const url = `${ this.url }/languages`;
    console.info(`Requesting data from: ${ url }...`);
    return fetch(url).then(res => res.json())
                     .then((json) => {
                      this.#languages = json;
                       return this.#languages;
                     });
  }

  /**
   * Retrieves all of the available countries.
   * @returns {Array.Country} The list of known countries.
   */
  async getCountries() {
    if ((this.#countries || []).length) {
      return this.#countries;
    }

    const url = `${ this.url }/countries`;
    console.info(`Requesting data from: ${ url }...`);
    return fetch(url).then(res => res.json())
                     .then((json) => {
                       this.#countries = json;
                       return this.#countries;
                     });
  }

  /**
   * Retrieves the country with the specified identifier.
   * @param {String} country The unique id of the country.
   * @returns {Country} The country if found.
   */
  async getCountry(country) {
    return this.getCountries().then((countries) => {
      return countries.find((c) => c.country_code === country);
    });
  }

  /**
   * Retrieves the language details spoken for the specified country.
   * @param {String} country The unique id of the country.
   * @returns {Array.Language} The list of spoken languages.
   */
  async getLanguagesSpokenInCountry(country) {
    if (country) {
      const url = `${ this.url }/countries/${country}/languages`;
      console.info(`Requesting data from: ${ url }...`);
      return fetch(url).then(res => res.json())
                       .then((json) => {
                        return json.map(c => {
                          return {
                            //country_code: country,
                            language_code: c.language.language_code,
                            language_name: c.language.language_name,
                            is_official: c.is_official,
                            language_percentage: c.language_percentage
                          };
                         });
                       });
    }
  }

  /**
   * Retrieves the cities located or a member of the specified country.
   * @param {String} country The unique id of the country.
   * @returns {Array.City} The list of cities.
   */
  async getCitiesForCountry(country) {
    if (country) {
      const url = `${ this.url }/countries/${country}/cities`;
      console.info(`Requesting data from: ${ url }...`);
      return fetch(url).then(res => {
                         if (res.status === 200) {
                           return res.json()
                         }
                         return [];
                       })
                       .then((json) => {
                         return json.map(c => {
                          let { country, ...city } = c;
                          return city;
                         });
                       });
    }
  }

  /**
   * Retrieves the city by it's unique identifier.
   * @param {Number} city_id The unique id of the city.
   * @returns {City} The city if found, otherwise null.
   */
  async getCity(city_id) {
    if (city_id) {
      const url = `${ this.url }/cities/${city_id}`;
      console.info(`Requesting data from: ${ url }...`);
      return fetch(url).then(res => {
                         if (res.status === 200) {
                           return res.json()
                         }
                         return null;
                       })
                       .then((json) => {
                         return json;
                       });
    }
  }

  /**
   * Retrieves the specified language details for the country and specified language.
   * @param {String} country The unique id of the country.
   * @param {String} language The unique id of the language.
   * @returns {CountryLanguageDetail} The language details for the country / language.
   */
  async getLangageDetailForCountry(country, language) {
    if (country) {
      return this.getLanguagesSpokenInCountry(country).then((details) => {
        return details.find((d) => d.language_code === language);
      });
    }
  }

  /**
   * Adds the country / language details.
   * @param {String} country The unique id of the country.
   * @param {CountryLanguageDetail} input The language details for the country.
   * @returns {Response} The response from the request.
   */
  async addLanguageDetailForCountry(country, input) {
    if ((! country) || 
        (! input) || (! input.language_code)) {
      return Promise.reject({
        code: 400,
        message: `Invalid or missing data. Country: ${ JSON.stringify(country) }, Data: ${ JSON.stringify(input) }`
      });
    }

    const url = `${ this.url }/countries/${ country }/languages`;
    console.info(`POSTing data to: ${ url }... Content: ${ JSON.stringify(input) }`);
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }).then(res => res.json())
      .then((json) => {
         return json;
      });
  }

  /**
   * Updates or modifies the country / language details.
   * @param {String} country The unique id of the country.
   * @param {String} language The unique id of the language.
   * @param {CountryLanguageDetail} input The language details for the country.
   * @returns {Response} The response from the request.
   */
  async updateLanguageDetailForCountry(country, language, input) {
    if ((! country) || (! language) || (! input)) {
      return Promise.reject({
        code: 400,
        message: `Invalid or missing data. Country: ${ JSON.stringify(country) }, Language: ${ JSON.stringify(language) }, Data: ${ JSON.stringify(input) }`
      });
    }

    const url = `${ this.url }/countries/${ country }/languages/${ language }`;
    console.info(`PUTing data to: ${ url }... Content: ${ JSON.stringify(input) }`);
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }).then(res => res.json())
      .then((json) => {
         return json;
      });
  }

  /**
   * Removes the country / language details.
   * @param {String} country The unique id of the country.
   * @param {String} language The unique id of the language.
   * @returns {Response} The response from the request.
   */
  async deleteLanguageDetailFromCountry(country, language) {
    if ((! country) || (! language)) {
      return Promise.reject({
        code: 400,
        message: `Invalid or missing data. Country: ${ JSON.stringify(country) }, Language: ${ JSON.stringify(language) }`
      });
    }

    const url = `${ this.url }/countries/${ country }/languages/${ language }`;
    console.info(`DELETEing data from: ${ url }...`);
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((json) => {
         return json;
      });
  }
}