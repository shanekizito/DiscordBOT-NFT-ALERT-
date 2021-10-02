
import { readFile } from 'fs/promises';
import Discord from "discord.js";


const json = JSON.parse(await readFile(new URL('./config.json', import.meta.url)));
import{ Client, MessageEmbed, Intents,WebhookClient } from 'discord.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

import fetch from 'node-fetch';

 const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/892827914712809513/U9gbyNUEqAiNEQGlZSTHFPZBk1yByGbpvTsATWnMuDm_vrq7xiAAKTvrPBhoO0I5lnux' });


import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const config= require("./config.json") // use the require method










client.once("ready", () => {
  console.log("Ready for action!");
});


setInterval(function(){ 

 
  const options = {method: 'GET'};

fetch('https://api.opensea.io/api/v1/assets?owner=0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459&order_direction=desc&offset=0&limit=50', options)
  .then(response => response.json())
  .then(response =>{

  let length=response.assets.length;

  
    


  let i;
  let  collectionID=[];
  let collectionName=[];


  for(i=0;i<length;i++){
      
    const filtering=async function getItem (){

   
      const  description=response.assets[i].description;
      const title=response.assets[i].name;
      const value=response.assets[1].owner.user.username;
      const infieldTitle=response.assets[i].collection.description;
      const valueHere=response.assets[i].permalink;
      const setThumbnail=response.assets[i].collection.image_url;
      let id=response.assets[i].id;
      collectionID.push(id);
      let name=response.assets[i].asset_contract.name
      collectionName.push(name);
    
     
      const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('NEW NFT ADDED')
      .setAuthor('BOT', `${setThumbnail}`, `${valueHere}`)
      .setThumbnail(`${setThumbnail}`)
      .addFields(
        { name: 'ID ', value: `${id}`},
        { name: '\u200B', value: '\u200B' },
        { name: 'Owner', value: `${value}`, inline: true },
        { name: 'Link', value:`${valueHere}`, inline: true },
      )
      .addField('Description :', `${infieldTitle}`, true)
      .setImage(`${setThumbnail}`)
      .setTimestamp()
      .setFooter('At your service', 'https://img.icons8.com/emoji/48/000000/baby-chick--v2.png');
     
       let contents={content: valueHere}
       // console.log(collectionName);

 
    let filterID= function (collectionID,id) {return collectionID.filter(id);}
    let filterName=function(collectionName,name){return collectionName.filter(name);}
    let x=0;
    for(x=0;x<collectionID.length;x++){
      
    if(filterID==collectionID && filterName==collectionID ){continue}  
   




     
}
  
  
}
filtering();
  }





  });

const options2 = {method: 'GET', headers: {Accept: 'application/json'}};


fetch('https://api.opensea.io/api/v1/events?account_address=0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459&event_type=successful&only_opensea=false&offset=0&limit=20', options2)
  .then(response => response.json())
  .then(response => {


    
   console.log(response.asset_events[0].asset.name)
    let assetLength= response.asset_events.length;

    let a;

    for(a=0;a<assetLength;a++) {
      const sellPrice=response.asset_events[a].dev_fee_payment_event.payment_token.eth_price
     console.log(sellPrice)
    const sellName=response.asset_events[a].asset.name;
    const assetImage=response.asset_events[a].asset.image_url;
    
    const SellCollection=response.asset_events[a].asset.asset_contract.name
    const collectionLink=response.asset_events[a].asset.external_link;
    let assetsOnSell=[];
    assetsOnSell.push(sellName);
    
  
    console.log('done');
  
      const embedSell = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${sellName}`)
      .setAuthor('BOT', `${assetImage}`, `${collectionLink}`)
      .setThumbnail(`${assetImage}`)
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Collection Name', value: `${SellCollection}`, inline: true },
        //{ name: 'Link', value:`${valueHere}`, inline: true },
      )
      .addField('PRICE  :', `${sellPrice}ETH`, true)
      .setImage(`${assetImage}`)
      .setTimestamp()
      .setFooter('At your service', 'https://img.icons8.com/emoji/48/000000/baby-chick--v2.png');
    
    
      webhookClient.send({
       
        
        username: 'SELL ALERT',
        avatarURL: 'https://img.icons8.com/emoji/48/000000/baby-chick--v2.png',
        embeds:[embedSell]
      
          })
    
  
  
  
  
      
    }
  
   
  













  })
  .catch(err => console.error(err));


 

}, 2000);

   
 

client.login(config.token);