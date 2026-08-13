import axios from 'axios'
// node 內建的檔案系統功能，不需要 npm 安裝
import fs from 'node:fs'
import template from '../templates/energy.js'
import YahooFinance from "yahoo-finance2";

export default async (event) => {
    try {
        const yF = new YahooFinance();
        const usdcode = "USDTWD=X";     // 美元
        const soybeanCode = "ZS=F";
        const cornCode = "ZC=F";
        const wheatCode = "ZW=F";

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
        let avg = total / rsusd.length;

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


        // soybean
        const chartData11 = await yF.chart(soybeanCode, query3Month);
        // const rsusd = await yF.historical(usdcode, query3Month);

        const timestamps11 = chartData11.timestamp;
        const prices11 = chartData11.indicators.quote[0];
        let rssb = [];
        timestamps11.forEach((timestamp, index) => {
            rssb.push(prices11.close[index]);
        });

        total = 0;
        for (let i = 0; i < rssb.length; i++) {
            total += rssb[i];
        }
        let avg21 = total / rssb.length;

        // 3-2. 抓取歷史數據(3year 3 month)

        const chartData12 = await yF.chart(soybeanCode, querybefore3Year);
        const timestamps12 = chartData12.timestamp;
        const prices12 = chartData12.indicators.quote[0];
        let rssb2 = [];
        timestamps12.forEach((timestamp, index) => {
            rssb2.push(prices12.close[index]);
        });
        total = 0;
        for (let i = 0; i < rssb2.length; i++) {
            total += rssb2[i];
        }
        let avg22 = total / rssb2.length;

        // 3-3. 抓取歷史數據(5year 3 month)
        const chartData13 = await yF.chart(soybeanCode, querybefore5Year);
        // const rsusd = await yF.historical(usdcode, query3Month);

        const timestamps13 = chartData13.timestamp;
        const prices13 = chartData13.indicators.quote[0];
        let rssb3 = [];
        timestamps13.forEach((timestamp, index) => {
            rssb3.push(prices13.close[index]);
        });
        total = 0;
        for (let i = 0; i < rssb3.length; i++) {
            total += rssb3[i];
        }
        let avg23 = total / rssb3.length;

        // cornCode
        // 3-1. 抓取歷史數據(3 month)
        // const rscr = await yF.historical(cornCode, query3Month);
        // console.log((rscr[rscr.length - 1].close).toFixed(4).toString());
        const chartData21 = await yF.chart(cornCode, query3Month);

        const timestamps21 = chartData21.timestamp;
        const prices21 = chartData21.indicators.quote[0];
        let rscr = [];
        timestamps21.forEach((timestamp, index) => {
            rscr.push(prices21.close[index]);
        });
        total = 0;
        for (let i = 0; i < rscr.length; i++) {
            total += rscr[i];
        }
        let avg31 = total / rscr.length;

        // 3-2. 抓取歷史數據(3year 3 month)
        // const rscr2 = await yF.historical(cornCode, querybefore3Year);
        const chartData22 = await yF.chart(cornCode, querybefore3Year);

        const timestamps22 = chartData22.timestamp;
        const prices22 = chartData22.indicators.quote[0];
        let rscr2 = [];
        timestamps22.forEach((timestamp, index) => {
            rscr2.push(prices22.close[index]);
        });
        total = 0;
        for (let i = 0; i < rscr2.length; i++) {
            total += rscr2[i];
        }
        let avg32 = total / rscr2.length;

        // 3-3. 抓取歷史數據(5year 3 month)
        // const rscr3 = await yF.historical(cornCode, querybefore5Year);
        const chartData23 = await yF.chart(cornCode, query3Month);

        const timestamps23 = chartData23.timestamp;
        const prices23 = chartData23.indicators.quote[0];
        let rscr3 = [];
        timestamps23.forEach((timestamp, index) => {
            rscr3.push(prices23.close[index]);
        });
        total = 0;
        for (let i = 0; i < rscr3.length; i++) {
            total += rscr3[i];
        }
        let avg33 = total / rscr3.length;



        // wheatCode
        // 3-1. 抓取歷史數據(3 month)
        // const rswht = await yF.historical(wheatCode, query3Month);
        // console.log((rswht[rswht.length - 1].close).toFixed(4).toString());
        const chartData31 = await yF.chart(wheatCode, query3Month);

        const timestamps31 = chartData31.timestamp;
        const prices31 = chartData31.indicators.quote[0];
        let rswht = [];
        timestamps31.forEach((timestamp, index) => {
            rswht.push(prices31.close[index]);
        });

        total = 0;
        for (let i = 0; i < rswht.length; i++) {
            total += rswht[i];
        }
        let avg41 = total / rswht.length;

        // 3-2. 抓取歷史數據(3year 3 month)
        // const rswht2 = await yF.historical(wheatCode, querybefore3Year);
        const chartData32 = await yF.chart(wheatCode, querybefore3Year);

        const timestamps32 = chartData32.timestamp;
        const prices32 = chartData32.indicators.quote[0];
        let rswht2 = [];
        timestamps32.forEach((timestamp, index) => {
            rswht2.push(prices32.close[index]);
        });
        total = 0;
        for (let i = 0; i < rswht2.length; i++) {
            total += rswht2[i];
        }
        let avg42 = total / rswht2.length;

        // 3-3. 抓取歷史數據(5year 3 month)
        // const rswht3 = await yF.historical(wheatCode, querybefore5Year);
        const chartData33 = await yF.chart(wheatCode, querybefore5Year);

        const timestamps33 = chartData33.timestamp;
        const prices33 = chartData33.indicators.quote[0];
        let rswht3 = [];
        timestamps33.forEach((timestamp, index) => {
            rswht3.push(prices33.close[index]);
        });
        total = 0;
        for (let i = 0; i < rswht3.length; i++) {
            total += rswht3[i];
        }
        let avg43 = total / rswht3.length;


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

        // 黃豆卡片
        const soybean = template()
        soybean.body.contents[0].text = '黃豆'
        soybean.body.contents[1].contents[1].text = (rssb.at(-2)).toFixed(3).toString()
        soybean.body.contents[2].contents[1].text = avg21.toFixed(3).toString()
        soybean.body.contents[3].contents[1].text = avg22.toFixed(3).toString()
        soybean.body.contents[4].contents[1].text = avg23.toFixed(3).toString()
        soybean.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
        })
        // 玉米卡片
        const corn = template()
        corn.body.contents[0].text = '玉米'
        corn.body.contents[1].contents[1].text = (rscr.at(-2)).toFixed(3).toString()
        corn.body.contents[2].contents[1].text = avg31.toFixed(3).toString()
        corn.body.contents[3].contents[1].text = avg32.toFixed(3).toString()
        corn.body.contents[4].contents[1].text = avg33.toFixed(3).toString()
        corn.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
        })
        // 小麥卡片
        const wheat = template()
        wheat.body.contents[0].text = '小麥'
        wheat.body.contents[1].contents[1].text = (rswht.at(-2)).toFixed(3).toString()
        wheat.body.contents[2].contents[1].text = avg41.toFixed(3).toString()
        wheat.body.contents[3].contents[1].text = avg42.toFixed(3).toString()
        wheat.body.contents[4].contents[1].text = avg43.toFixed(3).toString()
        wheat.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
        })

        const message = {
            type: 'flex',
            altText: '農產品查詢結果',
            contents: {
                type: 'carousel',
                contents: [usd, soybean, corn, wheat],
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