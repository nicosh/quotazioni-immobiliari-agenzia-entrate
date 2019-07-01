// node --max-old-space-size=8192 buildJson.js  

const csv = require('csvtojson')
const fs = require('fs');
const {recFindByExt} = require('./utils');
const csvs = recFindByExt('./data','csv')

csvs.forEach(file=>{
    csv().fromFile(`./${file}`).then((jsonObj)=>{
        let json = JSON.stringify(jsonObj);
        let newfilename  = file.substr(0, file.lastIndexOf(".")) + ".json";
        fs.writeFile(`./jsonData/${newfilename}`, json, 'utf8', (res)=>{
            console.log(`./jsonData/${newfilename}`)
        });
    })
})
