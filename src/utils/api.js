const BASE_URL = 'https://api.twelvedata.com/time_series';

async function getStockData(ticker) {
    const res = await fetch(`${BASE_URL}?symbol=${ticker}&interval=1day&outputsize=30&apikey=ef16897ad352427db59afd35cd4524aa`);
    const data = await res.json();
    return data.values.map((d) => ({
        date: d.datetime,
        close: d.close
    }));
}

export { getStockData };
