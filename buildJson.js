// node --max-old-space-size=8192 buildJson.js  

const csv = require('csvtojson')
const fs = require('fs');
const {recFindByExt} = require('./utils');
const zone = recFindByExt('./data/zone','csv')
const valori = recFindByExt('./data/valori','csv')


zone.forEach(file=>{
    csv().fromFile(`./${file}`).then((jsonObj)=>{
        let newfilename  = file.substr(0, file.lastIndexOf(".")) + ".json";
        let newjson = jsonObj.map((curr)=>({
            ...curr,
            Zona_Descr: curr.Zona_Descr.replace(/\'/g,""),
        }))
        let json = JSON.stringify(newjson);
        fs.writeFile(`./jsonData/${newfilename}`, json, 'utf8', (res)=>{
            console.log(`./jsonData/${newfilename}`)
        });
    })
})

valori.forEach(file=>{
    csv().fromFile(`./${file}`).then((jsonObj)=>{
        let newfilename  = file.substr(0, file.lastIndexOf(".")) + ".json";
        let newjson = jsonObj.map((curr)=>({
            ...curr,
            Compr_max  : Number(curr.Compr_max) || "",
            Compr_min  : Number(curr.Compr_min) || "",
            Loc_min: parseFloat(curr.Loc_min.replace(",",".")),
            Loc_max: parseFloat(curr.Loc_max.replace(",",".")),

        }))
        let json = JSON.stringify(newjson);
        fs.writeFile(`./jsonData/${newfilename}`, json, 'utf8', (res)=>{
            console.log(`./jsonData/${newfilename}`)
        });
    })
})
