const stockDataElement = document.getElementById('stock-data');
const refreshButton = document.getElementById('refresh-button');
const top20Button = document.getElementById('top20-button');
const topGainerButton = document.getElementById('topgainer-button');
const topLooserButton = document.getElementById('toplooser-button');

function fetchStockData(apiUrl) {
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            displayStockData(data);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            stockDataElement.innerHTML = '<p>Error fetching data.</p>';
        });
}

function displayStockData(data) {
    const stockList = data.map((stock) => {
        return `<p><strong>${stock.TRADING_CODE}</strong> CH: ${stock.CHANGE} Cl: ${stock.CLOSE} H:${stock.HIGH} L:${stock.LOW}</p>`;
    }).join('');

    stockDataElement.innerHTML = stockList;
}

refreshButton.addEventListener('click', () => {
    fetchStockData('https://dse-share-api.onrender.com/api/stock/all');
});

top20Button.addEventListener('click', () => {
    fetchStockData('https://dse-share-api.onrender.com/api/stock/get_top20_share_data');
});

topGainerButton.addEventListener('click', () => {
    fetchStockData('https://dse-share-api.onrender.com/api/stock/get_top10_gainer_data');
});

topLooserButton.addEventListener('click', () => {
    fetchStockData('https://dse-share-api.onrender.com/api/stock/get_top10_loser_data');
});

// Initial data fetch when the page loads
fetchStockData('https://dse-share-api.onrender.com/api/stock/all');
