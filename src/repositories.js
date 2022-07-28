const allRespositories = [
    {"facility_code":"ACC","facility":"Antarctic Core Collection, Oregon State University"},
    {"facility_code":"AOML","facility":"NOAA-Atlantic Oceanographic and Meteorol. Lab"},
    {"facility_code":"AWI","facility":"Alfred Wegener Institut"},
    {"facility_code":"BOSCORF","facility":"British Ocean Sediment Core Research Facility"},
    {"facility_code":"BPCRC","facility":"BPCRC Sediment Core Repository"},
    {"facility_code":"BPCRR","facility":"Polar Rock Repository, BPCRC"},
    {"facility_code":"Canada","facility":"Geological Survey of Canada (GSC)"},
    {"facility_code":"DSDP","facility":"Deep Sea Drilling Project"},
    {"facility_code":"ECS","facility":"US Extended Continental Shelf Samples Repository"},
    {"facility_code":"France","facility":"Universite de Savoie, EDYTEM"},
    {"facility_code":"GEOMAR","facility":"GEOMAR Helmholtz Centre for Ocean Research Kiel"},
    {"facility_code":"IODP","facility":"International Ocean Discovery Program"},
    {"facility_code":"LDEO","facility":"Lamont-Doherty Earth Observatory"},
    {"facility_code":"LacCore","facility":"National Lacustrine Core Repository"},
    {"facility_code":"NMNH","facility":"National Museum of Natural History"},
    {"facility_code":"ODP","facility":"Ocean Drilling Program"},
    {"facility_code":"OER","facility":"NOAA Office of Ocean Exploration and Research"},
    {"facility_code":"OSU","facility":"Oregon State Univ Marine and Geology Repository"},
    {"facility_code":"PMEL","facility":"NOAA-Pacific Marine Environmental Labs"},
    {"facility_code":"RSMAS","facility":"Rosenstiel School of Marine & Atmos. Sciences"},
    {"facility_code":"SIO","facility":"Scripps Institution of Oceanography"},
    {"facility_code":"SOEST","facility":"University of Hawaii at Manoa"},
    {"facility_code":"U WISC","facility":"University of Wisconsin-Madison"},
    {"facility_code":"URI","facility":"University of Rhode Island"},
    {"facility_code":"USC","facility":"University of Southern California"},
    {"facility_code":"USGSMP","facility":"Pacific Coastal and Marine Science Center"},{
    "facility_code":"USGSSP","facility":"St. Petersburg Coastal and Marine Science Center"},
    {"facility_code":"USGSWH","facility":"Woods Hole Coastal and Marine Science Center"},
    {"facility_code":"UT","facility":"Univ of Texas Marine Science Institute"},
    {"facility_code":"WHOI","facility":"Woods Hole Oceanographic Institution"}
]

export function lookupRepositoryByCode(code) {
    return(allRespositories.map(item => {return({value: item.facility_code, label:item.facility})})
        .find((item) => item.value === code))

}