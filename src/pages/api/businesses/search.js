export default async function handler({ query }, res) {
  const apiKey = process.env.API_KEY;

  const baseUrl = `https://api.yelp.com/v3/businesses/search?`;
  
    try {   
      let searchUrl = baseUrl
      
      if (query.offset) searchUrl += `offset=${query.offset}&`;
      if (query.limit) searchUrl += `limit=${query.limit}&`;
      if (query.term) searchUrl += `term=${query.term}&`;
      if (query.location) searchUrl += `location=${query.location}&`;
      if (query.sortBy) searchUrl += `sort_by=${query.sortBy}&`;
      
      let businesses = await fetch(
          searchUrl,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          }
        )
        let data = await businesses.json();
        searchUrl = baseUrl; // reset search url after each request
        
        res.status(200).json(data);

    } catch (error) {
        res
        .status(500)
        .json({ message: `Server error - ${error}` })
    }

}