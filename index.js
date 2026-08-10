import 'dotenv/config'
import linebot from 'linebot'
import commandEnergy from './commands/energy.js'
import commandProduce from './commands/produce.js'
import commandMetal from './commands/metal.js'
import commandWda from './commands/wda.js'


const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

bot.on('message', (event) => {
  if (event.message.type === 'text') {
    if (event.message.text === '能源') {
        commandEnergy(event);
    } else if (event.message.text === '金屬') {
        commandMetal(event);
    } else if (event.message.text === '農產品') {
        commandProduce(event);
    }
  }
})

bot.on('postback', (event) => {
  if (event.postback.data === 'course') {
    commandWda(event)
  }
});

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
});

/*
const yF = new YahooFinance();
const usd = "USDTWD=X";
const wtioil = "CL=F";
const brOil = "BZ=F";
const rboboil = "RB=F";
const gas = "NG=F";

const gold = "GC=F";
const silver = "SI=F";
const copper = "HG=F";
const aluminum = "ALI=F";

const soybean = "ZS=F";
const corn = "ZC=F";
const wheat = "Zw=F";


(async function () {
    // 1-1. 取得當前時間與 1 年前的時間
    const endDate1 = new Date();
    const startDate1 = new Date();
    endDate1.setDate(endDate1.getDate() -1);
    startDate1.setFullYear(endDate1.getFullYear() - 1);

    // 1-2. 計算當前與 6 個月前的日期
    const endDate2 = new Date();
    const startDate2 = new Date();
    endDate2.setDate(endDate2.getDate() -1);
    startDate2.setMonth(endDate2.getMonth() - 6);

    // 1-3. 計算當前與 1 個月前的日期
    const endDate3 = new Date();
    const startDate3 = new Date();
    endDate3.setDate(endDate3.getDate() -1);
    startDate3.setMonth(endDate3.getMonth() - 1);

    // 1-4. 取得當前時間與 3 年前的時間
    const endDate4 = new Date();
    const startDate4 = new Date();
    endDate4.setDate(endDate4.getDate() -1);
    startDate4.setFullYear(endDate4.getFullYear() - 3);

    // 2. 帶入查詢參數
    const queryOptions1 = { 
        period1: startDate1, 
        period2: endDate1 
    };
    const queryOptions2 = { 
        period1: startDate2, 
        period2: endDate2 
    };
    const queryOptions3 = { 
        period1: startDate3, 
        period2: endDate3 
    };
     const queryOptions4 = { 
        period1: startDate4, 
        period2: endDate4 
    };
    const rs1 = await yF.historical(usd, queryOptions1);
    const rs2 = await yF.historical(usd, queryOptions2);
    const rs3 = await yF.historical(usd, queryOptions3);
    const rs4 = await yF.historical(usd, queryOptions4);
    // const name = rsA.price.shortName;
    let total = 0, avg;
    for(let i = 0; i < rs3.length; i++){
        total += rs3[i].close;
    }
    avg = total / rs3.length;
    console.log('1 month: '+avg);
    console.log(rs3.length);
    // console.log(total);
    total = 0
    for(let i = 0; i < rs2.length; i++){
        total += rs2[i].close;
    }
    avg = total / rs2.length;
    console.log('6 month: '+avg);
    console.log(rs2.length);

    total = 0
    for(let i = 0; i < rs1.length; i++){
        total += rs1[i].close;
    }
    avg = total / rs1.length;
    console.log('1 year: '+avg);
    console.log(rs1.length);

    total = 0;
    for(let i = 0; i < rs4.length; i++){
        total += rs4[i].close;
    }
    avg = total / rs4.length;
    console.log('3 year: '+avg);
    console.log(rs4.length);
        
})();
*/
