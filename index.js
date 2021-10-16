
import { readFile } from 'fs/promises';
import Discord from "discord.js";
import{ Client, MessageEmbed, Intents,WebhookClient } from 'discord.js'
import fetch from 'node-fetch';
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import { match } from 'assert/strict';


const json = JSON.parse(await readFile(new URL('./config.json', import.meta.url)));

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/892827914712809513/U9gbyNUEqAiNEQGlZSTHFPZBk1yByGbpvTsATWnMuDm_vrq7xiAAKTvrPBhoO0I5lnux' });


const require = createRequire(import.meta.url); // construct the require method

const config= require("./config.json") // use the require method

require('dotenv').config();


client.once("ready", () => {
  console.log("Ready for action!");
});




let listCollection=[];
let listID;


setInterval(function(){ 

  const options3 = {method: 'GET', headers: {Accept: 'application/json'}};

  fetch('https://api.opensea.io/api/v1/events?asset_contract_address=0x2d3f39663d43c0862589a8a24bf05ccd44b0ac4d&event_type=created&only_opensea=false&offset=0&limit=300', options3)
    .then(response => response.json())
    .then(response => {

      let toadzLength=response.asset_events.length;
      let p;
      let toadzCollection=[];

       
       for(p=0;p<=toadzLength;p++){
       
        const listName=response.asset_events[p].asset.name;
        const assetImage=response.asset_events[p].asset.image_url;
        const listLink=response.asset_events[p].asset.permalink;
        const  listDescription=response.asset_events[p].asset.description;
        listID=response.asset_events[p].asset.id;

         var  idList=function(){
          return listID

        }
         var filterListID=listCollection.filter(idList);

         
        
        console.log(filterListID)
        if(filterListID==listID) continue;
        
        let match=response.asset_events[p].starting_price/1000000000000000000;
       
        // console.log(match,listName)
       
        if(match<1 ) {
        let i;
      
        listCollection.push(listID);
          toadzCollection.push(match);
         // console.log(toadzCollection);
        
        console.log(listCollection)
          
         
        const embedSellz = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`${listName}`)
          .setAuthor('ID', `${assetImage}`, `${listLink}`)
          .setThumbnail(`${assetImage}`)
          .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Description :', value: `${listDescription}`, inline: true },
            { name: 'Link', value:`${listLink}`, inline: true },
          )
          .addField('PRICE  :', `${match}ETH`, true)
          .setImage(`${assetImage}`)
          .setTimestamp()
          .setFooter('At your service', 'https://img.icons8.com/emoji/48/000000/baby-chick--v2.png');
  

          
          webhookClient.send({
           
            
            username: 'LISTING ALERT',
            avatarURL: 'https://img.icons8.com/emoji/48/000000/baby-chick--v2.png',
            embeds:[embedSellz]
          
         })
       }

     }

    } ).catch(err => console.error(err));



const options = {method: 'GET'};

fetch('https://api.opensea.io/api/v1/assets?owner=0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459&order_direction=desc&offset=0&limit=50', options)
  .then(res => res.json())
  .then(res =>{

  let length=res.assets.length;
  let i;
  let  collectionID=[];
  let collectionName=[];


  for(i=0;i<length;i++){
      
    const filtering=async function getItem (){

   
      const  description=res.assets[i].description;
      const title=res.assets[i].name;
      const value=res.assets[1].owner.user.username;
      const infieldTitle=res.assets[i].collection.description;
      const valueHere=res.assets[i].permalink;
      const setThumbnail=res.assets[i].collection.image_url;
      let id=res.assets[i].id;
      collectionID.push(id);
      let name=res.assets[i].asset_contract.name
      collectionName.push(name);
    
     /*
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
     
      */
       let contents={content: valueHere}
       // console.log(collectionName);

 
    let filterID= function (collectionID,id) {return collectionID.filter(id);}
    let filterName=function(collectionName,name){return collectionName.filter(name);}
    let x=0;
    for(x=0;x<collectionID.length;x++){
      
    if(filterID==collectionID && filterName==collectionID ){continue}  

//filterid

     
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
    const listImage=response.asset_events[a].asset.image_url;
    
    const SellCollection=response.asset_events[a].asset.asset_contract.name
    const collectionLink=response.asset_events[a].asset.external_link;
    let assetsOnSell=[];
    assetsOnSell.push(sellName);
    
  
    console.log('done');
  
      const embedSell = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${sellName}`)
      .setAuthor('BOT', `${listImage}`, `${collectionLink}`)
      .setThumbnail(`${listImage}`)
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Collection Name', value: `${SellCollection}`, inline: true },
        //{ name: 'Link', value:`${valueHere}`, inline: true },
      )
      .addField('PRICE  :', `${sellPrice}ETH`, true)
      .setImage(`${listImage}`)
      .setTimestamp()
      .setFooter('At your service', 'https://img.icons8.com/emoji/48/000000/baby-chick--v2.png');
    
    /*
      webhookClient.send({
       
        
        username: 'SELL ALERT',
        avatarURL: 'https://img.icons8.com/emoji/48/000000/baby-chick--v2.png',
        embeds:[embedSell]
      
          })
    
  */
  
  
  }

}).catch(err => console.error(err));


 

}, 3000);

   
 

client.login(process.env.token);