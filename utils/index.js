const fs = require('fs');
var path = require('path')

const  recFindByExt = (base,ext,files,result)=> {
    files = files || fs.readdirSync(base) 
    result = result || [] 
    files.forEach((file) => {
        var newbase = path.join(base,file)
        if ( fs.statSync(newbase).isDirectory()){
            result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
        }else{
            if ( file.substr(-1*(ext.length+1)) == '.' + ext ){
                result.push(newbase)
            } 
        }
    })
    return result
}

const findLocations = (NameOrCode,time) =>{
    const csvs = recFindByExt('./jsonData/data/zone','json')
    let data;
    csvs.forEach(json=>{
        let exploded = json.split("_");
        if(exploded[3] == time){
            let obj = require(`../${json}`)
            data = obj.filter(entry=>{
                return  entry["Comune_descrizione"] == NameOrCode || entry["Comune_ISTAT"] == NameOrCode ? entry :  false
            })
        }
    })
    return data;
}

const getLocationData = (LinkZona,time,tipologia=null)=>{
    const csvs = recFindByExt('./jsonData/data/valori','json')
    let data;
    csvs.forEach(json=>{
        let exploded = json.split("_");
        if(exploded[3] == time){
            let obj = require(`../${json}`)
            data = obj.filter(entry=>{
                let type = tipologia ? entry["Descr_Tipologia"] == tipologia : true
                let loc =   entry["LinkZona"] == LinkZona || entry["Comune_ISTAT"] == LinkZona ? entry :  false
                return loc && type
            })
        }
    })
    return data;
}

const getAggregatedData = (istat,time)=>{
    let locationList = getLocationData(istat,time)
    let reduced = locationList.reduce((acc,curr)=>({
        comune : curr.Comune_descrizione,
        Comune_ISTAT: curr.Comune_ISTAT,
        Compr_max: Number(acc.Compr_max) + Number(curr.Compr_max),
        Compr_min: Number(acc.Compr_min) + Number(curr.Compr_min),
        Loc_min: acc.Loc_min + curr.Loc_min,
        Loc_max: acc.Loc_max + curr.Loc_max,
    }))
    reduced.Compr_max = reduced.Compr_max / locationList.length
    reduced.Compr_min = reduced.Compr_min / locationList.length
    reduced.Loc_min = reduced.Loc_min / locationList.length
    reduced.Loc_max = reduced.Loc_max / locationList.length
    return reduced
}

module.exports.recFindByExt = recFindByExt;  
module.exports.findLocations = findLocations;  
module.exports.getLocationData = getLocationData;  
module.exports.getAggregatedData = getAggregatedData;  
