import axios from 'axios';

class CoinController {
  static getLatestCurrency(req, res) {
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        params: {
          start: 1,
          limit: 10,
          convert: 'USD'
        },
        headers: {
          'X-CMC_PRO_API_KEY': '7b80a280-7fd9-4d9b-8df8-eadf038f6dc0',
        }
      })
      .then((response) => {
        res.status(201).json({
          success: true,
          message: 'coins Successfully retrived',
          coin: response.data,
        });
      })
      .catch((error) => {
        //   res.status(500).json({ error: error.message })
        console.log('API call error:', error.message);
      });
  }
}

export default CoinController;
