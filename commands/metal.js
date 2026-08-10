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
        period2: today
    };

    // 三年前的近三個月
    const querybefore3Year = { 
        period1: before3YearAnd3MonDate, 
        period2: before3YearDate
    };

    // 五年前的近三個月
    const querybefore5Year = { 
        period1: before5YearAnd3MonDate, 
        period2: before5YearDate 
    };

    // 3-1. 抓取歷史數據(3 month)
    const rsusd = await yF.historical(usdcode, query3Month);
    console.log((rsusd[rsusd.length - 1].close).toFixed(4).toString());

    let total = 0;
    for(let i = 0; i < rsusd.length; i++){
        total += rsusd[i].close;
    }
    avg = total / rsusd.length;

    // 3-2. 抓取歷史數據(3year 3 month)
    const rsusd2 = await yF.historical(usdcode, querybefore3Year);
    total = 0;
    for(let i = 0; i < rsusd2.length; i++){
        total += rsusd2[i].close;
    }
    let avg2 = total / rsusd2.length;

    // 3-3. 抓取歷史數據(5year 3 month)
    const rsusd3 = await yF.historical(usdcode, querybefore5Year);
    total = 0;
    for(let i = 0; i < rsusd3.length; i++){
        total += rsusd3[i].close;
    }
    let avg3 = total / rsusd3.length;

 // 3-1. 抓取歷史數據(3 month)
    const rsgd = await yF.historical(goldCode, query3Month);
    console.log((rsgd[rsgd.length - 1].close).toFixed(4).toString());

    total = 0;
    for(let i = 0; i < rsgd.length; i++){
        total += rsgd[i].close;
    }
    let avg21 = total / rsgd.length;

    // 3-2. 抓取歷史數據(3year 3 month)
    const rsgd2 = await yF.historical(goldCode, querybefore3Year);
    total = 0;
    for(let i = 0; i < rsgd2.length; i++){
        total += rsgd2[i].close;
    }
    let avg22 = total / rsgd2.length;

    // 3-3. 抓取歷史數據(5year 3 month)
    const rsgd3 = await yF.historical(goldCode, querybefore5Year);
    total = 0;
    for(let i = 0; i < rsgd3.length; i++){
        total += rsgd3[i].close;
    }
    let avg23 = total / rsgd3.length;

    
    // 3-1. 抓取歷史數據(3 month)
    const rssl = await yF.historical(silverCode, query3Month);
    console.log((rssl[rssl.length - 1].close).toFixed(4).toString());

    total = 0;
    for(let i = 0; i < rssl.length; i++){
        total += rssl[i].close;
    }
    let avg31 = total / rssl.length;

    // 3-2. 抓取歷史數據(3year 3 month)
    const rssl2 = await yF.historical(silverCode, querybefore3Year);
    total = 0;
    for(let i = 0; i < rssl2.length; i++){
        total += rssl2[i].close;
    }
    let avg32 = total / rssl2.length;

    // 3-3. 抓取歷史數據(5year 3 month)
    const rssl3 = await yF.historical(silverCode, querybefore5Year);
    total = 0;
    for(let i = 0; i < rssl3.length; i++){
        total += rssl3[i].close;
    }
    let avg33 = total / rssl3.length;


    // 3-1. 抓取歷史數據(3 month)
    const rscp = await yF.historical(copperCode, query3Month);
    console.log((rscp[rscp.length - 1].close).toFixed(4).toString());

    total = 0;
    for(let i = 0; i < rscp.length; i++){
        total += rscp[i].close;
    }
    let avg41 = total / rscp.length;

    // 3-2. 抓取歷史數據(3year 3 month)
    const rscp2 = await yF.historical(copperCode, querybefore3Year);
    total = 0;
    for(let i = 0; i < rscp2.length; i++){
        total += rscp2[i].close;
    }
    let avg42 = total / rscp2.length;

    // 3-3. 抓取歷史數據(5year 3 month)
    const rscp3 = await yF.historical(copperCode, querybefore5Year);
    total = 0;
    for(let i = 0; i < rscp3.length; i++){
        total += rscp3[i].close;
    }
    let avg43 = total / rscp3.length;

    
    // 3-1. 抓取歷史數據(3 month)
    const rsal = await yF.historical(aluminumCode, query3Month);
    console.log((rsal[rsal.length - 1].close).toFixed(4).toString());

    total = 0;
    for(let i = 0; i < rsal.length; i++){
        total += rsal[i].close;
    }
    let avg51 = total / rsal.length;

    // 3-2. 抓取歷史數據(3year 3 month)
    const rsal2 = await yF.historical(aluminumCode, querybefore3Year);
    total = 0;
    for(let i = 0; i < rsal2.length; i++){
        total += rsal2[i].close;
    }
    let avg52 = total / rsal2.length;

    // 3-3. 抓取歷史數據(5year 3 month)
    const rsal3 = await yF.historical(aluminumCode, querybefore5Year);
    total = 0;
    for(let i = 0; i < rsal3.length; i++){
        total += rsal3[i].close;
    }
    let avg53 = total / rsal3.length;




    const { data } = await axios.get('https://tw.rter.info/capi.php')

    // 美元卡片
    const usd = template()
        usd.body.contents[0].text = '美元'
        usd.body.contents[1].contents[1].text = (rsusd[rsusd.length - 1].close).toFixed(3).toString()
        usd.body.contents[2].contents[1].text = avg.toFixed(3).toString()
        usd.body.contents[3].contents[1].text = avg2.toFixed(3).toString()
        usd.body.contents[4].contents[1].text = avg3.toFixed(3).toString()
        usd.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
          timeZone: 'Asia/Taipei',
        })
    // 黃金卡片
    const gold = template()
    gold.body.contents[0].text = '貴金屬-黃金'
    gold.body.contents[1].contents[1].text = (rsgd[rsgd.length - 1].close).toFixed(3).toString()
        gold.body.contents[2].contents[1].text = avg21.toFixed(3).toString()
        gold.body.contents[3].contents[1].text = avg22.toFixed(3).toString()
        gold.body.contents[4].contents[1].text = avg23.toFixed(3).toString()
        gold.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
          timeZone: 'Asia/Taipei',
        })
    // 白銀卡片
    const silver = template()
    silver.body.contents[0].text = '貴金屬-白銀'
    silver.body.contents[1].contents[1].text = (rssl[rssl.length - 1].close).toFixed(3).toString()
        silver.body.contents[2].contents[1].text = avg31.toFixed(3).toString()
        silver.body.contents[3].contents[1].text = avg32.toFixed(3).toString()
        silver.body.contents[4].contents[1].text = avg33.toFixed(3).toString()
        silver.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
          timeZone: 'Asia/Taipei',
        })
    // 銅卡片
    const copper = template()
    copper.body.contents[0].text = '工業金屬-銅'
       copper.body.contents[1].contents[1].text = (rscp[rscp.length - 1].close).toFixed(3).toString()
        copper.body.contents[2].contents[1].text = avg41.toFixed(3).toString()
        copper.body.contents[3].contents[1].text = avg42.toFixed(3).toString()
        copper.body.contents[4].contents[1].text = avg43.toFixed(3).toString()
        copper.body.contents[5].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
          timeZone: 'Asia/Taipei',
        })
    // 鋁卡片
    const aluminum = template()
    aluminum.body.contents[0].text = '工業金屬-鋁'
    aluminum.body.contents[1].contents[1].text = (rsal[rsal.length - 1].close).toFixed(3).toString()
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