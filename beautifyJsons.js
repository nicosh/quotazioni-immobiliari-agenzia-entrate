const csv = require('csvtojson')
const fs = require('fs');
const {recFindByExt} = require('./utils');
const csvs = recFindByExt('./jsonData/data/zone','json')

csvs.forEach(file=>{
    let json = require(`./${file}`)
    json.forEach(el=>{
        console.log(el["Zona_Descr"])
    })
})
