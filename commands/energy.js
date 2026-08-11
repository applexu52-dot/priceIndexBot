import axios from 'axios'
// node 內建的檔案系統功能，不需要 npm 安裝
import fs from 'node:fs'
import template from '../templates/energy.js'
import YahooFinance from "yahoo-finance2";
// import yahooFinance from 'yahoo-finance2';

export default async (event) => {
  try {
    const yF = new YahooFinance({ suppressNotices: ['ripHistorical'] })
    // const yF = new YahooFinance();
    const usdcode = "USDTWD=X";     // 美元
    const wtioilcode = "CL=F";   // WTI原油 紐約輕原油  
    const brOilcode = "BZ=F";    // 布蘭特原油
    const rboboilcode = "RB=F";  // RBOB汽油
    const gascode = "NG=F";      // 天然氣
    let avg;

    // 前一交易日收盤價
    // 近三個月平均收盤價
    // 三年前的近三個月平均收盤價
    // 五年前的近三個月平均收盤價

    // 1.設定時間參數
    const today = new Date();
    // 取三個月前的日期
    const before3monDate = new Date();
    before3monDate.setMonth(today.getMonth() - 3);

    // 取三年前近三個月的日期
    const before3YearDate = new Date();
    const before3YearAnd3MonDate = new Date();
    before3YearDate.setFullYear(today.getFullYear() - 3);

    before3YearAnd3MonDate.setMonth(today.getMonth() - 3);
    before3YearAnd3MonDate.setFullYear(today.getFullYear() - 3);

    
    // 取五年前近三個月的日期
    const before5YearDate = new Date();
    const before5YearAnd3MonDate = new Date();
    before5YearDate.setFullYear(today.getFullYear() - 5);

    before5YearAnd3MonDate.setFullYear(today.getFullYear() - 5);
    before5YearAnd3MonDate.setMonth(today.getMonth() - 3);


    // 2. 帶入查詢參數
    // 近三個月
    const query3Month = { 
        period1: before3monDate, 
        period2: today,
        interval: '1d',
        return: 'object'
    };

    // 三年前的近三個月
    const querybefore3Year = { 
        period1: before3YearAnd3MonDate, 
        period2: before3YearDate,
        interval: '1d',
        return: 'object'
    };

    // 五年前的近三個月
    const querybefore5Year = { 
        period1: before5YearAnd3MonDate, 
        period2: before5YearDate,
        interval: '1d',
        return: 'object' 
    };

    // 3-1. 抓取歷史數據(3 month)
    const chartData01 = await yF.chart(usdcode, query3Month);
    // const rsusd = await yF.historical(usdcode, query3Month);

    const timestamps01 = chartData01.timestamp;
    const prices01 = chartData01.indicators.quote[0];
    let rsusd = [];
    timestamps01.forEach((timestamp, index) => {
        rsusd.push(prices01.close[index]);  
    });
    // console.log((rsusd[rsusd.length - 1]).toFixed(4).toString());

    let total = 0;
    for(let i = 0; i < rsusd.length; i++){
        total += rsusd[i];
    }
    avg = total / rsusd.length;

    // 3-2. 抓取歷史數據(3year 3 month)

    const chartData02 = await yF.chart(usdcode,  querybefore3Year);
    const timestamps02 = chartData02.timestamp;
    const prices02 = chartData02.indicators.quote[0];
    let rsusd2 = [];
    timestamps02.forEach((timestamp, index) => {
        rsusd2.push(prices02.close[index]);  
    });
    total = 0;
    for(let i = 0; i < rsusd2.length; i++){
        total += rsusd2[i];
    }
    let avg2 = total / rsusd2.length;

    // 3-3. 抓取歷史數據(5year 3 month)
    const chartData03 = await yF.chart(usdcode, querybefore5Year);
    // const rsusd = await yF.historical(usdcode, query3Month);

    const timestamps03 = chartData03.timestamp;
    const prices03 = chartData03.indicators.quote[0];
    const rsusd3 = [];
    timestamps03.forEach((timestamp, index) => {
        rsusd3.push(prices03.close[index]);  
    });
    total = 0;
    for(let i = 0; i < rsusd3.length; i++){
        total += rsusd3[i];
    }
    let avg3 = total / rsusd3.length;



    // 3-1. 抓取歷史數據(3 month)
    const chartData11 = await yF.chart(wtioilcode, query3Month);
    // console.log((rswti[rswti.length - 1].close).toFixed(4).toString());

    const timestamps11 = chartData11.timestamp;
    const prices11 = chartData11.indicators.quote[0];
    let rswti = [];
    timestamps11.forEach((timestamp, index) => {
        rswti.push(prices11.close[index]);  
    });
    total = 0;
    for(let i = 0; i < rswti.length; i++){
        total += rswti[i];
    }
    let avg21 = total / rswti.length;

    // 3-2. 抓取歷史數據(3year 3 month)
    const chartData12 = await yF.chart(wtioilcode, querybefore3Year);
    const timestamps12 = chartData12.timestamp;
    const prices12 = chartData12.indicators.quote[0];
    let rswti2 = [];
    timestamps12.forEach((timestamp, index) => {
        rswti2.push(prices12.close[index]);  
    });
    total = 0;
    for(let i = 0; i < rswti2.length; i++){
        total += rswti2[i];
    }
    let avg22 = total / rswti2.length;

    // 3-3. 抓取歷史數據(5year 3 month)
    const chartData13 = await yF.chart(wtioilcode, querybefore5Year);
    const timestamps13 = chartData13.timestamp;
    const prices13 = chartData13.indicators.quote[0];
    let rswti3 = [];
    timestamps13.forEach((timestamp, index) => {
        rswti3.push(prices13.close[index]);  
    });
    // const rswti3 = await yF.historical(wtioilcode, querybefore5Year);
    total = 0;
    for(let i = 0; i < rswti3.length; i++){
        total += rswti3[i];
    }
    let avg23 = total / rswti3.length;

    
    // 3-1. 抓取歷史數據(3 month)
    const chartData21 = await yF.chart(brOilcode, query3Month);
    // const rsbl = await yF.historical(brOilcode, query3Month);
    // console.log((rsbl[rsbl.length - 1].close).toFixed(4).toString());
    const timestamps21 = chartData21.timestamp;
    const prices21 = chartData21.indicators.quote[0];
    let rsbl = [];
    timestamps21.forEach((timestamp, index) => {
        rsbl.push(prices21.close[index]);  
    });

    total = 0;
    for(let i = 0; i < rsbl.length; i++){
        total += rsbl[i];
    }
    let avg31 = total / rsbl.length;

    // 3-2. 抓取歷史數據(3year 3 month)
    const chartData22 = await yF.chart(brOilcode, querybefore3Year);
    // const rsbl2 = await yF.historical(brOilcode, querybefore3Year);
    const timestamps22 = chartData22.timestamp;
    const prices22 = chartData22.indicators.quote[0];
    let rsbl2 = [];
    timestamps22.forEach((timestamp, index) => {
        rsbl2.push(prices22.close[index]);  
    });
    total = 0;
    for(let i = 0; i < rsbl2.length; i++){
        total += rsbl2[i];
    }
    let avg32 = total / rsbl2.length;

    // 3-3. 抓取歷史數據(5year 3 month)
    // const rsbl3 = await yF.historical(brOilcode, querybefore5Year);
    const chartData23 = await yF.chart(brOilcode, querybefore5Year);
    const timestamps23 = chartData23.timestamp;
    const prices23 = chartData23.indicators.quote[0];
    let rsbl3 = [];
    timestamps23.forEach((timestamp, index) => {
        rsbl3.push(prices23.close[index]);  
    });
    total = 0;
    for(let i = 0; i < rsbl3.length; i++){
        total += rsbl3[i];
    }
    let avg33 = total / rsbl3.length;


    // 3-1. 抓取歷史數據(3 month)
    const chartData31 = await yF.chart(rboboilcode, query3Month);
    const timestamps31 = chartData31.timestamp;
    const prices31 = chartData31.indicators.quote[0];
    let rsrb = [];
    timestamps31.forEach((timestamp, index) => {
        rsrb.push(prices31.close[index]);  
    });
    // const rsrb = await yF.historical(rboboilcode, query3Month);
    // console.log((rsrb[rsrb.length - 1].close).toFixed(4).toString());

    total = 0;
    for(let i = 0; i < rsrb.length; i++){
        total += rsrb[i];
    }
    let avg41 = total / rsrb.length;

    // 3-2. 抓取歷史數據(3year 3 month)
    const chartData32 = await yF.chart(rboboilcode, querybefore3Year);
    const timestamps32 = chartData32.timestamp;
    const prices32 = chartData32.indicators.quote[0];
    let rsrb2 = [];
    timestamps32.forEach((timestamp, index) => {
        rsrb2.push(prices32.close[index]);  
    });
    // const rsrb2 = await yF.historical(rboboilcode, querybefore3Year);
    total = 0;
    for(let i = 0; i < rsrb2.length; i++){
        total += rsrb2[i];
    }
    let avg42 = total / rsrb2.length;

    // 3-3. 抓取歷史數據(5year 3 month)
    const chartData33 = await yF.chart(rboboilcode, querybefore5Year);
    const timestamps33 = chartData33.timestamp;
    const prices33 = chartData33.indicators.quote[0];
    let rsrb3 = [];
    timestamps33.forEach((timestamp, index) => {
        rsrb3.push(prices33.close[index]);  
    });
    // const rsrb3 = await yF.historical(rboboilcode, querybefore5Year);
    total = 0;
    for(let i = 0; i < rsrb3.length; i++){
        total += rsrb3[i];
    }
    let avg43 = total / rsrb3.length;

    
    // 3-1. 抓取歷史數據(3 month)
    // const rsgs = await yF.historical(gascode, query3Month);
    // console.log((rsrb[rsgs.length - 1].close).toFixed(4).toString());
    const chartData41 = await yF.chart(gascode, query3Month);
    const timestamps41 = chartData41.timestamp;
    const prices41 = chartData41.indicators.quote[0];
    let rsgs = [];
    timestamps41.forEach((timestamp, index) => {
        rsgs.push(prices41.close[index]);  
    });
    total = 0;
    for(let i = 0; i < rsgs.length; i++){
        total += rsgs[i];
    }
    let avg51 = total / rsrb.length;

    // 3-2. 抓取歷史數據(3year 3 month)
    // const rsgs2 = await yF.historical(gascode, querybefore3Year);
    const chartData42 = await yF.chart(gascode, querybefore3Year);
    const timestamps42 = chartData42.timestamp;
    const prices42 = chartData41.indicators.quote[0];
    let rsgs2 = [];
    timestamps42.forEach((timestamp, index) => {
        rsgs2.push(prices42.close[index]);  
    });
    total = 0;
    for(let i = 0; i < rsgs2.length; i++){
        total += rsgs2[i];
    }
    let avg52 = total / rsgs2.length;

    // 3-3. 抓取歷史數據(5year 3 month)
    // const rsgs3 = await yF.historical(gascode, querybefore5Year);
    const chartData43 = await yF.chart(gascode, querybefore5Year);
    const timestamps43 = chartData42.timestamp;
    const prices43 = chartData43.indicators.quote[0];
    let rsgs3 = [];
    timestamps43.forEach((timestamp, index) => {
        rsgs3.push(prices43.close[index]);  
    });
    total = 0;
    for(let i = 0; i < rsgs3.length; i++){
        total += rsgs3[i];
    }
    let avg53 = total / rsgs3.length;


    const { data } = await axios.get('https://tw.rter.info/capi.php')

    // 美元卡片
    const usd = template()
    usd.body.contents[0].text = '美元'
    usd.body.contents[1].contents[1].text = (rsusd.at(-1)).toFixed(3).toString()
    usd.body.contents[2].contents[1].text = avg.toFixed(3).toString()
    usd.body.contents[3].contents[1].text = avg2.toFixed(3).toString()
    usd.body.contents[4].contents[1].text = avg3.toFixed(3).toString()
    usd.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
        timeZone: 'Asia/Taipei',
    })

    // WTI原油卡片
    const wtiOil = template()
    wtiOil.body.contents[0].text = 'WTI原油'
    wtiOil.body.contents[1].contents[1].text = (rswti.at(-1)).toFixed(3).toString()
    wtiOil.body.contents[2].contents[1].text = avg21.toFixed(3).toString()
    wtiOil.body.contents[3].contents[1].text = avg22.toFixed(3).toString()
    wtiOil.body.contents[4].contents[1].text = avg23.toFixed(3).toString()
    wtiOil.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
    })

    // 布蘭特原油卡片
    const bltOil = template()
    bltOil.body.contents[0].text = '布蘭特原油'
    bltOil.body.contents[1].contents[1].text = (rsbl.at(-1)).toFixed(3).toString()
    bltOil.body.contents[2].contents[1].text = avg31.toFixed(3).toString()
    bltOil.body.contents[3].contents[1].text = avg32.toFixed(3).toString()
    bltOil.body.contents[4].contents[1].text = avg33.toFixed(3).toString()
    bltOil.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
    })

    // RBOB汽油卡片
    const rboboil = template()
    rboboil.body.contents[0].text = 'RBOB汽油'
    rboboil.body.contents[1].contents[1].text = (rsrb.at(-1)).toFixed(3).toString()
    rboboil.body.contents[2].contents[1].text = avg41.toFixed(3).toString()
    rboboil.body.contents[3].contents[1].text = avg42.toFixed(3).toString()
    rboboil.body.contents[4].contents[1].text = avg43.toFixed(3).toString()
    rboboil.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
    })

    // 天然氣卡片
    const gas = template()
    gas.body.contents[0].text = '天然氣'
    gas.body.contents[1].contents[1].text = (rsgs.at(-1)).toFixed(3).toString()
    gas.body.contents[2].contents[1].text = avg51.toFixed(3).toString()
    gas.body.contents[3].contents[1].text = avg52.toFixed(3).toString()
    gas.body.contents[4].contents[1].text = avg53.toFixed(3).toString()
    gas.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
    })

    const message = {
      type: 'flex',
      altText: '能源查詢結果',
      contents: {
        type: 'carousel',
        contents: [usd, wtiOil, bltOil, rboboil, gas],
      },
    }
    const result = await event.reply(message)
    console.log(result)

    // 如果有設定環境變數 DEBUG，而且回覆的訊息有錯誤時，印出 json
    if (process.env.DEBUG && result.message) {
      // fs.writeFileSync(相對於 index.js 的檔案路徑, 寫入內容)
      // JSON.stringify(物件變數, null, 縮排空白)
      fs.writeFileSync('./dump/energy.json', JSON.stringify(message, null, 2))
    }
  } catch (error) {
    console.error(error)
  }
}