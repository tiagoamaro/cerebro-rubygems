import {memoize} from 'cerebro-tools'
import _throttle from 'lodash/throttle'

const WAIT_TYPING_TIMEOUT = 300;

/**
 * Get Rubygems suggestions for entered query
 * @param  {String} query
 * @return {Promise}
 */
const getSuggestions = (query) => {
  const url = `https://rubygems.org/api/v1/search.json?query=${query}`;
  return fetch(url)
    .then(response => response.json())
    .then(gems => gems.map(gem => ({
      name:    gem.name,
      version: gem.version,
      info:    gem.info,
      url:     `https://rubygems.org/gems/${gem.name}`
    })))
};


export default _throttle(memoize(getSuggestions, {
  length:   false,
  promise:  'then',
  // Expire translation cache in 30 minutes
  maxAge:   30 * 60 * 1000,
  preFetch: true
}), WAIT_TYPING_TIMEOUT)
