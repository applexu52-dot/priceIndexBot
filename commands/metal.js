import axios from 'axios'
// node 內建的檔案系統功能，不需要 npm 安裝
import fs from 'node:fs'
import template from '../templates/energy.js'
import YahooFinance from "yahoo-finance2";

export default async (event) => {
    try {
        const yF = new YahooFinance();
        const usdcode = "USDTWD=X";     // 美元
        const goldCode = "GC=F";
        const silverCode = "SI=F";
        const copperCode = "HG=F";
        const aluminumCode = "ALI=F";
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
        for (let i = 0; i < rsusd.length; i++) {
            total += rsusd[i];
        }
        avg = total / rsusd.length;

        // 3-2. 抓取歷史數據(3year 3 month)

        const chartData02 = await yF.chart(usdcode, querybefore3Year);
        const timestamps02 = chartData02.timestamp;
        const prices02 = chartData02.indicators.quote[0];
        let rsusd2 = [];
        timestamps02.forEach((timestamp, index) => {
            rsusd2.push(prices02.close[index]);
        });
        total = 0;
        for (let i = 0; i < rsusd2.length; i++) {
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
        for (let i = 0; i < rsusd3.length; i++) {
            total += rsusd3[i];
        }
        let avg3 = total / rsusd3.length;



        // 3-1. 抓取歷史數據(3 month)
        const chartData11 = await yF.chart(goldCode, query3Month);
        // console.log((rswti[rswti.length - 1].close).toFixed(4).toString());

        const timestamps11 = chartData11.timestamp;
        const prices11 = chartData11.indicators.quote[0];
        let rsgd = [];
        timestamps11.forEach((timestamp, index) => {
            rsgd.push(prices11.close[index]);
        });
        total = 0;
        for (let i = 0; i < rsgd.length; i++) {
            total += rsgd[i];
        }
        let avg21 = total / rsgd.length;

        // 3-2. 抓取歷史數據(3year 3 month)
        const chartData12 = await yF.chart(goldCode, querybefore3Year);
        const timestamps12 = chartData12.timestamp;
        const prices12 = chartData12.indicators.quote[0];
        let rsgd2 = [];
        timestamps12.forEach((timestamp, index) => {
            rsgd2.push(prices12.close[index]);
        });
        total = 0;
        for (let i = 0; i < rsgd2.length; i++) {
            total += rsgd2[i];
        }
        let avg22 = total / rsgd2.length;

        // 3-3. 抓取歷史數據(5year 3 month)
        const chartData13 = await yF.chart(goldCode, querybefore5Year);
        const timestamps13 = chartData13.timestamp;
        const prices13 = chartData13.indicators.quote[0];
        let rsgd3 = [];
        timestamps13.forEach((timestamp, index) => {
            rsgd3.push(prices13.close[index]);
        });
        // const rswti3 = await yF.historical(wtioilcode, querybefore5Year);
        total = 0;
        for (let i = 0; i < rsgd3.length; i++) {
            total += rsgd3[i];
        }
        let avg23 = total / rsgd3.length;


        // 3-1. 抓取歷史數據(3 month)
        const chartData21 = await yF.chart(silverCode, query3Month);
        // const rsbl = await yF.historical(brOilcode, query3Month);
        // console.log((rsbl[rsbl.length - 1].close).toFixed(4).toString());
        const timestamps21 = chartData21.timestamp;
        const prices21 = chartData21.indicators.quote[0];
        let rssl = [];
        timestamps21.forEach((timestamp, index) => {
            rssl.push(prices21.close[index]);
        });

        total = 0;
        for (let i = 0; i < rssl.length; i++) {
            total += rssl[i];
        }
        let avg31 = total / rssl.length;

        // 3-2. 抓取歷史數據(3year 3 month)
        const chartData22 = await yF.chart(silverCode, querybefore3Year);
        // const rsbl2 = await yF.historical(brOilcode, querybefore3Year);
        const timestamps22 = chartData22.timestamp;
        const prices22 = chartData22.indicators.quote[0];
        let rssl2 = [];
        timestamps22.forEach((timestamp, index) => {
            rssl2.push(prices22.close[index]);
        });
        total = 0;
        for (let i = 0; i < rssl2.length; i++) {
            total += rssl2[i];
        }
        let avg32 = total / rssl2.length;

        // 3-3. 抓取歷史數據(5year 3 month)
        // const rsbl3 = await yF.historical(brOilcode, querybefore5Year);
        const chartData23 = await yF.chart(silverCode, querybefore5Year);
        const timestamps23 = chartData23.timestamp;
        const prices23 = chartData23.indicators.quote[0];
        let rssl3 = [];
        timestamps23.forEach((timestamp, index) => {
            rssl3.push(prices23.close[index]);
        });
        total = 0;
        for (let i = 0; i < rssl3.length; i++) {
            total += rssl3[i];
        }
        let avg33 = total / rssl3.length;


        // 3-1. 抓取歷史數據(3 month)
        const chartData31 = await yF.chart(copperCode, query3Month);
        const timestamps31 = chartData31.timestamp;
        const prices31 = chartData31.indicators.quote[0];
        let rscp = [];
        timestamps31.forEach((timestamp, index) => {
            rscp.push(prices31.close[index]);
        });
        // const rsrb = await yF.historical(rboboilcode, query3Month);
        // console.log((rsrb[rsrb.length - 1].close).toFixed(4).toString());

        total = 0;
        for (let i = 0; i < rscp.length; i++) {
            total += rscp[i];
        }
        let avg41 = total / rscp.length;

        // 3-2. 抓取歷史數據(3year 3 month)
        const chartData32 = await yF.chart(copperCode, querybefore3Year);
        const timestamps32 = chartData32.timestamp;
        const prices32 = chartData32.indicators.quote[0];
        let rscp2 = [];
        timestamps32.forEach((timestamp, index) => {
            rscp2.push(prices32.close[index]);
        });
        // const rsrb2 = await yF.historical(rboboilcode, querybefore3Year);
        total = 0;
        for (let i = 0; i < rscp2.length; i++) {
            total += rscp2[i];
        }
        let avg42 = total / rscp2.length;

        // 3-3. 抓取歷史數據(5year 3 month)
        const chartData33 = await yF.chart(copperCode, querybefore5Year);
        const timestamps33 = chartData33.timestamp;
        const prices33 = chartData33.indicators.quote[0];
        let rscp3 = [];
        timestamps33.forEach((timestamp, index) => {
            rscp3.push(prices33.close[index]);
        });
        // const rsrb3 = await yF.historical(rboboilcode, querybefore5Year);
        total = 0;
        for (let i = 0; i < rscp3.length; i++) {
            total += rscp3[i];
        }
        let avg43 = total / rscp3.length;


        // 3-1. 抓取歷史數據(3 month)
        // const rsgs = await yF.historical(gascode, query3Month);
        // console.log((rsrb[rsgs.length - 1].close).toFixed(4).toString());
        const chartData41 = await yF.chart(aluminumCode, query3Month);
        const timestamps41 = chartData41.timestamp;
        const prices41 = chartData41.indicators.quote[0];
        let rsal = [];
        timestamps41.forEach((timestamp, index) => {
            rsal.push(prices41.close[index]);
        });
        total = 0;
        for (let i = 0; i < rsal.length; i++) {
            total += rsal[i];
        }
        let avg51 = total / rsal.length;

        // 3-2. 抓取歷史數據(3year 3 month)
        // const rsgs2 = await yF.historical(gascode, querybefore3Year);
        const chartData42 = await yF.chart(aluminumCode, querybefore3Year);
        const timestamps42 = chartData42.timestamp;
        const prices42 = chartData41.indicators.quote[0];
        let rsal2 = [];
        timestamps42.forEach((timestamp, index) => {
            rsal2.push(prices42.close[index]);
        });
        total = 0;
        for (let i = 0; i < rsal2.length; i++) {
            total += rsal2[i];
        }
        let avg52 = total / rsal2.length;

        // 3-3. 抓取歷史數據(5year 3 month)
        // const rsgs3 = await yF.historical(gascode, querybefore5Year);
        const chartData43 = await yF.chart(aluminumCode, querybefore5Year);
        const timestamps43 = chartData42.timestamp;
        const prices43 = chartData43.indicators.quote[0];
        let rsal3 = [];
        timestamps43.forEach((timestamp, index) => {
            rsal3.push(prices43.close[index]);
        });
        total = 0;
        for (let i = 0; i < rsal3.length; i++) {
            total += rsal3[i];
        }
        let avg53 = total / rsal3.length;


        const { data } = await axios.get('https://tw.rter.info/capi.php')

        // 美元卡片
        const usd = template()
        usd.body.contents[0].text = '美元'
        usd.body.contents[1].contents[1].text = (rsusd.at(-2)).toFixed(3).toString()
        usd.body.contents[2].contents[1].text = avg.toFixed(3).toString()
        usd.body.contents[3].contents[1].text = avg2.toFixed(3).toString()
        usd.body.contents[4].contents[1].text = avg3.toFixed(3).toString()
        usd.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
        })
        // 黃金卡片
        const gold = template()
        gold.body.contents[0].text = '貴金屬-黃金'
        gold.body.contents[1].contents[1].text = (rsgd.at(-2)).toFixed(3).toString()
        gold.body.contents[2].contents[1].text = avg21.toFixed(3).toString()
        gold.body.contents[3].contents[1].text = avg22.toFixed(3).toString()
        gold.body.contents[4].contents[1].text = avg23.toFixed(3).toString()
        gold.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
        })
        // 白銀卡片
        const silver = template()
        silver.body.contents[0].text = '貴金屬-白銀'
        silver.body.contents[1].contents[1].text = (rssl.at(-2)).toFixed(3).toString()
        silver.body.contents[2].contents[1].text = avg31.toFixed(3).toString()
        silver.body.contents[3].contents[1].text = avg32.toFixed(3).toString()
        silver.body.contents[4].contents[1].text = avg33.toFixed(3).toString()
        silver.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
        })
        // 銅卡片
        const copper = template()
        copper.body.contents[0].text = '工業金屬-銅'
        copper.body.contents[1].contents[1].text = (rscp.at(-2)).toFixed(3).toString()
        copper.body.contents[2].contents[1].text = avg41.toFixed(3).toString()
        copper.body.contents[3].contents[1].text = avg42.toFixed(3).toString()
        copper.body.contents[4].contents[1].text = avg43.toFixed(3).toString()
        copper.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
        })
        // 鋁卡片
        const aluminum = template()
        aluminum.body.contents[0].text = '工業金屬-鋁'
        aluminum.body.contents[1].contents[1].text = (rsal.at(-2)).toFixed(3).toString()
        aluminum.body.contents[2].contents[1].text = avg51.toFixed(3).toString()
        aluminum.body.contents[3].contents[1].text = avg52.toFixed(3).toString()
        aluminum.body.contents[4].contents[1].text = avg53.toFixed(3).toString()
        aluminum.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
        })

        const message = {
            type: 'flex',
            altText: '金屬查詢結果',
            contents: {
                type: 'carousel',
                contents: [usd, gold, silver, copper, aluminum],
            },
        }
        const result = await event.reply(message)

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