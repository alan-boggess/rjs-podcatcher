const axios = require("axios");
const itunesBaseUrl = "https://itunes.apple.com/search?term=";
const itunesQueryParams = "&country=US&media=podcast&limit=10"

export const getItunesSearchResults = async searchTerm => {
  try {
    var result = await axios.get(`${itunesBaseUrl}${searchTerm}${itunesQueryParams}`);
    //console.log(result.data);
    return result.data;
    //setData(result.data.feed);
  } catch (ex) {
    console.log(ex);
  }
  console.log(result);
  return result;
}
export const searchTermTypes = {
    PODCAST: { name: 'Podcast', term: 'podcast' },
    AUTHOR: { name: 'Author', term: 'podcastAuthor' },
    TITLE: { name: 'Title', term: 'titleTerm' }
  };