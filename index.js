const {findLocations,getLocationData,getAggregatedData} = require('./utils');
let locationsByName = findLocations("ROMA","20182") // nome città , semestre. 20182 = secondo semestre 2018
let locationsByIstat = findLocations("12058091","20182") // cod. istat, semestre. 20182 = secondo semestre 2018
let locationData = getLocationData("RM00000121","20182") // Link zona , semestre
let aggregatedDataByIstat = getAggregatedData("12058091","20182") // media prezzi per comune
