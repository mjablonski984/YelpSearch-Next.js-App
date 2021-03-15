export default async function handler({ query: {id} }, res) {
  const apiKey = process.env.API_KEY;
  const baseUrl = 'https://api.yelp.com/v3/businesses/';

    try {   
        let query = await fetch(
            `${baseUrl}${id}`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`
              }
            }
          )
        let data = await query.json();
        let reviews =  await fetch(
          `${baseUrl}${id}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          }
        );
        let reviewsData = await reviews.json();
        data.reviews = reviewsData.reviews;
        res.status(200).json(data);
    } catch (error) {
        res
        .status(500)
        .json({ message: `Server error - ${error}` })
    }
}