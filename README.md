### Fork di [ondata/quotazioni-immobiliari-agenzia-entrate](https://github.com/ondata/quotazioni-immobiliari-agenzia-entrate) 
- Aggiunto formato .json
- Aggiunti helper per la ricerca dei dati

### Uso
```
git clone https://github.com/nicosh/quotazioni-immobiliari-agenzia-entrate.git 
cd quotazioni-immobiliari-agenzia-entrate
npm install
// generare json : 
node --max-old-space-size=8192 buildJson.js  
```

### Esempi lettura dati
```
const {findLocations,getLocationData,getAggregatedData} = require('./utils');
let locationsByName = findLocations("ROMA","20182") // nome città , semestre. 20182 = secondo semestre 2018
let locationsByIstat = findLocations("12058091","20182") // cod. istat, semestre. 20182 = secondo semestre 2018
let locationData = getLocationData("RM00000121","20182") // Link zona , semestre
let locationData = getLocationData("RM00000121","20182","Uffici") // Link zona , semestre, tipologia
let aggregatedDataByIstat = getAggregatedData("12058091","20182") // media prezzi per comune

```