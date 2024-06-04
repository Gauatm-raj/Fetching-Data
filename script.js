async function fetchData() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    data.forEach(coin => {
      const row = document.createElement('tr');
     
      row.innerHTML = `
        <td><img src="${coin.image}" alt="">${coin.name}</td>
        <td>${coin.symbol}</td>
        <td>$ ${coin.current_price}</td>
        <td>$ ${coin.total_volume}</td>
        <td>${coin.price_change_percentage_24h} %</td>
        <td>$ ${coin.market_cap}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = responseData.filter(coin =>
      coin.name.toLowerCase().includes(searchInput) ||
      coin.id.toLowerCase().includes(searchInput) ||
      coin.symbol.toLowerCase().includes(searchInput)
    );
    renderTable(filteredData);
  }

  function sortData(key) {
    const sortedData = [...responseData].sort((a, b) => {
      if (key === 'marketCap') {
        return b.market_cap - a.market_cap;
      } else if (key === 'priceChange') {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
    });
    renderTable(sortedData);
  }

  let responseData;

  fetchData().then(data => {
    responseData = data;
    renderTable(data);
  });

  


//   name: Bitcoin
// VM1961:2 image: https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400
// VM1961:2 current_price: 68768
// VM1961:2 market_cap: 1354901031981
// VM1961:2 market_cap_rank: 1
// VM1961:2 fully_diluted_valuation: 1443755595075
// VM1961:2 total_volume: 26865856130
// VM1961:2 high_24h: 70188
// VM1961:2 low_24h: 68732
// VM1961:2 price_change_24h: -282.7299763560004
// VM1961:2 price_change_percentage_24h: -0.40945
// VM1961:2 market_cap_change_24h: -5740267676.558105
// VM1961:2 market_cap_change_percentage_24h: -0.42188
// VM1961:2 circulating_supply: 19707575
// VM1961:2 total_supply: 21000000
// VM1961:2 max_supply: 21000000
// VM1961:2 ath: 73738
// VM1961:2 ath_change_percentage: -6.69117
// VM1961:2 ath_date: 2024-03-14T07:10:36.635Z
// VM1961:2 atl: 67.81
// VM1961:2 atl_change_percentage: 101367.36407
// VM1961:2 atl_date: 2013-07-06T00:00:00.000Z
// VM1961:2 roi: null
