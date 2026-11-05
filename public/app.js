const NOW = 2026;
const LG = ['MLB', 'NHL', 'NBA', 'NFL'];
const LGLONG = { MLB: 'Baseball', NHL: 'Hockey', NBA: 'Basketball', NFL: 'Football' };
const ELIG = { MLB: 1903, NHL: 1927, NBA: 1947, NFL: 1967 };
const ICON = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  clock: 'M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM12 7.5V12l3 2',
  minus: 'M6 12h12',
  dot: 'M12 12h.01',
  x: 'M6 6l12 12M18 6L6 18',
  sun: 'M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z',
  reset: 'M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8M3 3v5h5',
  chevDown: 'M6 9l6 6 6-6',
  chevUp: 'M6 15l6-6 6 6',
  grip: 'M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01'
};
// league icons: baseball, hockey stick and puck, basketball, football
const LGI = {
  MLB: 'M12 3a9 9 0 100 18 9 9 0 000-18zM6.3 5.2c2.4 2.4 2.4 11.2 0 13.6M17.7 5.2c-2.4 2.4-2.4 11.2 0 13.6',
  NHL: 'M6 3l7.5 14h5.5M14.5 20.5a2.5 1 0 105 0 2.5 1 0 10-5 0',
  NBA: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 3v18M3 12h18M5.6 5.6c3 3.2 3 9.6 0 12.8M18.4 5.6c-3 3.2-3 9.6 0 12.8',
  NFL: 'M3.5 20.5C2.8 11.5 11.5 2.8 20.5 3.5 21.2 12.5 12.5 21.2 3.5 20.5zM9.2 14.8l5.6-5.6M9.6 12.6l1.8 1.8M11.1 11.1l1.8 1.8M12.6 9.6l1.8 1.8'
};
const lgm = (c) => ({ ic: LGI[c], lc: 'lg-' + c.toLowerCase() });
const CMP_MAX = 8;
const STAT = {
  W: { word: 'Won', icon: 'check', cls: 'st-won' },
  T: { word: 'Waiting', icon: 'clock', cls: 'st-wait' },
  L: { word: 'Team left', icon: 'minus', cls: 'st-left' },
  N: { word: 'No team', icon: 'dot', cls: 'st-none' }
};
const ERAS = [
  { id: 'all', label: 'All years', sub: '1903 to 2026', from: 1903 },
  { id: 'sb', label: 'Super Bowl era', sub: '1967 to 2026', from: 1967 },
  { id: 'y2000', label: 'Since 2000', sub: '2000 to 2026', from: 2000 },
  { id: 'l10', label: 'Last 10 seasons', sub: '2017 to 2026', from: 2017 }
];
const METRICS = [
  { id: 'titles', label: 'Titles', hint: 'Titles: total championships, stacked by league.' },
  { id: 'perm', label: 'Per million residents', hint: 'Per million residents: titles divided by the metro population in millions (2020 workbook figures).' },
  { id: 'index', label: 'Against population share', hint: 'Against population share: a metro’s titles divided by the number an even spread by population would give. Bars to the right of the line are above an even share.' }
];
const DECADES = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];
const D = {
  metros: [["boston","Boston","MA","US",["Boston","New England"],4713460.0,0,"WWWW"],["new-york","New York","NY","US",["New York","Long Island"],21364658.0,0,"WWWW"],["chicago","Chicago","IL","US",["Chicago"],9823894.0,0,"WWWW"],["pittsburgh","Pittsburgh","PA","US",["Pittsburgh"],2313663.0,0,"WWNW"],["philadelphia","Philadelphia","PA","US",["Philadelphia"],6588000.0,0,"WWWW"],["cincinnati","Cincinnati","OH","US",["Cincinnati"],2294207.0,0,"WNLT"],["cleveland","Cleveland","OH","US",["Cleveland"],2077240.0,0,"WLWT"],["washington","Washington, D.C.","DC","US",["Washington"],5460000.0,0,"WWWW"],["st-louis","St. Louis","MO","US",["St. Louis"],2414000.0,0,"WWWW"],["ottawa","Ottawa","ON","CA",["Ottawa"],981778.1,0,"NWNN"],["montreal","Montreal","QC","CA",["Montreal"],4220566.0,0,"LWNN"],["toronto","Toronto","ON","CA",["Toronto"],6393214.3,0,"WWWN"],["detroit","Detroit","MI","US",["Detroit"],4417000.0,0,"WWWT"],["baltimore","Baltimore","MD","US",["Baltimore"],2743000.0,0,"WNWW"],["minneapolis","Minneapolis–St. Paul","MN","US",["Minneapolis","Minnesota"],2913000.0,0,"WTWT"],["brooklyn","Brooklyn","NY","US",["Brooklyn"],2544074.0,1,"WNTN"],["rochester","Rochester","NY","US",["Rochester"],1121511.0,0,"NNWN"],["syracuse","Syracuse","NY","US",["Syracuse"],675000.0,0,"NNWN"],["milwaukee","Milwaukee / Green Bay","WI","US",["Milwaukee","Green Bay"],1611075.0,0,"WNWW"],["los-angeles","Los Angeles / Anaheim","CA","US",["Los Angeles","Anaheim"],16839000.0,0,"WWWW"],["kansas-city","Kansas City","MO","US",["Kansas City"],2398880.0,0,"WLLW"],["bay-area","San Francisco Bay Area","CA","US",["Oakland","San Francisco","Golden State","San Jose"],7683000.0,0,"WTWW"],["dallas","Dallas–Fort Worth","TX","US",["Dallas","Texas"],6925000.0,0,"WWWW"],["portland","Portland","OR","US",["Portland"],2524137.0,0,"NNWN"],["seattle","Seattle","WA","US",["Seattle"],3835740.0,0,"TTWW"],["edmonton","Edmonton","AB","CA",["Edmonton"],943688.3,0,"NWNN"],["calgary","Calgary","AB","CA",["Calgary"],1293003.3,0,"NWNN"],["houston","Houston","TX","US",["Houston"],6701000.0,0,"WNWT"],["new-jersey","New Jersey","NJ","US",["New Jersey"],280734.0,1,"NWNN"],["denver","Denver / Colorado","CO","US",["Denver","Colorado"],2850494.0,0,"TWWW"],["atlanta","Atlanta","GA","US",["Atlanta"],5373802.0,0,"WLTT"],["south-florida","South Florida","FL","US",["Miami","Florida"],6107000.0,0,"WWWW"],["san-antonio","San Antonio","TX","US",["San Antonio"],3266835.0,0,"NNWN"],["phoenix","Phoenix / Arizona","AZ","US",["Phoenix","Arizona"],4751000.0,0,"WLTT"],["tampa-bay","Tampa Bay","FL","US",["Tampa Bay"],3889329.0,0,"TWNW"],["carolina","Carolinas","NC","US",["Charlotte","Carolina"],3551317.0,0,"NWTT"],["indianapolis","Indianapolis","IN","US",["Indianapolis"],2400974.0,0,"NNTW"],["new-orleans","New Orleans","LA","US",["New Orleans"],1271845.0,0,"NNTW"],["las-vegas","Las Vegas","NV","US",["Las Vegas"],2265461.0,0,"NWNT"],["oklahoma-city","Oklahoma City","OK","US",["Oklahoma City"],1425695.0,0,"NNWN"],["buffalo","Buffalo","NY","US",[],null,0,"NTLT"],["columbus","Columbus","OH","US",[],null,0,"NTNN"],["nashville","Nashville","TN","US",[],null,0,"NTNT"],["vancouver","Vancouver","BC","CA",[],null,0,"NTLN"],["winnipeg","Winnipeg","MB","CA",[],null,0,"NTNN"],["memphis","Memphis","TN","US",[],null,0,"NNTN"],["orlando","Orlando","FL","US",[],null,0,"NNTN"],["sacramento","Sacramento","CA","US",[],null,0,"TNTN"],["salt-lake-city","Salt Lake City","UT","US",[],null,0,"NTTN"],["san-diego","San Diego","CA","US",[],null,0,"TNLL"],["jacksonville","Jacksonville","FL","US",[],null,0,"NNNT"]],
  fr: [["MLB","Diamondbacks","phoenix",null,0],["MLB","Braves","atlanta",null,0],["MLB","Orioles","baltimore",null,0],["MLB","Red Sox","boston",null,0],["MLB","Cubs","chicago",null,0],["MLB","White Sox","chicago",null,0],["MLB","Reds","cincinnati",null,0],["MLB","Guardians","cleveland",null,0],["MLB","Rockies","denver",1993,0],["MLB","Tigers","detroit",null,0],["MLB","Astros","houston",null,0],["MLB","Royals","kansas-city",null,0],["MLB","Angels","los-angeles",null,0],["MLB","Dodgers","los-angeles",null,0],["MLB","Marlins","south-florida",null,0],["MLB","Brewers","milwaukee",1969,0],["MLB","Twins","minneapolis",null,0],["MLB","Mets","new-york",null,0],["MLB","Yankees","new-york",null,0],["MLB","Athletics","sacramento",null,0],["MLB","Phillies","philadelphia",null,0],["MLB","Pirates","pittsburgh",null,0],["MLB","Padres","san-diego",1969,0],["MLB","Giants","bay-area",null,0],["MLB","Mariners","seattle",1977,0],["MLB","Cardinals","st-louis",null,0],["MLB","Rays","tampa-bay",1998,0],["MLB","Rangers","dallas",null,0],["MLB","Blue Jays","toronto",null,0],["MLB","Nationals","washington",null,0],["NHL","Ducks","los-angeles",null,0],["NHL","Mammoth","salt-lake-city",1979,0],["NHL","Bruins","boston",null,0],["NHL","Sabres","buffalo",1970,0],["NHL","Flames","calgary",null,0],["NHL","Hurricanes","carolina",null,0],["NHL","Blackhawks","chicago",null,0],["NHL","Avalanche","denver",null,0],["NHL","Blue Jackets","columbus",2000,0],["NHL","Stars","dallas",null,0],["NHL","Red Wings","detroit",null,0],["NHL","Oilers","edmonton",null,0],["NHL","Panthers","south-florida",null,0],["NHL","Kings","los-angeles",null,0],["NHL","Wild","minneapolis",2000,0],["NHL","Canadiens","montreal",null,0],["NHL","Predators","nashville",1998,0],["NHL","Devils","new-jersey",null,0],["NHL","Islanders","new-york",null,0],["NHL","Rangers","new-york",null,0],["NHL","Senators","ottawa",1992,0],["NHL","Flyers","philadelphia",null,0],["NHL","Penguins","pittsburgh",null,0],["NHL","Sharks","bay-area",1991,0],["NHL","Kraken","seattle",2021,0],["NHL","Blues","st-louis",null,0],["NHL","Lightning","tampa-bay",null,0],["NHL","Maple Leafs","toronto",null,0],["NHL","Canucks","vancouver",1970,0],["NHL","Golden Knights","las-vegas",null,0],["NHL","Capitals","washington",null,0],["NHL","Jets","winnipeg",1999,0],["NBA","Hawks","atlanta",null,0],["NBA","Celtics","boston",null,0],["NBA","Nets","brooklyn",1976,0],["NBA","Hornets","carolina",1988,0],["NBA","Bulls","chicago",null,0],["NBA","Cavaliers","cleveland",null,0],["NBA","Mavericks","dallas",null,0],["NBA","Nuggets","denver",null,0],["NBA","Pistons","detroit",null,0],["NBA","Warriors","bay-area",null,0],["NBA","Rockets","houston",null,0],["NBA","Pacers","indianapolis",1976,0],["NBA","Clippers","los-angeles",1970,0],["NBA","Lakers","los-angeles",null,0],["NBA","Grizzlies","memphis",1995,0],["NBA","Heat","south-florida",null,0],["NBA","Bucks","milwaukee",null,0],["NBA","Timberwolves","minneapolis",1989,0],["NBA","Pelicans","new-orleans",2002,0],["NBA","Knicks","new-york",null,0],["NBA","Thunder","oklahoma-city",null,0],["NBA","Magic","orlando",1989,0],["NBA","76ers","philadelphia",null,0],["NBA","Suns","phoenix",1968,0],["NBA","Trail Blazers","portland",null,0],["NBA","Kings","sacramento",null,0],["NBA","Spurs","san-antonio",null,0],["NBA","Raptors","toronto",null,0],["NBA","Jazz","salt-lake-city",1974,0],["NBA","Wizards","washington",null,0],["NFL","Cardinals","phoenix",1920,0],["NFL","Falcons","atlanta",1966,0],["NFL","Ravens","baltimore",null,0],["NFL","Bills","buffalo",1960,0],["NFL","Panthers","carolina",1995,0],["NFL","Bears","chicago",null,0],["NFL","Bengals","cincinnati",1968,0],["NFL","Browns","cleveland",1946,0],["NFL","Cowboys","dallas",null,0],["NFL","Broncos","denver",null,0],["NFL","Lions","detroit",1930,0],["NFL","Packers","milwaukee",null,0],["NFL","Texans","houston",2002,0],["NFL","Colts","indianapolis",null,0],["NFL","Jaguars","jacksonville",1995,0],["NFL","Chiefs","kansas-city",null,0],["NFL","Raiders","las-vegas",null,0],["NFL","Chargers","los-angeles",1960,0],["NFL","Rams","los-angeles",null,0],["NFL","Dolphins","south-florida",null,0],["NFL","Vikings","minneapolis",1961,0],["NFL","Patriots","boston",null,0],["NFL","Saints","new-orleans",null,0],["NFL","Giants","new-york",null,0],["NFL","Jets","new-york",null,0],["NFL","Eagles","philadelphia",null,0],["NFL","Steelers","pittsburgh",null,0],["NFL","49ers","bay-area",null,0],["NFL","Seahawks","seattle",null,0],["NFL","Buccaneers","tampa-bay",null,0],["NFL","Titans","nashville",1960,0],["NFL","Commanders","washington",null,0],["NHL","Senators (original)","ottawa",null,1],["NHL","Maroons","montreal",null,1],["NBA","Bullets (original)","baltimore",null,1]],
  col: {"0":["#A71930","#E3D4AD","#000000"],"1":["#CE1141","#13274F","#EAAA00"],"2":["#DF4601","#27251F",null],"3":["#BD3039","#0C2340",null],"4":["#0E3386","#CC3433",null],"5":["#27251F","#C4CED4",null],"6":["#C6011F","#000000",null],"7":["#0C2340","#E31937",null],"8":["#33006F","#C4CED4","#000000"],"9":["#0C2340","#FA4616",null],"10":["#002D62","#EB6E1F","#F4911E"],"11":["#004687","#BD9B60",null],"12":["#003263","#BA0021","#862633"],"13":["#005A9C","#EF3E42","#BFC0BF"],"14":["#41748D","#EF3340","#00A3E0"],"15":["#13294B","#B6922E",null],"16":["#002B5C","#D31145","#B9975B"],"17":["#002D72","#FC5910",null],"18":["#0C2340","#E4002C","#003087"],"19":["#003831","#EFB21E","#A2AAAD"],"20":["#E81828","#002D72",null],"21":["#27251F","#FDB827",null],"22":["#002D62","#A2AAAD",null],"23":["#FD5A1E","#27251F","#AE8F6F"],"24":["#0C2C56","#C4CED4","#005C5C"],"25":["#C41E3A","#0C2340","#FEDB00"],"26":["#092C5C","#8FBCE6","#F5D130"],"27":["#003278","#C0111F",null],"28":["#134A8E","#E8291C","#1D2D5C"],"29":["#AB0003","#14225A",null],"30":["#FC4C02","#000000","#B9975B"],"31":["#6CACE4","#010101","#FFFFFF"],"32":["#FCB514","#111111",null],"33":["#002654","#FCB514","#ADAFAA"],"34":["#111111","#F1BE48","#C8102E"],"35":["#E21836","#231F20","#76232F"],"36":["#CF0A2C","#D18A00","#000000"],"37":["#6F263D","#236192","#A2AAAD"],"38":["#002654","#CE1126","#A4A9AD"],"39":["#006847","#8F8F8C","#111111"],"40":["#CE1126",null,null],"41":["#041E42","#FC4C00",null],"42":["#041E42","#C8102E","#B9975B"],"43":["#111111","#A2AAAD",null],"44":["#AF2324","#EDAA00","#024930"],"45":["#AF1E2D","#192168",null],"46":["#FFB81C","#041E42",null],"47":["#CE1126","#000000",null],"48":["#00539B","#F47D30",null],"49":["#0038A8","#CE1126",null],"50":["#C52032","#C2912C","#000000"],"51":["#F74902","#000000",null],"52":["#000000","#CFC493","#FCB514"],"53":["#006D75","#EA7200","#000000"],"54":["#001628","#99D9D9","#E9072B"],"55":["#002F87","#FCB514","#041E42"],"56":["#002868",null,null],"57":["#00205B",null,null],"58":["#00205B","#0A863D","#041C2C"],"59":["#B9975B","#333F48","#C8102E"],"60":["#041E42","#C8102E",null],"61":["#004C97","#8E9090","#041E42"],"62":["#E14434","#26282A",null],"63":["#007A33","#963821","#8B6F4E"],"64":["#000000",null,null],"65":["#1D1160","#00788C","#A1A1A4"],"66":["#CE1141","#061922",null],"67":["#6F263D","#FFB81C","#041E42"],"68":["#0053BC","#BBC4CA","#061922"],"69":["#0D2240","#FFC627","#8B2332"],"70":["#C8102E","#1D428A","#B5B3B3"],"71":["#1D428A","#FFC72C",null],"72":["#CE1141","#061922","#C4CED3"],"73":["#002D62","#FDBB30","#BEC0C2"],"74":["#C8102E","#1D4294","#000000"],"75":["#552582","#FDB927",null],"76":["#5D76A9","#12173F","#FFBB22"],"77":["#98002E","#F9A01B","#061922"],"78":["#00471B","#F0EBD2","#061922"],"79":["#0C2340","#236192","#9EA2A2"],"80":["#001641","#E13A3E","#B4975A"],"81":["#006BB6","#F58426","#BEC0C2"],"82":["#007DC3","#EF3B24",null],"83":["#007DC5","#061922","#C4CED3"],"84":["#006BB6","#ED174C","#002B5C"],"85":["#1D1160","#E55F20","#061922"],"86":["#E03A3E","#061922",null],"87":["#5B2B82","#63717A","#061922"],"88":["#061922","#C4CED3",null],"89":["#CE1141","#061922","#A1A1A4"],"90":["#002B5C","#F9A01B","#00471B"],"91":["#002B5C","#E31837","#C4CED4"],"92":["#97233F","#FFB612","#000000"],"93":["#A71930","#A5ACAF","#000000"],"94":["#1A195F","#9E7C0C","#000000"],"95":["#00338D","#C60C30",null],"96":["#0085CA","#101820","#BFC0BF"],"97":["#0B162A","#C83803","#B0B7BC"],"99":["#311D00","#FF3C00",null],"100":["#003594","#869397","#002244"],"101":["#FB4F14","#002244",null],"102":["#0076B6","#000000",null],"103":["#183028","#FFB81C",null],"104":["#03202F","#A71930",null],"105":["#002C5F","#A2AAAD",null],"106":["#006778","#9F792C","#101820"],"107":["#E31837","#FFB81C",null],"108":["#000000","#A5ACAF",null],"109":["#002A5E","#FFC20E","#0080C6"],"110":["#002244","#866D4B",null],"111":["#008E97","#FC4C02","#005778"],"112":["#4F2683","#FFC62F",null],"113":["#002244","#C60C30","#B0B7BC"],"114":["#D3BC8D","#10181F",null],"115":["#012352","#A30D2D","#9BA1A2"],"116":["#125740","#FFFFFF","#27251F"],"117":["#004C54","#A5ACAF","#000000"],"118":["#FFB612","#101820","#A5ACAF"],"119":["#AA0000","#AD995D",null],"120":["#002244","#69BE28","#A5ACAF"],"121":["#D50A0A","#0A0A08","#FF7900"],"122":["#0C2340","#418FDE","#C8102E"],"123":["#3F1010","#FFB612",null],"98":["#FB4F14","#000000"]},
  // year: [league index, metro index, team as named then, city label, franchise index]
  titles: {
    1903:[[0,0,"Red Sox","Boston",3]],
    1905:[[0,1,"Giants","New York",23]],
    1906:[[0,2,"White Sox","Chicago",5]],
    1907:[[0,2,"Cubs","Chicago",4]],
    1908:[[0,2,"Cubs","Chicago",4]],
    1909:[[0,3,"Pirates","Pittsburgh",21]],
    1910:[[0,4,"Athletics","Philadelphia",19]],
    1911:[[0,4,"Athletics","Philadelphia",19]],
    1912:[[0,0,"Red Sox","Boston",3]],
    1913:[[0,4,"Athletics","Philadelphia",19]],
    1914:[[0,0,"Braves","Boston",1]],
    1915:[[0,0,"Red Sox","Boston",3]],
    1916:[[0,0,"Red Sox","Boston",3]],
    1917:[[0,2,"White Sox","Chicago",5]],
    1918:[[0,0,"Red Sox","Boston",3]],
    1919:[[0,5,"Reds","Cincinnati",6]],
    1920:[[0,6,"Indians","Cleveland",7]],
    1921:[[0,1,"Giants","New York",23]],
    1922:[[0,1,"Giants","New York",23]],
    1923:[[0,1,"Yankees","New York",18]],
    1924:[[0,7,"Senators","Washington",16]],
    1925:[[0,3,"Pirates","Pittsburgh",21]],
    1926:[[0,8,"Cardinals","St. Louis",25]],
    1927:[[0,1,"Yankees","New York",18],[1,9,"Senators","Ottawa",124]],
    1928:[[0,1,"Yankees","New York",18],[1,1,"Rangers","New York",49]],
    1929:[[0,4,"Athletics","Philadelphia",19],[1,0,"Bruins","Boston",32]],
    1930:[[0,4,"Athletics","Philadelphia",19],[1,10,"Canadiens","Montreal",45]],
    1931:[[0,8,"Cardinals","St. Louis",25],[1,10,"Canadiens","Montreal",45]],
    1932:[[0,1,"Yankees","New York",18],[1,11,"Maple Leafs","Toronto",57]],
    1933:[[0,1,"Giants","New York",23],[1,1,"Rangers","New York",49]],
    1934:[[0,8,"Cardinals","St. Louis",25],[1,2,"Blackhawks","Chicago",36]],
    1935:[[0,12,"Tigers","Detroit",9],[1,10,"Maroons","Montreal",125]],
    1936:[[0,1,"Yankees","New York",18],[1,12,"Red Wings","Detroit",40]],
    1937:[[0,1,"Yankees","New York",18],[1,12,"Red Wings","Detroit",40]],
    1938:[[0,1,"Yankees","New York",18],[1,2,"Blackhawks","Chicago",36]],
    1939:[[0,1,"Yankees","New York",18],[1,0,"Bruins","Boston",32]],
    1940:[[0,5,"Reds","Cincinnati",6],[1,1,"Rangers","New York",49]],
    1941:[[0,1,"Yankees","New York",18],[1,0,"Bruins","Boston",32]],
    1942:[[0,8,"Cardinals","St. Louis",25],[1,11,"Maple Leafs","Toronto",57]],
    1943:[[0,1,"Yankees","New York",18],[1,12,"Red Wings","Detroit",40]],
    1944:[[0,8,"Cardinals","St. Louis",25],[1,10,"Canadiens","Montreal",45]],
    1945:[[0,12,"Tigers","Detroit",9],[1,11,"Maple Leafs","Toronto",57]],
    1946:[[0,8,"Cardinals","St. Louis",25],[1,10,"Canadiens","Montreal",45]],
    1947:[[0,1,"Yankees","New York",18],[1,11,"Maple Leafs","Toronto",57],[2,4,"Warriors","Philadelphia",71]],
    1948:[[0,6,"Indians","Cleveland",7],[1,11,"Maple Leafs","Toronto",57],[2,13,"Bullets","Baltimore",126]],
    1949:[[0,1,"Yankees","New York",18],[1,11,"Maple Leafs","Toronto",57],[2,14,"Lakers","Minneapolis",75]],
    1950:[[0,1,"Yankees","New York",18],[1,12,"Red Wings","Detroit",40],[2,14,"Lakers","Minneapolis",75]],
    1951:[[0,1,"Yankees","New York",18],[1,11,"Maple Leafs","Toronto",57],[2,16,"Royals","Rochester",87]],
    1952:[[0,1,"Yankees","New York",18],[1,12,"Red Wings","Detroit",40],[2,14,"Lakers","Minneapolis",75]],
    1953:[[0,1,"Yankees","New York",18],[1,10,"Canadiens","Montreal",45],[2,14,"Lakers","Minneapolis",75]],
    1954:[[0,1,"Giants","New York",23],[1,12,"Red Wings","Detroit",40],[2,14,"Lakers","Minneapolis",75]],
    1955:[[0,15,"Dodgers","Brooklyn",13],[1,12,"Red Wings","Detroit",40],[2,17,"Nationals","Syracuse",84]],
    1956:[[0,1,"Yankees","New York",18],[1,10,"Canadiens","Montreal",45],[2,4,"Warriors","Philadelphia",71]],
    1957:[[0,18,"Braves","Milwaukee",1],[1,10,"Canadiens","Montreal",45],[2,0,"Celtics","Boston",63]],
    1958:[[0,1,"Yankees","New York",18],[1,10,"Canadiens","Montreal",45],[2,8,"Hawks","St. Louis",62]],
    1959:[[0,19,"Dodgers","Los Angeles",13],[1,10,"Canadiens","Montreal",45],[2,0,"Celtics","Boston",63]],
    1960:[[0,3,"Pirates","Pittsburgh",21],[1,10,"Canadiens","Montreal",45],[2,0,"Celtics","Boston",63]],
    1961:[[0,1,"Yankees","New York",18],[1,2,"Blackhawks","Chicago",36],[2,0,"Celtics","Boston",63]],
    1962:[[0,1,"Yankees","New York",18],[1,11,"Maple Leafs","Toronto",57],[2,0,"Celtics","Boston",63]],
    1963:[[0,19,"Dodgers","Los Angeles",13],[1,11,"Maple Leafs","Toronto",57],[2,0,"Celtics","Boston",63]],
    1964:[[0,8,"Cardinals","St. Louis",25],[1,11,"Maple Leafs","Toronto",57],[2,0,"Celtics","Boston",63]],
    1965:[[0,19,"Dodgers","Los Angeles",13],[1,10,"Canadiens","Montreal",45],[2,0,"Celtics","Boston",63]],
    1966:[[0,13,"Orioles","Baltimore",2],[1,10,"Canadiens","Montreal",45],[2,0,"Celtics","Boston",63]],
    1967:[[0,8,"Cardinals","St. Louis",25],[1,11,"Maple Leafs","Toronto",57],[2,4,"76ers","Philadelphia",84],[3,18,"Packers","Green Bay",103]],
    1968:[[0,12,"Tigers","Detroit",9],[1,10,"Canadiens","Montreal",45],[2,0,"Celtics","Boston",63],[3,18,"Packers","Green Bay",103]],
    1969:[[0,1,"Mets","New York",17],[1,10,"Canadiens","Montreal",45],[2,0,"Celtics","Boston",63],[3,1,"Jets","New York",116]],
    1970:[[0,13,"Orioles","Baltimore",2],[1,0,"Bruins","Boston",32],[2,1,"Knicks","New York",81],[3,20,"Chiefs","Kansas City",107]],
    1971:[[0,3,"Pirates","Pittsburgh",21],[1,10,"Canadiens","Montreal",45],[2,18,"Bucks","Milwaukee",78],[3,13,"Colts","Baltimore",105]],
    1972:[[0,21,"Athletics","Oakland",19],[1,0,"Bruins","Boston",32],[2,19,"Lakers","Los Angeles",75],[3,22,"Cowboys","Dallas",100]],
    1973:[[0,21,"Athletics","Oakland",19],[1,10,"Canadiens","Montreal",45],[2,1,"Knicks","New York",81],[3,31,"Dolphins","Miami",111]],
    1974:[[0,21,"Athletics","Oakland",19],[1,4,"Flyers","Philadelphia",51],[2,0,"Celtics","Boston",63],[3,31,"Dolphins","Miami",111]],
    1975:[[0,5,"Reds","Cincinnati",6],[1,4,"Flyers","Philadelphia",51],[2,21,"Warriors","Golden State",71],[3,3,"Steelers","Pittsburgh",118]],
    1976:[[0,5,"Reds","Cincinnati",6],[1,10,"Canadiens","Montreal",45],[2,0,"Celtics","Boston",63],[3,3,"Steelers","Pittsburgh",118]],
    1977:[[0,1,"Yankees","New York",18],[1,10,"Canadiens","Montreal",45],[2,23,"Trail Blazers","Portland",86],[3,21,"Raiders","Oakland",108]],
    1978:[[0,1,"Yankees","New York",18],[1,10,"Canadiens","Montreal",45],[2,7,"Bullets","Washington",91],[3,22,"Cowboys","Dallas",100]],
    1979:[[0,3,"Pirates","Pittsburgh",21],[1,10,"Canadiens","Montreal",45],[2,24,"SuperSonics","Seattle",82],[3,3,"Steelers","Pittsburgh",118]],
    1980:[[0,4,"Phillies","Philadelphia",20],[1,1,"Islanders","New York",48],[2,19,"Lakers","Los Angeles",75],[3,3,"Steelers","Pittsburgh",118]],
    1981:[[0,19,"Dodgers","Los Angeles",13],[1,1,"Islanders","New York",48],[2,0,"Celtics","Boston",63],[3,21,"Raiders","Oakland",108]],
    1982:[[0,8,"Cardinals","St. Louis",25],[1,1,"Islanders","New York",48],[2,19,"Lakers","Los Angeles",75],[3,21,"49ers","San Francisco",119]],
    1983:[[0,13,"Orioles","Baltimore",2],[1,1,"Islanders","New York",48],[2,4,"76ers","Philadelphia",84],[3,7,"Redskins","Washington",123]],
    1984:[[0,12,"Tigers","Detroit",9],[1,25,"Oilers","Edmonton",41],[2,0,"Celtics","Boston",63],[3,19,"Raiders","Los Angeles",108]],
    1985:[[0,20,"Royals","Kansas City",11],[1,25,"Oilers","Edmonton",41],[2,19,"Lakers","Los Angeles",75],[3,21,"49ers","San Francisco",119]],
    1986:[[0,1,"Mets","New York",17],[1,10,"Canadiens","Montreal",45],[2,0,"Celtics","Boston",63],[3,2,"Bears","Chicago",97]],
    1987:[[0,14,"Twins","Minnesota",16],[1,25,"Oilers","Edmonton",41],[2,19,"Lakers","Los Angeles",75],[3,1,"Giants","New York",115]],
    1988:[[0,19,"Dodgers","Los Angeles",13],[1,25,"Oilers","Edmonton",41],[2,19,"Lakers","Los Angeles",75],[3,7,"Redskins","Washington",123]],
    1989:[[0,21,"Athletics","Oakland",19],[1,26,"Flames","Calgary",34],[2,12,"Pistons","Detroit",70],[3,21,"49ers","San Francisco",119]],
    1990:[[0,5,"Reds","Cincinnati",6],[1,25,"Oilers","Edmonton",41],[2,12,"Pistons","Detroit",70],[3,21,"49ers","San Francisco",119]],
    1991:[[0,14,"Twins","Minnesota",16],[1,3,"Penguins","Pittsburgh",52],[2,2,"Bulls","Chicago",66],[3,1,"Giants","New York",115]],
    1992:[[0,11,"Blue Jays","Toronto",28],[1,3,"Penguins","Pittsburgh",52],[2,2,"Bulls","Chicago",66],[3,7,"Redskins","Washington",123]],
    1993:[[0,11,"Blue Jays","Toronto",28],[1,10,"Canadiens","Montreal",45],[2,2,"Bulls","Chicago",66],[3,22,"Cowboys","Dallas",100]],
    1994:[[1,1,"Rangers","New York",49],[2,27,"Rockets","Houston",72],[3,22,"Cowboys","Dallas",100]],
    1995:[[0,30,"Braves","Atlanta",1],[1,28,"Devils","New Jersey",47],[2,27,"Rockets","Houston",72],[3,21,"49ers","San Francisco",119]],
    1996:[[0,1,"Yankees","New York",18],[1,29,"Avalanche","Colorado",37],[2,2,"Bulls","Chicago",66],[3,22,"Cowboys","Dallas",100]],
    1997:[[0,31,"Marlins","Florida",14],[1,12,"Red Wings","Detroit",40],[2,2,"Bulls","Chicago",66],[3,18,"Packers","Green Bay",103]],
    1998:[[0,1,"Yankees","New York",18],[1,12,"Red Wings","Detroit",40],[2,2,"Bulls","Chicago",66],[3,29,"Broncos","Denver",101]],
    1999:[[0,1,"Yankees","New York",18],[1,22,"Stars","Dallas",39],[2,32,"Spurs","San Antonio",88],[3,29,"Broncos","Denver",101]],
    2000:[[0,1,"Yankees","New York",18],[1,28,"Devils","New Jersey",47],[2,19,"Lakers","Los Angeles",75],[3,8,"Rams","St. Louis",110]],
    2001:[[0,33,"Diamondbacks","Arizona",0],[1,29,"Avalanche","Colorado",37],[2,19,"Lakers","Los Angeles",75],[3,13,"Ravens","Baltimore",94]],
    2002:[[0,19,"Angels","Anaheim",12],[1,12,"Red Wings","Detroit",40],[2,19,"Lakers","Los Angeles",75],[3,0,"Patriots","New England",113]],
    2003:[[0,31,"Marlins","Florida",14],[1,28,"Devils","New Jersey",47],[2,32,"Spurs","San Antonio",88],[3,34,"Buccaneers","Tampa Bay",121]],
    2004:[[0,0,"Red Sox","Boston",3],[1,34,"Lightning","Tampa Bay",56],[2,12,"Pistons","Detroit",70],[3,0,"Patriots","New England",113]],
    2005:[[0,2,"White Sox","Chicago",5],[2,32,"Spurs","San Antonio",88],[3,0,"Patriots","New England",113]],
    2006:[[0,8,"Cardinals","St. Louis",25],[1,35,"Hurricanes","Carolina",35],[2,31,"Heat","Miami",77],[3,3,"Steelers","Pittsburgh",118]],
    2007:[[0,0,"Red Sox","Boston",3],[1,19,"Ducks","Anaheim",30],[2,32,"Spurs","San Antonio",88],[3,36,"Colts","Indianapolis",105]],
    2008:[[0,4,"Phillies","Philadelphia",20],[1,12,"Red Wings","Detroit",40],[2,0,"Celtics","Boston",63],[3,1,"Giants","New York",115]],
    2009:[[0,1,"Yankees","New York",18],[1,3,"Penguins","Pittsburgh",52],[2,19,"Lakers","Los Angeles",75],[3,37,"Saints","New Orleans",114]],
    2010:[[0,21,"Giants","San Francisco",23],[1,2,"Blackhawks","Chicago",36],[2,19,"Lakers","Los Angeles",75],[3,3,"Steelers","Pittsburgh",118]],
    2011:[[0,8,"Cardinals","St. Louis",25],[1,0,"Bruins","Boston",32],[2,22,"Mavericks","Dallas",68],[3,18,"Packers","Green Bay",103]],
    2012:[[0,21,"Giants","San Francisco",23],[1,19,"Kings","Los Angeles",43],[2,31,"Heat","Miami",77],[3,1,"Giants","New York",115]],
    2013:[[0,0,"Red Sox","Boston",3],[1,2,"Blackhawks","Chicago",36],[2,31,"Heat","Miami",77],[3,13,"Ravens","Baltimore",94]],
    2014:[[0,21,"Giants","San Francisco",23],[1,19,"Kings","Los Angeles",43],[2,32,"Spurs","San Antonio",88],[3,24,"Seahawks","Seattle",120]],
    2015:[[0,20,"Royals","Kansas City",11],[1,2,"Blackhawks","Chicago",36],[2,21,"Warriors","Golden State",71],[3,0,"Patriots","New England",113]],
    2016:[[0,2,"Cubs","Chicago",4],[1,3,"Penguins","Pittsburgh",52],[2,6,"Cavaliers","Cleveland",67],[3,29,"Broncos","Denver",101]],
    2017:[[0,27,"Astros","Houston",10],[1,3,"Penguins","Pittsburgh",52],[2,21,"Warriors","Golden State",71],[3,0,"Patriots","New England",113]],
    2018:[[0,0,"Red Sox","Boston",3],[1,7,"Capitals","Washington",60],[2,21,"Warriors","Golden State",71],[3,4,"Eagles","Philadelphia",117]],
    2019:[[0,7,"Nationals","Washington",29],[1,8,"Blues","St. Louis",55],[2,11,"Raptors","Toronto",89],[3,0,"Patriots","New England",113]],
    2020:[[0,19,"Dodgers","Los Angeles",13],[1,34,"Lightning","Tampa Bay",56],[2,19,"Lakers","Los Angeles",75],[3,20,"Chiefs","Kansas City",107]],
    2021:[[0,30,"Braves","Atlanta",1],[1,34,"Lightning","Tampa Bay",56],[2,18,"Bucks","Milwaukee",78],[3,34,"Buccaneers","Tampa Bay",121]],
    2022:[[0,27,"Astros","Houston",10],[1,29,"Avalanche","Colorado",37],[2,21,"Warriors","Golden State",71],[3,19,"Rams","Los Angeles",110]],
    2023:[[0,22,"Rangers","Texas",27],[1,38,"Golden Knights","Las Vegas",59],[2,29,"Nuggets","Denver",69],[3,20,"Chiefs","Kansas City",107]],
    2024:[[0,19,"Dodgers","Los Angeles",13],[1,31,"Panthers","Florida",42],[2,0,"Celtics","Boston",63],[3,20,"Chiefs","Kansas City",107]],
    2025:[[0,19,"Dodgers","Los Angeles",13],[1,31,"Panthers","Florida",42],[2,39,"Thunder","Oklahoma City",82],[3,4,"Eagles","Philadelphia",117]],
    2026:[[0,18,"Brewers","Milwaukee",15],[1,35,"Hurricanes","Carolina",35],[2,1,"Knicks","New York",81],[3,24,"Seahawks","Seattle",120]]
  }
};
const MAP = {"paths":{"canada":"M20,-10L19,-9L18,-8L19,-5L19,-5L19,-4L21,-4L21,-3L19,-2L19,-2L20,-1L21,-1L21,1L19,2L18,-1L17,-3L17,-5L17,-6L15,-9L15,-10L20,-10ZM61,51L67,55L73,59L77,62L80,63L81,64L82,65L82,66L82,70L83,72L84,76L85,79L85,80L85,80L85,81L85,84L87,86L89,88L93,91L95,93L95,95L96,96L96,97L96,100L97,103L98,108L98,108L99,107L100,106L100,107L100,109L100,112L99,113L99,113L97,112L97,112L96,113L95,114L95,113L91,111L88,109L85,106L81,103L79,101L77,99L76,98L77,97L80,95L82,94L83,93L83,92L84,90L83,90L83,91L82,93L81,94L77,93L75,92L73,93L72,93L72,92L71,90L69,88L69,88L71,88L72,87L71,86L70,85L70,84L69,85L68,84L68,83L69,82L69,81L68,82L68,81L67,80L66,80L66,79L65,79L65,80L64,80L63,78L63,78L62,79L62,79L61,78L62,76L62,75L64,75L68,75L69,75L66,74L65,74L64,73L64,72L63,72L63,71L62,68L62,68L61,67L60,66L60,66L59,67L59,67L58,67L57,66L56,66L56,65L56,64L57,63L57,62L57,61L56,61L56,61L56,62L55,62L54,61L54,60L54,59L51,58L50,59L49,58L48,58L48,57L49,56L50,55L50,54L49,54L49,53L50,51L51,51L51,51L54,52L55,53L55,54L56,52L56,51L57,51L56,50L53,49L53,50L51,51L50,50L48,50L48,49L46,46L46,44L46,43L47,43L48,42L50,42L53,43L55,45ZM531,-10L530,-9L531,-10L532,-10L580,-10L580,-10L581,-10L583,-8L586,-6L588,-5L591,-4L593,-1L598,4L599,5L602,6L606,6L614,9L617,9L619,10L621,10L623,11L625,12L626,13L627,14L629,15L629,16L630,17L628,21L628,21L630,18L631,17L632,17L633,16L636,17L639,16L641,16L642,15L644,15L645,15L646,14L646,14L650,15L651,15L656,15L659,14L659,14L660,16L661,16L663,15L664,15L667,17L668,18L669,21L670,21L669,28L668,31L669,33L669,35L671,37L672,37L673,40L674,42L674,43L674,46L674,48L675,51L675,53L674,54L674,55L674,57L674,58L675,60L676,60L677,61L678,62L681,65L683,67L685,69L686,70L685,71L685,72L683,73L683,74L683,74L685,73L686,73L688,74L689,75L690,76L693,76L695,77L699,80L700,81L701,83L703,86L704,88L704,88L704,89L702,91L700,95L700,95L702,93L704,90L705,89L707,89L709,90L711,90L713,91L716,94L720,97L721,99L721,97L719,96L716,94L715,92L715,91L715,90L715,88L715,86L716,85L716,84L716,83L716,82L718,81L719,81L720,82L720,82L721,82L722,83L723,84L724,84L724,85L725,88L726,89L726,87L726,85L726,84L727,82L727,81L726,81L723,78L723,77L723,76L724,75L724,74L724,73L726,71L727,68L727,67L727,66L728,66L727,65L727,65L726,63L726,61L725,60L723,59L723,58L722,56L722,55L722,54L722,53L720,52L719,51L718,47L716,43L715,40L714,38L714,37L714,37L714,35L715,35L715,34L716,34L714,34L713,33L713,32L714,31L714,31L713,30L711,30L711,29L712,28L712,28L711,28L710,27L709,27L707,25L707,24L706,22L704,20L704,20L703,19L702,19L703,19L712,13L713,12L717,9L719,8L721,6L724,3L725,2L726,1L730,-4L731,-7L732,-9L733,-10L1010,-10L1010,-3L1008,-2L1004,0L1004,1L1002,4L1001,4L999,6L997,6L996,7L995,8L995,8L995,10L992,18L992,20L990,23L988,28L986,31L986,33L984,35L979,38L977,39L975,39L973,41L970,42L969,43L964,47L961,46L960,45L957,46L954,47L951,47L949,48L948,48L946,49L944,50L943,51L938,53L936,53L934,53L932,54L930,55L925,56L921,58L916,59L915,59L909,63L906,63L904,65L903,66L901,66L900,66L899,67L899,68L898,69L897,71L895,73L893,82L894,86L893,88L892,89L891,89L884,93L881,95L883,96L882,97L880,98L879,99L878,100L878,102L875,105L872,112L871,116L870,120L868,121L867,122L866,122L863,121L862,121L857,120L848,121L849,121L851,122L853,122L856,121L861,122L864,122L866,122L867,124L867,127L867,130L866,132L863,138L862,140L860,147L857,151L855,153L854,156L849,160L847,161L845,161L844,163L841,165L841,167L836,172L834,173L832,175L832,177L830,179L829,183L827,187L824,188L823,190L822,192L820,194L816,194L817,195L821,195L822,197L820,198L817,201L812,206L812,207L810,207L808,208L806,210L803,214L799,221L798,223L796,224L794,226L794,227L793,228L790,232L789,235L787,243L783,243L780,244L775,245L771,246L766,247L762,247L758,248L756,249L752,253L753,256L754,257L755,260L755,261L756,262L756,263L757,263L758,264L757,265L756,267L754,268L746,274L742,277L739,279L727,284L723,285L716,291L713,294L707,300L703,300L700,299L697,298L695,295L694,291L694,289L695,288L696,287L698,285L699,283L702,279L703,277L703,271L703,269L704,265L705,258L704,253L701,245L700,241L699,237L697,230L695,224L694,221L690,219L688,218L680,214L677,213L678,209L678,208L675,207L675,207L673,207L671,208L670,208L669,207L668,205L668,204L667,202L667,201L667,200L667,199L666,198L664,199L663,200L661,201L660,201L657,198L655,192L642,187L639,185L630,181L623,177L607,170L604,169L601,167L597,168L591,172L588,174L585,175L584,175L581,175L579,175L578,175L577,174L576,173L573,174L568,173L566,174L566,173L565,172L564,172L562,172L560,174L557,175L555,175L553,174L550,173L548,170L545,170L544,170L543,171L542,171L541,168L539,167L537,166L536,165L533,164L533,164L530,164L528,164L527,166L525,166L523,166L522,166L521,165L518,164L513,163L510,162L509,161L509,161L508,159L507,157L507,154L506,151L506,150L505,149L502,149L502,157L404,141L306,127L208,114L110,103L110,102L109,101L108,101L107,101L106,102L106,102L106,100L106,100L107,99L107,99L106,99L105,98L106,97L105,96L106,96L108,96L110,96L110,96L111,94L110,95L109,95L107,94L105,94L105,93L106,93L106,92L108,89L108,88L109,87L106,89L106,89L106,90L105,91L104,91L104,91L103,92L102,92L98,88L97,85L97,84L97,83L98,83L98,83L99,84L99,86L99,87L101,87L103,86L103,86L101,86L101,85L100,85L100,83L100,82L101,78L101,78L102,77L103,77L103,76L103,75L102,74L101,74L102,76L102,77L100,78L100,78L99,80L99,80L98,80L96,81L94,81L93,80L92,79L90,75L89,74L89,73L89,68L89,68L88,66L88,66L88,65L90,63L92,61L92,59L93,57L93,56L92,57L92,58L91,59L91,60L90,61L88,63L86,63L83,61L82,61L82,60L83,58L83,58L82,59L81,61L80,61L80,61L79,60L79,60L78,59L76,59L75,59L75,59L73,57L71,56L70,56L70,55L71,55L73,55L76,55L78,56L78,55L77,55L72,54L70,53L70,53L70,52L71,51L73,51L73,50L73,50L72,50L71,49L72,47L73,45L71,47L70,48L66,47L65,47L64,47L62,45L61,44L60,43L59,40L58,38L58,36L59,34L60,33L65,30L66,30L67,30L71,31L74,32L75,32L70,30L66,29L65,29L62,31L61,31L61,32L60,31L60,30L59,29L59,27L60,25L60,24L61,23L63,21L61,21L62,19L64,17L66,16L68,16L69,15L72,16L72,17L75,19L75,20L75,21L76,23L76,24L77,24L77,23L76,20L76,20L76,19L74,17L73,16L73,14L74,13L77,11L78,10L78,10L78,8L78,8L78,9L77,10L76,11L76,11L68,15L68,15L66,15L64,15L64,16L62,17L59,21L57,24L57,19L56,15L61,13L62,13L62,11L63,10L64,9L64,9L63,9L60,11L59,12L59,12L59,10L62,7L64,3L64,2L65,2L65,2L61,2L60,1L61,-5L60,-8L58,-10L66,-10L66,-10L68,-9L68,-7L69,-5L70,-6L68,-9L68,-10L531,-10ZM1010,125L1009,125L1009,125L1010,122L1010,125ZM1010,121L1010,121L1010,119L1010,121ZM1010,132L1010,132L1008,133L1007,134L1005,135L1005,135L1004,135L1003,135L1002,134L1001,133L998,129L998,127L998,124L999,122L999,120L1000,112L1000,110L1000,109L1001,107L1003,104L1003,103L1004,102L1005,102L1005,103L1006,104L1008,106L1008,107L1009,110L1009,114L1009,117L1010,117L1010,118L1009,120L1008,122L1007,123L1006,124L1004,127L1004,127L1004,127L1006,125L1007,125L1007,126L1006,127L1005,128L1006,128L1006,128L1006,130L1006,131L1006,132L1008,130L1009,130L1010,130L1010,129L1010,132ZM923,173L921,173L921,174L920,174L919,173L918,173L917,172L918,171L917,170L917,169L916,168L916,168L917,167L916,166L916,165L915,165L914,166L913,166L912,165L911,165L910,165L910,164L910,163L910,162L909,161L909,160L909,160L906,152L905,148L903,143L902,139L901,136L896,134L893,133L892,133L892,133L892,134L890,135L888,137L886,138L885,139L884,139L883,138L882,138L882,136L881,135L879,135L878,137L875,146L872,153L873,159L872,162L871,164L872,168L872,170L873,170L873,171L872,172L872,174L872,175L871,176L870,178L869,180L869,181L870,183L869,183L868,184L868,185L868,186L868,187L868,187L866,186L866,186L865,187L864,188L863,188L861,188L860,190L860,195L854,196L841,200L835,201L817,205L812,206L814,205L818,201L821,199L825,195L827,194L828,193L828,190L828,189L829,186L830,183L830,180L832,177L836,175L838,170L840,169L841,167L842,166L843,165L845,162L849,161L851,159L854,157L855,156L857,154L863,149L864,146L866,142L867,140L868,138L870,134L872,128L872,125L874,123L877,117L879,114L880,114L882,111L883,109L886,107L890,103L893,99L899,95L905,89L910,86L914,84L919,82L920,81L929,80L933,81L938,83L939,84L940,85L937,85L935,86L937,86L940,87L941,90L940,93L937,96L936,97L936,99L936,100L934,102L933,103L931,106L929,106L928,107L923,106L920,105L919,107L919,108L916,108L915,109L914,109L911,112L912,112L914,110L915,110L918,111L923,111L925,111L927,114L928,115L930,114L931,111L933,110L935,108L935,109L938,108L940,109L940,111L939,113L940,117L938,121L936,125L937,125L938,125L940,124L942,123L943,123L943,126L943,127L944,128L946,131L947,131L949,134L950,135L951,137L952,137L953,139L958,137L959,138L962,137L963,137L964,138L961,141L965,141L968,142L969,141L970,141L973,141L974,142L975,142L977,141L980,140L983,140L983,141L983,142L985,141L987,141L987,140L990,137L992,133L993,133L994,134L995,136L997,136L998,136L1000,134L1002,135L1003,136L1005,137L1005,138L1004,139L1003,141L1008,139L1009,139L1010,140L1010,141L1009,141L1008,141L1007,142L1006,144L1004,145L1003,145L1002,146L1002,147L1001,148L998,151L995,154L992,157L989,159L986,162L985,163L984,163L982,165L981,165L980,166L979,166L978,166L979,167L979,168L979,170L977,171L974,170L974,169L972,169L972,170L972,171L972,172L970,171L969,172L969,174L969,175L970,176L970,177L969,177L969,180L967,182L967,185L965,187L965,189L963,193L961,193L961,194L960,195L960,198L959,198L959,198L959,199L958,199L957,199L956,200L954,200L952,196L950,195L949,195L949,196L949,197L947,196L944,191L944,190L943,185L946,179L944,180L942,183L943,182L943,180L944,179L946,177L948,177L949,174L950,174L949,175L947,176L947,175L947,174L956,163L957,161L961,158L962,157L961,157L963,157L963,158L963,159L963,160L965,160L967,161L966,159L967,157L971,154L975,152L976,151L972,151L968,153L965,153L962,155L958,156L957,157L957,158L955,158L955,158L954,158L954,156L957,151L959,148L959,147L959,146L958,146L957,147L956,146L954,145L954,146L955,148L954,152L952,153L951,155L948,158L945,162L941,166L940,166L937,165L937,164L937,163L937,163L937,164L936,165L937,166L937,167L936,168L935,170L934,171L932,171L930,173L928,174L927,173L926,172L925,172L924,173ZM1010,65L1010,65L1010,64L1010,63L1010,65ZM970,67L965,70L960,70L956,71L953,71L944,70L943,69L942,68L940,67L938,66L929,65L928,64L930,63L931,62L933,62L938,61L945,60L948,60L951,60L955,61L963,63L965,63L969,64L970,65L971,66L971,67ZM962,130L962,131L963,130L963,128L965,128L967,128L968,127L969,128L972,128L974,127L977,125L978,125L981,123L985,122L986,122L987,122L986,124L984,127L982,129L982,130L982,131L983,133L984,133L984,133L983,134L981,135L980,135L978,135L977,134L976,135L976,135L977,133L976,132L975,132L974,132L974,131L975,130L975,129L974,130L973,131L972,132L971,133L973,133L972,134L972,134L967,134L966,134L964,134L963,132L963,132L963,132L962,132L959,133L958,133L957,130L956,129L955,129L952,130L952,129L952,127L953,125L953,124L953,122L955,119L956,121L956,122L956,126L959,127L960,129L960,130L961,130ZM696,61L695,61L692,61L691,61L687,60L680,59L678,58L677,57L678,55L679,55L679,54L686,52L689,52L692,55L695,57L696,59L696,60ZM705,-10L705,-7L704,-6L704,-7L704,-10L705,-10ZM703,-10L702,-7L701,-6L700,-5L698,-4L700,-10L703,-10ZM699,-10L697,-6L696,-5L695,-5L694,-5L694,-6L696,-10L697,-10L699,-10ZM20,6L20,6L20,5L20,3L21,2L22,4ZM59,-1L58,5L57,7L55,8L54,10L53,11L53,10L54,7L54,6L54,5L55,1L55,2L54,3L53,3L52,0L52,-1L52,-3L51,-4L52,-6L53,-7L54,-7L55,-9L55,-10L56,-10L58,-7L59,-5ZM67,82L67,84L65,83L65,82L65,81L66,81L67,81ZM95,86L95,87L92,84L91,83L91,82L89,80L89,80L90,79L91,80L92,81L93,83ZM61,74L61,74L60,73L59,73L58,70L58,70L59,69L59,68L61,68L62,69L62,70L62,71L62,73L62,74ZM84,71L84,72L83,70L83,65L84,65L85,64L85,64L86,65L86,66L86,67L86,68L86,69ZM51,6L50,6L50,4L49,3L49,0L49,-1L49,-2L50,-1L52,2L52,4ZM57,31L57,31L56,31L55,30L55,29L55,27L56,26L57,26L58,26L58,27L58,29L57,30ZM58,10L57,10L58,9L58,8L58,7L59,4L60,3L62,3L62,4L59,9ZM49,-10L49,-10L50,-7L50,-6L50,-6L50,-6L49,-7L49,-8L49,-9L49,-10L49,-10ZM53,-10L53,-7L53,-7L52,-7L51,-8L51,-9L51,-9L51,-10L51,-10L53,-10ZM100,105L99,106L98,105L99,101L99,101L100,103L99,103L100,104L100,105ZM1009,135L1009,136L1009,136L1007,135L1007,135L1008,134L1009,134L1009,135ZM982,104L983,104L984,104L984,104L984,105L982,106L981,106L981,101L982,100L984,97L985,95L986,95L987,94L986,96L985,97L984,99L983,100L983,102L982,103ZM942,105L942,107L941,108L941,109L941,108L940,106L941,106L941,106ZM942,103L941,105L941,103L941,102L942,102ZM941,187L941,188L941,187L941,185L942,185ZM932,181L930,183L930,180L930,179L931,179ZM827,193L826,193L824,193L822,195L821,195L823,193L825,191L827,188L827,187L827,191L827,192ZM825,191L823,192L822,191L824,189L826,188ZM857,154L855,154L855,154L857,152L858,151L859,151L858,152ZM704,48L704,48L704,48L703,48L702,47L703,47L704,47ZM717,74L716,74L715,75L714,74L713,74L717,71L718,71L718,72L717,73L717,74ZM101,103L101,103L99,101L98,99L98,97L100,101L101,102ZM86,73L86,73L86,70L87,70L87,69L88,70L88,71L88,72Z","mexico":"M278,700L277,698L274,695L271,688L268,685L256,674L256,674L260,677L261,677L261,676L261,674L260,674L259,674L257,674L257,673L255,672L252,670L251,669L252,667L248,662L247,660L248,660L249,661L250,661L251,662L252,661L252,661L251,660L246,657L244,655L240,652L239,651L238,649L237,649L236,649L234,649L233,648L233,648L235,647L237,645L237,644L236,645L234,646L233,646L231,646L229,646L229,645L227,643L227,637L229,635L231,632L233,631L233,632L234,633L234,631L232,630L232,629L232,628L232,626L228,622L225,622L223,621L222,620L221,617L221,615L221,614L221,613L215,610L213,608L211,606L210,603L210,601L210,599L211,596L212,594L208,593L206,592L205,593L204,592L201,590L199,587L196,581L192,578L191,576L190,574L189,571L189,570L189,570L187,568L185,565L185,563L185,559L184,558L183,557L182,556L183,555L183,553L180,549L179,545L179,544L178,542L178,539L178,535L176,531L175,527L174,524L175,521L176,519L175,518L176,518L176,518L177,518L177,516L177,515L175,514L174,514L170,512L167,510L168,508L167,506L166,505L163,503L162,504L161,505L160,505L159,505L157,504L152,499L151,498L150,497L149,497L146,494L147,495L147,496L148,500L146,502L144,510L144,512L145,515L145,519L145,522L146,525L144,530L144,532L145,535L147,539L148,540L151,543L152,546L156,550L157,552L160,558L160,560L160,562L162,562L163,564L163,565L163,565L164,565L165,566L166,573L167,574L168,574L170,575L169,578L170,580L170,582L171,585L170,587L170,588L173,593L177,596L177,600L178,604L180,605L181,607L181,608L181,609L183,612L183,616L184,618L185,618L185,618L184,616L184,614L184,612L185,612L188,616L188,619L189,620L189,623L190,624L190,626L191,629L190,633L190,636L192,641L195,643L195,645L196,651L198,655L199,658L199,659L198,662L197,663L198,669L200,672L202,673L203,673L202,674L203,675L204,674L205,673L204,671L204,670L205,670L206,670L210,674L211,676L212,677L214,680L214,681L215,683L215,686L218,688L220,691L220,692L218,696L217,697L214,698L212,700L206,700L206,700L205,699L204,691L203,690L203,687L201,685L197,682L194,678L192,676L190,673L183,667L180,664L179,661L177,661L176,661L176,660L176,659L176,658L172,654L171,652L171,649L173,643L175,640L175,638L174,638L174,637L174,634L174,631L171,624L168,622L166,621L160,614L159,611L158,609L159,606L157,607L156,608L153,608L149,609L148,607L147,605L146,603L144,602L143,602L141,599L140,598L137,597L135,595L135,594L135,592L134,590L131,587L129,584L127,582L127,581L127,580L131,581L135,583L138,583L139,582L141,582L141,583L140,584L141,585L143,587L144,587L143,586L143,583L143,582L144,581L142,581L142,581L143,579L146,575L148,571L147,567L144,564L139,555L136,550L135,548L134,547L131,546L129,543L125,539L123,537L123,533L122,532L123,529L123,525L123,523L120,522L120,518L121,515L121,513L117,509L118,507L118,505L118,504L116,500L114,496L114,495L114,492L113,491L115,491L115,491L116,489L112,485L112,480L110,477L110,476L110,472L110,472L115,473L120,474L131,475L136,475L146,477L153,477L151,480L150,481L166,491L182,500L198,510L214,519L227,521L233,522L246,524L253,525L259,525L266,526L266,521L267,517L275,518L279,518L287,519L291,520L299,521L299,521L301,523L302,526L304,528L306,530L309,533L314,540L318,544L321,546L323,548L324,549L326,552L328,559L328,562L328,565L330,569L332,572L334,573L335,574L337,576L339,578L342,579L345,581L350,584L353,586L354,586L356,585L357,583L359,582L360,582L360,581L360,580L361,577L363,573L366,571L368,570L370,570L371,569L373,568L374,570L378,570L382,571L385,571L385,571L386,571L386,571L387,572L388,572L389,572L390,575L395,579L395,580L397,582L400,585L402,588L402,590L404,593L406,598L407,600L407,600L407,602L408,604L409,606L411,607L413,610L415,614L418,617L421,619L422,621L423,623L423,625L422,626L422,627L423,628L423,629L423,631L423,632L426,636L427,638L428,643L429,645L431,646L434,647L436,648L437,649L439,650L441,650L443,651L445,653L449,654L455,655L459,656L462,658L463,658L464,658L465,657L467,657L467,661L466,665L462,672L460,677L457,690L455,699L455,700L278,700ZM202,655L202,657L201,657L200,655L199,654L200,653L202,654ZM167,561L167,561L165,560L162,554L160,552L160,551L161,548L162,549L164,551L164,552L164,554L167,555L167,559ZM125,574L125,575L122,573L124,571L124,568L125,568L126,569L126,572ZM184,565L182,570L181,569L178,567L178,566L180,561L181,560L184,560L184,561L184,562ZM72,543L71,544L70,539L70,538L71,538L72,538L72,539L72,540L73,541ZM214,675L214,675L213,674L213,671L213,671L215,675ZM150,499L149,499L148,498L148,497L149,497L149,498L150,499ZM195,632L195,633L194,632L192,635L192,635L193,631L194,631L195,631ZM178,664L177,665L172,660L173,660L175,661ZM171,660L171,660L169,657L169,656L169,655L167,654L169,651L172,644L172,645L170,652L169,653L170,656L170,657L171,659Z","states":"M631,556L631,552L630,545L629,537L627,523L628,518L628,504L628,500L628,479L628,476L629,464L629,457L628,457L627,455L627,455L636,454L640,454L650,453L658,452L668,452L672,451L674,457L676,465L680,477L681,483L685,496L685,497L685,497L686,498L687,501L688,502L689,503L689,505L690,505L690,508L691,508L692,509L691,510L690,511L689,512L689,514L689,516L688,517L688,518L689,521L689,521L690,523L691,525L690,526L691,527L690,529L690,530L690,530L690,531L690,532L692,534L693,536L688,537L676,538L665,539L656,540L645,541L645,542L645,544L646,546L647,546L649,548L650,549L649,551L649,552L650,553L649,554L649,556L648,556M153,477L154,477L155,477L157,477L157,476L158,475L159,474L158,471L156,471L155,469L156,468L156,466L156,465L157,464L156,463L157,463L160,461L160,460L160,459L161,457L161,457L162,456L161,455L162,454L162,452L164,450L164,449L165,449L166,448L167,448L170,446L170,445L170,444L169,444L167,442L167,441L167,440L166,436L165,434L165,433L164,432L165,429L165,427L165,427L166,426L166,425L167,421L166,420L166,419L166,418L166,417L167,416L166,415L166,413L167,412L167,411L167,410L168,410L167,409L167,407L167,407L167,405L170,405L171,404L172,405L172,405L174,405L175,407L175,407L176,408L177,409L179,405L180,405L180,401L181,396L183,388L208,393L227,396L243,398L243,398L267,402L260,455L258,467L250,524M693,536L693,538L694,538L695,541L696,542L705,541L722,540L745,539L745,540L746,540L746,542L747,543L749,542L749,541L749,540L749,538L748,536L748,534L749,534L749,532L750,532L751,533L752,533L754,534L757,534L758,533L759,534M672,451L675,451L683,450L695,448L707,447L707,447L716,445L716,447L714,448L713,451L712,452L713,453L715,454L716,454L718,456L719,457L721,456L721,456L722,459L723,459L724,460L724,461L725,463L726,463L727,464L728,465L729,467L729,467L731,468L733,469L735,470L736,473L737,473L738,473L739,474L740,475L742,476L741,477L741,478L743,480L743,480L744,481L745,481L745,481L746,482L747,483L748,483L749,484L750,484L750,486L751,487L752,488L752,488L753,491L753,492L753,492L754,493L756,493L756,494L758,495L757,496L760,499L759,500L760,501L760,501L760,503L762,503L762,502L764,504L765,504M637,306L653,304L669,303L669,304L670,309L673,334L673,342L674,351L675,356L675,360L674,362L676,363L675,364L675,365L676,365L677,365L676,366L676,367L675,367L674,368L672,369L671,370L670,370L669,369L667,369L666,370L666,372L667,374L666,375L666,375L664,376L663,379L662,380L661,380L661,380L660,381L660,383L660,384L660,386L659,386L658,387L658,387L657,386L655,387L654,386L654,384L652,383L652,384L653,384L651,385L651,384L650,385L651,385L651,386L650,386L650,388L650,389L649,389L649,390L648,391L648,391L648,390L647,390L646,390L645,388L644,388L643,389L642,390L641,391L641,392L640,393L639,392L638,392L635,390L634,390L633,391L632,391L632,390L631,391L632,392L631,393L631,393L630,391L628,392L627,391L627,391L626,392L627,394L626,395L625,394L623,392L625,392L624,391L625,390L625,389L624,389L625,388L625,387L625,388L626,386L625,385L625,384L625,384L626,383L626,384L626,383L627,383L627,381L628,381L628,380L628,379L630,378L630,377L630,375L631,374L632,373L632,372L631,370L631,368L630,368L630,366L629,365L629,364L630,363L629,362L629,360L630,360L629,353L629,346L628,335L626,313L626,308M391,348L427,350L453,351L485,352L501,352L502,353L503,353L503,354L504,354L504,354L506,355L506,354L508,354L507,355L508,355L508,357L509,356L508,357L507,357L507,359L506,359L506,360L505,361L505,362L506,363L506,363L507,364L507,365L509,365L508,366L508,367L509,368L509,369L510,369L510,369L512,369L512,370L513,370L513,371L513,379L513,381L513,394L513,395L514,410L514,417L498,417L486,417L462,417L450,417L428,416L418,416L409,415L387,414M883,232L881,231L880,230L880,229L878,228L877,227L877,225L876,225L876,223L876,223L874,217L874,216L869,200L865,187M883,263L882,262L881,262L880,261L880,259L879,260L878,257L872,259L872,259L861,261L857,262L857,263L856,263L856,262L846,265L845,264L845,256L846,249L858,246L869,244L876,242L876,241L877,241L877,240L878,239L879,239L879,238L881,237L882,237L882,237M885,267L884,264L883,263M549,205L548,204L547,204L547,205L546,205L547,205L546,206L545,206L546,218L545,219L545,220L544,220L543,221L542,221L542,221L541,222L539,223L538,225L537,226L537,229L537,230L538,230L539,230L540,230L540,231L541,232L541,233L540,234L540,235L539,236L539,237L539,238L540,240L539,241L539,241L539,243L540,243L539,244L539,246L539,247L539,248L540,248L543,250L543,251L546,251L547,252L547,253L548,254L551,255L553,256L553,257L553,257L554,259L555,260L556,260L556,261L558,262L561,263L561,264L563,266L564,268L564,270L564,271L564,272L564,273L565,273L541,275L534,275L512,275L483,275L483,253L483,251L483,245L483,236L482,235L481,234L480,234L479,233L478,231L477,230L477,229L479,228L480,227L481,225L481,223L481,221L482,220L481,216L481,214L480,214L479,212L479,211L479,209L478,207L478,206L478,203L478,203L479,201L478,201L478,200L478,197L478,195L477,193L478,192L477,190L477,186L477,186L476,183L476,183L475,180L474,179L474,177L473,175L473,173L474,172L473,170L473,169L473,167L473,166L473,165L474,164L474,163L473,162L473,160L472,157L472,157M825,322L826,322L826,320L826,319L827,318L829,317L830,316L830,315L833,312L834,311L834,310L835,310L836,309L835,308L833,308L833,307L831,306L831,305L829,305L829,304L828,303L828,302L826,302L826,301L826,300L825,300L826,298L826,298L827,295L825,293L826,292L827,292L827,290L827,290L828,289L828,288L828,286L829,284L830,284L836,286L844,288L845,289L844,292L844,294L844,296M844,296L842,297L842,299L841,299L841,300M825,324L825,324M695,448L695,443L696,442L696,443L698,442L699,441L699,440L699,440L699,439L700,437L700,437L701,436L702,436L703,435L708,434L708,433L710,432L711,430L712,430L713,429L714,428L715,428L717,426L716,425L717,424L718,425L719,423L721,421L722,422L721,423L722,424L724,422L725,420L726,419L727,419L728,418L729,418L729,419L730,419L731,418L732,414L734,413L735,413L736,413L735,412L736,410L735,409L735,408L741,407L744,407L750,406L752,406L759,405L772,403L789,400L794,399L816,394L818,394L834,390M800,457L793,452L785,447L783,445L776,440L757,443L756,441L753,438L752,439L751,439L751,438L751,437L748,437L729,439L728,440L728,439L727,440L726,440L725,441L723,442L722,443L721,443L716,445M481,223L470,222L454,222L440,222L420,221L384,218L369,217L373,165L373,165L374,152M514,417L514,428L515,434L516,445L517,452L517,458L517,463L517,470L517,478L517,490L516,491L515,489L514,490L514,489L513,489L512,488L510,488L509,487L508,486L507,486L505,484L504,483L503,485L503,485L499,485L498,485L498,484L497,484L496,485L494,485L494,486L493,486L493,486L491,485L491,486L489,486L487,486L487,488L486,488L485,488L484,489L483,489L482,487L481,488L480,486L480,487L479,486L479,485L478,485L477,486L476,486L476,486L475,485L475,486L474,485L474,484L473,484L472,484L472,485L471,487L470,487L471,488L470,489L469,488L468,487L469,486L469,485L468,484L468,485L468,485L466,485L465,486L464,486L464,485L463,484L462,485L461,484L462,483L460,483L460,483L459,484L457,485L456,486L455,485L455,483L453,482L452,480L453,480L452,479L451,480L449,479L448,479L447,480L446,481L444,479L443,478L442,479L441,479L440,478L438,478L437,477L436,477L434,477L433,477L433,474L430,472L430,473L429,473L428,472L427,472L426,473L424,473L423,471L421,469L419,469L421,427L393,425L369,424L370,421L370,413M747,280L748,286L762,284L766,283L776,281L789,278L795,277L801,276L811,274L817,272L818,273L819,275L820,275L821,275L822,276L822,276L823,277L824,279L823,280L825,282L825,282L826,282L827,283L828,282L828,283L829,282L829,283L830,284M826,319L825,319L823,319L822,320L821,321L821,322L792,328L779,331L761,334L744,337L741,317L736,288M483,275L481,275L480,276L482,278L482,280L481,280L481,281L481,281L482,281L483,283L483,284L483,285L482,285L482,287L481,288L481,289L481,290L481,291L480,291L480,293L481,293L482,294L482,296L482,297L483,297L482,297L482,297L480,297L480,296L479,295L479,294L477,293L477,293L476,292L475,292L474,291L472,291L472,291L471,290L471,289L469,289L468,289L468,289L467,289L466,289L465,289L464,289L463,289L461,289L460,289L460,290L459,291L458,291L456,290L454,289L451,287L451,286L434,285L425,285L401,284L398,283L363,281L364,274L367,240L367,238L367,238L369,221L369,217M517,490L517,490L518,491L519,492L519,492L519,492L520,492L522,492L522,491L524,492L524,492L525,492L525,492L525,492L525,504L526,526L526,526L527,528L528,528L529,530L530,531L530,531L530,532L530,533L530,534L530,534L531,536L531,536L531,537L532,538L533,540L533,541L534,541L534,544L535,543L535,545L536,547L535,547L535,548L536,549L535,550L535,551L534,553L534,554L533,555L533,556L532,557L533,560L532,560L532,562L533,563L532,565L533,566L532,567L533,568L531,569L531,571L530,572L529,573L531,576M298,520L296,519L296,518L296,517L296,515L349,520L361,521L363,499L363,494L364,484L365,479L367,451L367,443L368,428L369,424L369,424M363,281L360,324M279,315L293,317L302,318L321,320L325,321L333,322L347,323L347,323L360,324L392,327L391,348L390,356L390,364L390,367L388,391L388,394L387,414L375,413L370,413L358,412L347,411L334,410L316,408L304,407L304,407L281,404L267,402L269,391L269,390L271,377L271,374L272,365L273,361L278,326L278,325L279,315L263,313L260,313L247,311L249,302L249,298L251,289L253,277L253,274L256,253L256,253L258,243L259,238L259,236L260,233L260,227L261,225L265,225L266,226L271,226L271,226L274,227L275,227L280,228L290,229L291,229L320,233L321,233L338,235L340,235L347,236L367,238M872,259L874,265L874,268L875,271L875,272L875,273L875,274M848,288L848,287L847,286L850,282L849,281L848,278L847,272L846,265M501,352L499,351L500,349L498,348L498,346L497,346L497,345L496,345L495,343L496,342L495,341L495,341L496,340L495,339L495,340L494,340L494,339L513,339L522,339L530,338L533,338L545,338L554,337L559,337L560,338L561,338L561,339L562,340L563,340L563,341L564,342L565,342L564,342L563,345L563,346L564,349L565,351L565,353L565,353L566,354L566,356L569,358L569,358L570,360L571,360L572,361L573,362L576,364L577,366L578,368L578,369L578,370L579,371L579,373L580,374L581,373L582,372L583,372L585,372L586,372L588,374L588,375L587,377L587,378L587,379L586,381L586,383L585,384L584,385L585,387L585,388L586,389L587,390L589,391L590,392L590,392L591,393L592,393L592,393L592,394L592,395L593,395L594,394L595,395L596,395L597,396L597,397L598,397L599,398L600,398L600,399L601,401L600,401L600,402L602,405L602,406L601,406L600,407L601,408L601,409L603,411L603,412L605,413L605,413L604,412L605,412L606,413L607,414L607,413L608,414L607,416L607,417L608,418L608,418L607,418L607,419L607,420L607,422L606,423L605,421L604,421L603,424L603,425L602,425L602,424L602,424L602,423L601,423L600,423L601,424L602,425L601,426L602,427L602,428L600,428L600,429L602,429L602,430L601,430L599,430L599,430L600,432L601,433L599,434L599,435L598,435L587,436L588,434L590,433L590,431L591,431L592,430L592,427L591,427L591,425L569,426L540,427L514,428M761,334L763,345L763,345L765,343L766,343L766,341L768,340L768,338L771,339L773,334L774,335L775,336L777,336L778,336L779,335L778,334L779,334L780,333L781,333L782,331L783,331L785,332L786,332L787,332L788,332L788,332L787,333L788,334L790,335L791,336L790,337L791,337L791,338L790,342L780,336L780,337L781,339L780,341L780,341L780,342L781,343L778,346L779,346L778,348L778,347L777,349L776,349L775,350L775,353L772,351L772,353L771,355L771,356L771,356L770,357L770,360L769,362L766,361L764,359L762,359L762,361L762,362L761,366L761,366L761,367L759,369L759,370L760,370L759,371L759,373L756,376L755,379L756,379L755,380L755,381L756,381L755,383L755,384L756,384L756,384L753,386L752,385L751,386L750,387L748,388L748,388L746,387L746,388L747,389L746,390L743,391L741,392L739,391L738,391L738,392L736,393L735,394L733,394L731,393L730,393L730,392L729,392L728,390L727,390L727,389L728,388L727,388L727,388L725,388L724,386L723,387L722,386L722,386L720,383L719,382L719,381L718,381L717,381L718,379L717,379L716,378L714,376L715,376L714,374L715,374L715,373L714,372L714,370L715,370L717,369L719,369L719,366L719,366L720,366L721,365L720,363L719,361L720,360L720,359L721,357L722,356L723,356L723,356L724,358L724,359L724,359L725,357L726,357L726,355L725,354L726,354L726,352L727,351L727,350L728,349L728,348L730,346L731,346L731,347L732,347L733,346L734,346L734,345L735,345L735,344L738,340L739,340L738,339L739,338L738,337L739,336L739,335L739,335L739,333L739,334L739,333L740,332L739,330L740,329L739,328L740,326L741,326L741,324L740,323L740,321L739,320L739,319L739,318L740,318L741,317M565,342L565,341L565,340L565,339L565,338L565,337L567,336L568,336L569,335L570,332L571,330L571,329L572,327L572,326L571,324L570,324L569,323L569,321L570,319L571,318L571,318L573,318L575,318L576,317L577,316L579,316L580,315L581,314L581,313L581,312L581,311L583,309L583,309L583,307L583,306L583,305L583,304L583,303L582,302L579,301L578,299L579,298L578,297L576,296L576,296L575,295L575,295L590,294L593,294L604,293L606,293L615,292L620,292M625,394L624,395L623,396L623,397L623,399L625,400L624,401L621,402L620,403L619,403L618,404L617,406L619,408L619,409L619,410L617,411L616,410L614,409L613,408L611,408L609,408L608,409L608,410L607,411L606,412L607,413M598,435L599,436L600,437L600,438L599,437L598,438L599,439L598,440L597,441L596,441L596,441L595,442L595,443L596,443L597,443L597,443L595,444L596,445L596,445L596,446L595,445L594,445L594,447L594,447L594,449L593,447L592,449L592,449L592,449L592,449L593,449L593,450L593,451L592,451L592,452L593,452L594,453L593,454L594,455L593,455L593,455L592,455L592,457L590,457L590,458L591,459L591,460L590,461L588,462L588,460L587,460L588,462L587,462L588,464L587,464L587,462L586,464L586,465L587,465L588,465L587,466L586,466L586,465L585,465L585,467L586,468L586,469L586,471L585,472L585,473L584,473L584,472L583,472L583,473L583,473L583,474L582,474L581,476L580,475L580,475L581,476L582,476L582,477L581,477L580,477L580,477L580,478L581,479L581,480L579,480L580,481L579,481L579,480L578,481L577,481L579,482L578,483L578,484L579,485L579,485L578,485L577,485L577,486L577,487L578,487L579,487L578,488L577,487L576,487L575,487L575,488L577,489L577,489L575,490L576,491L575,493L576,492L576,491L577,492L577,493L576,493L576,494L578,494L578,492L578,493L577,495L577,496L578,497L578,496L579,496L578,497L578,499L577,499L576,500L578,501L577,502L563,503L543,503L525,504M46,242L55,244L55,244L59,246L62,246L64,247L70,249L72,249L78,251L80,252L95,256L106,259L111,260L111,260L104,286L104,287L100,301L99,308L98,308L96,316L96,318L95,323L101,333L106,341L109,345L122,365L128,374L143,396L154,413L165,429M839,347L832,348L828,349L828,348L821,324L821,322M565,273L564,274L565,275L565,277L567,277L567,279L566,280L566,281L566,283L566,285L566,286L567,287L568,290L570,291L574,292L575,294L575,295M494,339L494,338L493,337L493,337L492,336L492,335L493,335L492,333L493,332L493,332L493,330L492,330L492,329L492,328L492,326L493,326L491,326L491,325L491,324L492,323L491,322L491,322L491,320L490,320L490,318L489,319L488,318L489,317L488,316L488,316L488,315L489,315L488,314L489,312L488,312L488,311L487,310L488,309L487,309L487,308L486,307L486,305L484,304L484,303L485,303L484,301L483,301L483,299L484,298L484,297L483,297M675,360L676,359L678,360L679,361L680,360L682,359L682,361L684,361L685,362L686,364L686,366L689,366L691,365L692,366L693,367L694,367L694,368L696,368L696,367L698,366L699,367L701,367L702,368L702,367L704,367L705,366L706,365L706,365L707,364L708,364L709,364L709,365L709,367L710,368L712,368L714,369L714,370M727,388L722,395L720,396L717,398L716,399L716,400L715,401L714,402L714,403L714,404L713,405L711,405L710,407L710,408L709,408L705,410L704,410L702,412L701,412L701,413L696,413L687,414L681,415L678,415L674,415L670,416L664,416L661,416L656,416L653,417L652,417L651,417L642,418L637,418L630,419L630,419L626,419L627,421L627,422L618,423L610,424L605,424L603,424M602,424L601,424M825,361L825,361M837,357L831,359L831,360M804,350L803,349L805,348L804,347M803,344L804,342L806,344L804,347L804,345L803,344L802,343L800,343L800,342L798,342L796,342L795,341L795,340L796,339L794,338L794,337L793,337L792,337L791,337M690,301L676,303L669,304M618,235L617,235L616,233L616,231L617,230L616,229L615,230L614,230L614,230L613,229L613,228L614,227L614,226L614,224L613,223L614,223L614,222L612,221L611,221L611,221L609,221L608,220L609,219L609,218L607,217L606,218L604,217L604,217L603,217L603,216L601,217L601,217L600,217L600,217L599,216L598,217L594,214L578,211L578,211L576,208L575,207L574,207L574,207L574,207L573,207M590,458L604,457L627,455M611,562L610,562L609,561L609,558L607,557L607,556L606,555L605,554L605,552L604,552L605,545L606,545L605,544L586,545L571,546L571,546L572,545L571,544L571,542L571,542L570,541L570,540L571,540L573,540L573,539L572,538L571,537L572,537L573,538L573,537L572,536L572,535L573,534L574,534L574,533L573,533L572,533L572,532L573,532L574,532L574,530L575,530L576,530L577,529L575,529L575,527L576,527L577,528L576,527L578,526L578,525L578,524L579,524L579,523L578,523L578,522L579,523L580,522L581,520L580,520L580,521L578,521L578,520L580,519L580,519L581,519L581,517L582,517L583,516L582,516L581,516L581,515L581,515L581,514L580,514L579,514L579,512L580,513L580,513L579,512L580,510L580,510L580,511L578,511L578,510L579,509L579,508L577,508L578,506L579,505L579,504L578,502L578,503L578,504L577,504L576,504L577,502M259,236L258,235L258,234L257,233L257,232L256,230L255,229L254,230L253,230L254,230L252,232L253,233L251,233L251,233L250,232L249,233L248,233L247,232L246,232L245,232L245,232L243,232L242,232L242,231L241,231L240,231L239,232L239,233L238,232L237,232L237,232L235,232L234,231L233,231L232,232L232,233L231,234L231,233L229,231L229,230L230,230L229,228L229,227L229,224L227,223L226,223L226,223L224,221L224,219L225,219L225,217L224,216L224,216L223,215L223,214L222,212L222,212L222,211L222,209L222,208L222,206L221,206L222,205L221,203L220,203L220,202L219,202L219,203L218,203L217,205L216,205L215,205L215,206L213,206L213,205L212,205L212,204L211,203L211,202L211,202L212,201L212,200L211,199L213,197L214,198L214,197L214,196L214,195L214,194L214,193L214,192L213,191L214,191L215,191L215,189L215,189L216,188L216,186L217,185L217,184L217,184L218,182L218,181L218,180L217,181L216,181L215,180L214,180L214,179L214,179L213,178L212,179L212,178L213,177L211,176L210,175L211,173L210,172L209,172L209,171L208,168L207,167L207,166L207,165L205,165L204,164L204,163L202,160L202,160L203,160L203,160L202,159L202,158L202,158L202,157L203,157L202,156L203,155L202,154L202,153L202,153L201,152L201,151L199,148L200,143L201,141L204,126M858,246L857,246L857,246L856,244L856,243L856,242L856,241L857,240L856,239L856,239L856,238L855,235L856,234L855,233L855,230L855,230L855,228L855,227L855,225L855,224L856,223L856,223L856,221L857,220L856,218L857,216L857,215L856,214L856,213L856,212L856,211L858,210L858,210L859,210L859,209L860,208L861,206L862,206L861,205L862,204L861,203L861,202L860,201L860,199L860,198L861,197L860,195L860,195M833,202L833,203L833,205L834,206L834,207L834,210L834,211L836,212L836,213L836,215L837,217L837,218L836,219L836,222L837,223L837,224L838,226L838,227L839,228L839,230L839,232L839,232L839,231L840,231L841,232L842,232L843,238L845,246L845,248L846,249M83,156L84,156L84,157L84,158L85,159L86,160L88,159L88,160L91,163L91,164L91,165L91,168L91,169L91,170L90,172L92,173L94,175L95,175L95,175L96,176L97,176L98,176L100,176L103,176L104,175L105,175L106,175L107,176L109,176L110,177L111,177L113,178L113,179L114,180L115,179L117,179L117,180L118,179L121,179L122,179L123,179L124,180L128,181L129,180L130,180L132,180L135,180L137,180L138,179L138,179L140,180L143,180L145,180L147,180L147,180L156,182L178,187L178,189L179,190L179,191L180,191L180,192L181,192L182,193L182,194L182,197L181,198L181,199L180,200L178,202L178,203L177,203L176,205L176,206L175,207L174,208L174,208L174,210L173,211L172,212L172,212L170,213L169,214L168,216L167,217L166,218L166,219L165,219L166,221L165,222L166,223L167,222L167,224L168,224L168,225L169,225L168,227L168,227L168,228L168,228L168,229L167,231L167,232L166,232L166,233L157,271L132,265L131,265L111,260M701,412L708,411L708,411L718,410L722,409L731,408L731,408L736,407L735,408M183,388L187,366L188,363L189,358L190,352L196,321L196,319L199,307L200,302L204,281L207,282L222,284L233,286L233,286L251,289M190,123L189,129L187,137L186,142L183,154L183,155L178,178L177,179L178,180L178,181L178,182L178,183L177,185L177,185L178,187M204,281L195,279L192,278L188,278L167,273L157,271","nation":"M633,559L637,558L637,557L638,558L637,559L636,558L634,559ZM759,534L759,534L759,536L760,538L760,538L761,542L764,549L765,551L765,552L768,557L771,562L774,566L779,573L782,576L784,579L783,580L783,583L784,587L786,589L789,594L791,599L793,601L795,605L796,606L797,608L799,613L800,617L800,620L800,624L800,625L800,630L801,633L800,636L800,635L799,636L798,640L798,640L798,642L798,643L799,643L798,645L798,646L799,645L800,641L801,641L801,642L799,647L798,648L795,653L793,655L793,655L796,651L797,648L795,648L792,649L791,650L789,649L788,650L788,651L784,652L783,651L782,650L782,648L783,646L782,644L781,644L781,643L780,642L779,642L778,640L777,640L776,639L775,638L771,637L770,638L769,636L767,633L766,630L765,627L763,625L762,625L762,624L761,624L761,625L760,626L760,624L759,622L758,622L759,621L760,622L760,619L760,617L759,617L759,615L758,616L757,617L758,619L756,620L756,621L756,620L752,614L751,613L749,610L747,608L746,607L746,606L746,605L747,604L748,603L749,600L750,599L750,598L750,596L748,596L749,598L747,598L748,597L747,595L744,594L744,596L744,596L745,597L746,597L747,599L746,599L746,601L745,601L745,603L745,603L744,603L744,601L742,598L742,595L741,594L740,591L741,591L741,592L742,594L742,594L742,591L742,590L743,589L743,586L743,585L743,584L743,582L743,581L743,580L742,580L742,579L741,577L742,576L740,574L740,573L739,572L739,572L739,571L738,571L735,571L734,572L733,570L733,569L731,569L731,567L730,566L729,566L728,565L726,564L726,562L726,561L725,561L723,560L722,559L722,558L721,557L718,555L715,554L713,553L711,554L709,554L709,555L707,556L708,558L708,558L706,558L706,558L704,559L702,560L698,563L698,562L697,562L696,564L694,564L695,565L695,566L696,566L700,564L701,562L702,562L700,564L695,567L692,565L691,565L690,566L689,564L688,562L688,561L689,563L689,565L690,565L690,564L690,562L689,561L688,560L686,560L685,559L684,558L682,557L681,556L678,554L674,553L670,553L668,552L664,552L662,553L659,553L655,555L652,555L652,555L648,556L645,557L643,558L639,558L640,558L641,558L643,557L643,557L642,555L640,554L640,553L640,551L640,550L639,549L638,549L637,549L637,550L637,553L637,555L636,557L635,557L635,556L634,555L633,556L633,555L631,556L630,557L629,557L628,557L628,556L626,556L625,557L624,556L624,557L622,556L621,556L619,557L615,559L615,558L614,557L613,558L614,559L613,560L612,561L611,562L610,562L609,562L608,563L608,564L607,564L607,565L605,565L605,566L605,567L606,567L607,567L607,568L609,569L610,568L610,566L612,565L612,564L614,564L613,565L613,566L614,566L614,567L615,567L616,565L617,566L617,567L616,567L615,568L616,567L616,568L614,569L615,570L616,569L616,570L614,570L613,571L613,573L613,573L612,571L611,571L611,573L609,573L610,574L610,575L609,574L609,575L609,575L610,576L611,576L612,577L612,579L615,578L616,579L616,578L617,580L618,579L620,581L620,582L622,582L622,582L620,583L620,583L621,583L621,584L620,584L620,586L620,587L618,586L618,585L617,585L616,588L615,588L615,587L616,586L616,585L616,584L617,584L617,583L616,582L616,584L615,584L614,584L613,582L611,582L610,581L606,581L605,581L602,584L599,586L599,585L598,585L598,584L597,582L597,582L596,583L596,582L595,581L594,582L592,582L592,582L593,583L592,583L591,585L591,585L590,586L590,586L588,586L588,588L587,587L587,587L586,586L585,585L584,585L583,585L582,584L580,584L579,584L578,583L579,582L579,581L581,582L581,582L581,583L582,583L582,581L580,580L580,580L579,580L579,580L578,581L578,580L577,580L578,579L577,578L575,579L575,578L574,578L573,576L572,576L572,575L572,573L570,573L568,574L567,573L568,572L568,572L567,571L566,572L565,572L565,572L563,574L562,573L561,574L562,575L563,575L563,575L563,576L564,576L564,577L562,577L560,578L559,578L554,577L551,577L547,575L546,574L543,574L541,574L540,574L537,574L532,575L531,576L531,576L527,576L525,577L516,581L515,582L514,583L513,583L514,582L515,581L516,580L517,580L518,580L517,579L514,580L513,579L514,578L514,575L513,574L512,575L511,576L510,577L510,576L509,577L508,578L509,578L508,579L509,580L510,580L510,581L511,582L511,584L510,585L507,587L506,587L506,589L506,589L511,585L512,584L512,584L514,584L513,585L508,588L506,590L504,591L502,594L501,594L496,597L494,598L490,600L486,602L482,605L481,606L478,608L476,609L473,612L471,615L470,616L469,617L467,621L465,625L464,627L463,631L463,635L464,639L465,642L465,645L467,649L467,654L467,653L466,650L465,644L463,644L464,643L463,638L463,636L463,632L464,627L465,623L466,621L467,619L468,617L468,616L469,615L470,614L472,611L474,610L475,609L476,609L478,607L480,606L482,605L481,605L482,604L481,604L479,605L478,606L477,606L476,604L475,604L475,604L475,607L475,608L472,610L470,609L470,609L468,610L467,611L468,611L470,610L470,612L470,612L467,616L466,616L466,615L464,615L464,615L462,615L461,615L461,616L462,616L463,616L463,617L464,618L466,619L464,622L463,625L463,627L461,628L460,628L461,627L461,626L458,628L458,629L460,629L462,628L462,634L461,638L461,638L462,643L462,644L462,645L463,645L465,649L465,650L464,651L464,652L465,654L466,654L466,655L467,654L467,657L466,657L465,657L463,657L463,659L462,659L461,658L460,658L460,657L459,657L458,655L455,655L455,654L453,654L451,654L450,654L450,654L449,654L447,654L445,653L446,653L444,653L444,652L443,652L442,650L441,651L439,650L438,650L436,648L435,647L433,647L432,646L431,646L430,646L429,645L430,645L429,644L428,643L428,641L427,639L427,639L426,637L425,636L425,635L424,634L424,634L423,633L423,631L424,629L423,628L422,627L422,627L422,626L422,626L423,623L422,622L422,621L421,620L421,620L421,619L420,620L419,619L419,619L417,616L416,616L415,616L415,614L415,613L414,613L415,612L413,611L413,610L412,609L412,608L409,607L409,606L409,606L408,605L408,604L407,602L407,601L407,601L407,600L406,600L406,599L406,598L405,598L405,597L404,597L404,595L404,594L404,593L403,593L403,591L402,590L402,589L402,587L400,586L399,584L398,583L398,582L397,581L395,581L395,579L393,578L393,577L391,577L391,575L390,576L390,575L389,574L388,572L387,571L386,572L386,571L385,571L383,572L382,571L380,571L379,571L378,570L376,571L375,570L374,569L373,569L372,568L371,569L370,571L368,570L365,571L365,571L364,572L363,573L363,575L362,575L361,579L360,579L360,581L360,581L360,582L359,583L358,582L357,584L356,585L355,586L353,586L352,586L351,585L349,585L348,583L346,582L346,582L344,581L343,580L342,579L340,579L338,578L337,577L337,576L335,573L333,573L332,572L330,570L330,569L329,567L328,564L328,563L327,562L328,560L328,558L328,557L327,556L327,556L326,554L325,553L325,553L325,549L324,549L324,549L323,547L322,547L321,545L319,544L316,542L316,542L314,539L313,537L312,536L310,535L310,534L308,532L307,531L307,530L306,530L305,529L303,528L302,526L302,526L301,524L300,522L299,521L298,521L298,520L267,517L266,526L250,524L246,524L214,519L192,506L179,499L173,495L151,482L151,481L151,479L152,479L153,477L126,474L110,472L110,470L109,469L108,469L109,466L109,465L109,464L109,461L109,459L109,458L107,454L106,452L105,451L104,450L103,448L102,447L101,446L99,443L98,442L97,443L96,443L94,442L93,441L93,441L94,439L94,437L93,436L93,434L89,434L88,434L87,433L86,433L83,431L83,431L82,429L81,427L79,425L79,423L77,422L75,422L74,422L73,421L72,421L70,419L67,418L65,418L62,417L61,415L60,415L60,415L59,414L61,411L60,410L62,408L61,407L62,405L63,402L62,401L61,401L59,400L59,399L60,396L60,395L60,394L58,394L57,391L56,389L55,388L54,387L55,385L53,383L53,380L52,379L52,377L50,375L49,373L48,372L48,371L49,370L48,368L49,366L48,366L49,365L50,366L52,364L53,362L52,359L51,357L51,358L49,357L47,355L46,353L46,353L46,352L45,351L45,350L46,347L46,345L46,344L45,343L45,342L46,340L47,338L49,338L49,340L48,340L48,342L48,343L50,343L51,345L51,345L52,347L52,347L52,346L52,344L52,342L51,340L51,340L50,339L51,337L51,336L50,336L49,334L50,334L51,334L52,334L52,334L52,332L51,331L49,331L48,333L49,334L48,334L48,335L49,336L48,336L48,337L47,337L46,336L45,335L44,335L43,333L43,332L42,331L41,331L40,331L42,328L42,326L42,326L42,324L41,324L41,323L41,321L39,319L38,318L37,314L35,310L34,308L35,306L36,306L35,301L35,299L36,297L38,295L38,293L38,291L38,289L37,288L37,287L36,284L36,282L35,281L33,277L33,276L33,275L33,273L34,272L36,270L39,266L40,264L41,262L41,262L41,260L42,260L43,258L45,254L45,252L45,249L45,247L45,247L44,246L45,245L46,243L46,242L45,239L45,237L45,236L45,234L46,231L47,229L47,227L47,225L46,225L46,223L49,220L50,217L51,216L52,214L52,214L53,212L55,210L57,207L59,202L61,198L62,195L62,195L64,191L64,190L65,187L66,185L66,185L67,183L69,179L70,177L71,175L71,173L72,172L72,170L72,170L73,167L74,165L73,165L74,163L74,162L74,161L75,160L76,158L76,155L77,156L78,157L78,156L79,156L80,157L81,157L81,157L83,156L81,155L81,155L80,155L80,155L79,155L78,155L77,155L77,153L76,153L76,154L75,154L76,151L77,149L78,146L78,147L77,149L77,152L78,152L78,151L78,150L78,149L78,150L79,149L79,147L80,146L81,145L81,145L80,145L79,145L78,144L78,143L78,140L79,140L79,141L80,141L82,141L82,140L81,139L81,138L79,138L79,138L79,140L78,140L78,139L79,135L79,132L79,130L79,125L80,122L79,121L79,120L78,119L78,118L78,114L78,113L78,112L79,111L80,109L79,108L80,108L82,109L83,111L85,112L85,112L87,113L87,114L88,115L91,116L92,116L94,117L96,118L96,119L98,119L100,118L100,119L101,120L101,121L102,121L103,121L102,121L103,122L103,123L103,123L104,122L103,121L103,121L104,120L105,121L105,121L104,122L105,123L105,122L106,122L106,124L105,123L105,124L105,126L106,126L105,127L105,126L104,127L103,128L102,130L102,129L103,128L103,127L101,129L101,130L99,131L96,133L95,135L97,136L99,135L99,135L96,135L96,135L99,131L101,130L103,130L103,129L104,128L106,127L106,125L107,126L107,130L106,130L106,130L106,131L106,132L106,133L105,134L105,134L105,135L105,135L104,137L104,137L103,138L103,139L102,140L101,139L102,137L101,137L100,138L101,140L101,141L101,141L100,142L99,141L99,138L100,138L100,137L99,138L99,140L98,140L99,140L99,142L100,142L101,141L102,141L104,139L104,139L105,140L105,140L105,139L107,139L107,138L107,136L107,135L107,134L108,133L107,132L108,131L108,129L109,128L111,126L112,126L112,125L111,124L111,123L111,121L111,120L110,120L109,121L110,122L110,123L110,124L109,122L109,122L109,121L109,119L110,119L111,120L112,119L111,118L110,117L110,116L110,115L108,115L108,115L109,114L108,114L108,113L110,113L110,114L110,115L111,115L111,113L112,113L113,112L112,111L112,110L113,109L112,108L111,108L111,109L111,110L110,109L111,108L110,107L110,106L109,105L110,105L110,104L109,104L110,103L120,105L124,107L132,109L139,111L174,120L190,123L204,126L216,129L227,131L237,133L247,135L264,138L275,140L287,142L366,151L374,152L384,153L416,155L426,155L441,156L462,156L472,157L477,157L502,157L502,148L503,149L505,149L506,150L507,150L508,154L508,154L509,159L509,160L509,161L510,162L511,163L512,163L513,163L515,163L516,164L519,164L521,164L522,167L524,167L527,166L527,165L528,164L530,164L531,164L533,164L537,166L539,166L539,167L538,167L538,167L538,168L541,168L541,169L541,169L541,170L543,172L544,172L544,170L544,169L545,170L547,169L548,170L548,171L549,172L550,172L550,172L552,172L553,174L552,174L553,175L555,174L555,176L556,175L556,175L557,175L559,175L561,172L562,172L563,171L564,171L565,171L565,172L566,173L566,173L566,174L567,174L569,173L569,174L571,173L572,174L573,173L575,173L577,174L577,175L579,176L580,175L581,175L582,175L583,175L584,175L585,175L584,176L583,175L583,176L582,176L581,177L579,178L578,179L575,180L573,181L572,181L570,182L570,182L567,184L565,186L562,189L561,191L558,194L557,195L555,196L554,198L554,198L552,200L552,200L548,203L549,205L550,205L552,205L556,203L557,203L559,202L560,201L561,201L562,201L562,201L563,200L564,199L565,199L566,198L566,198L568,200L567,201L566,203L567,204L566,205L565,206L566,207L568,205L568,204L571,206L573,207L574,206L575,206L577,205L579,204L580,202L581,201L582,201L584,200L585,200L586,200L587,200L590,198L592,196L594,196L595,194L596,193L597,192L598,191L599,190L600,189L601,188L602,187L605,185L608,184L610,184L612,185L612,186L610,186L609,186L608,186L609,187L607,188L606,190L605,191L604,192L604,192L604,193L603,193L603,195L602,196L601,199L602,200L603,199L605,196L606,196L606,197L605,197L604,199L606,197L607,196L608,197L610,196L611,197L612,197L613,198L613,198L615,199L615,200L616,201L617,202L618,203L618,204L619,205L620,205L623,204L624,203L624,203L625,205L626,205L627,205L627,204L628,204L629,205L629,204L628,203L629,202L630,203L629,204L630,204L632,203L634,201L637,199L637,199L640,198L643,198L646,198L649,196L651,196L652,195L654,195L653,197L653,200L653,200L654,201L655,201L655,201L656,201L657,202L659,201L659,201L660,201L660,202L662,201L662,200L663,200L664,200L665,199L667,199L667,199L667,201L667,203L668,205L666,205L666,206L667,207L668,206L668,207L669,207L669,208L670,209L671,209L672,210L672,209L673,209L673,209L672,207L673,207L675,207L676,207L677,209L678,209L678,210L677,211L675,210L674,211L672,210L670,211L668,210L665,211L665,212L662,211L662,210L661,210L660,210L660,211L660,212L659,212L660,214L659,215L658,214L658,214L657,213L655,211L653,211L652,211L650,210L649,210L648,210L648,211L647,210L646,212L645,213L645,214L643,213L642,214L642,215L640,214L639,214L638,215L637,214L636,215L635,216L635,217L635,218L634,218L634,219L633,220L633,220L632,221L632,221L631,222L632,223L631,222L630,222L631,221L631,220L631,219L632,219L633,217L632,216L632,216L631,218L629,218L629,219L628,219L628,221L627,221L626,221L626,220L626,219L625,218L625,219L625,221L625,221L623,222L622,225L621,228L620,229L620,231L618,235L618,235L618,236L618,238L616,238L615,239L615,240L614,241L613,243L613,244L613,246L613,246L612,247L613,248L614,248L614,247L616,245L616,245L617,244L617,243L618,241L620,240L620,240L621,239L622,240L621,239L622,237L623,235L623,233L624,233L625,232L625,231L626,230L627,230L627,232L626,232L626,234L625,235L625,236L624,237L625,238L624,239L624,239L623,240L623,241L623,243L622,245L621,247L620,252L621,253L621,255L620,256L619,257L619,258L619,258L618,262L618,263L619,264L619,266L618,268L618,271L617,273L617,276L617,277L617,278L618,279L617,280L618,282L618,283L619,284L620,285L620,287L619,289L620,292L620,294L620,296L620,298L622,300L622,301L624,304L624,305L626,308L627,309L628,309L627,310L629,310L631,310L632,309L635,307L637,306L638,305L640,303L641,298L643,295L644,292L644,290L644,287L644,286L644,284L644,281L643,278L642,276L640,272L639,270L638,268L637,265L637,265L638,263L638,262L638,260L638,258L637,256L637,256L638,254L639,252L640,249L640,247L640,244L639,242L639,242L641,241L642,241L642,239L642,237L642,237L643,237L643,235L645,236L645,236L646,235L646,233L647,233L648,230L648,230L649,230L649,230L648,231L648,232L649,233L648,235L648,234L649,236L648,236L648,237L649,239L649,239L650,236L650,235L650,234L650,237L650,238L649,239L650,239L652,235L652,234L652,231L651,230L651,228L652,227L653,227L654,226L655,225L656,225L658,224L658,224L656,224L655,223L654,221L655,219L656,219L657,218L657,217L655,217L659,217L659,216L663,217L664,218L665,218L666,218L668,218L669,219L670,220L671,221L673,221L675,222L676,222L678,223L679,223L681,224L681,225L682,226L683,227L684,229L682,229L681,229L681,231L682,232L683,232L684,234L684,235L685,236L684,239L685,240L685,242L685,244L684,244L684,246L682,246L682,247L682,249L682,251L680,251L680,252L678,253L678,253L677,255L677,257L677,258L678,260L679,260L679,259L680,260L681,260L682,261L682,261L683,258L684,258L684,257L684,256L685,254L685,255L686,254L686,254L685,253L686,253L687,252L690,251L690,250L692,249L693,250L694,250L695,250L696,253L697,253L697,255L698,259L700,262L701,266L701,269L703,271L703,272L703,273L703,275L703,276L702,280L702,281L701,281L700,282L700,281L700,280L700,280L701,279L700,278L699,279L698,280L699,281L698,281L697,282L697,284L697,285L696,286L695,287L694,289L694,291L694,292L694,293L694,294L693,295L693,296L692,296L692,297L691,297L690,299L691,300L690,301L691,301L692,301L692,301L695,302L697,303L698,304L699,304L700,304L701,302L702,303L703,303L703,304L705,305L706,306L707,306L709,305L710,304L711,304L714,302L716,302L717,302L718,302L720,301L722,297L725,295L725,295L729,292L730,292L732,291L735,289L736,288L739,287L741,285L742,283L742,283L743,284L744,282L747,280L749,279L751,276L752,274L754,273L755,272L756,271L756,270L756,269L758,268L759,267L759,265L758,265L758,264L757,263L756,263L756,261L755,261L755,259L754,257L757,255L760,254L762,253L764,253L766,252L768,252L773,252L775,252L776,252L778,253L780,252L782,251L784,251L785,251L786,251L787,250L789,249L790,248L791,246L792,245L793,245L794,244L795,243L796,243L797,242L796,240L795,237L794,236L794,235L795,235L795,236L796,235L796,234L795,233L794,234L794,233L793,232L792,233L792,231L792,229L793,228L794,227L794,227L795,226L796,225L797,224L798,222L799,220L802,215L804,212L804,212L808,209L809,208L810,208L811,207L812,207L813,206L821,205L827,203L833,202L837,201L843,199L848,198L860,195L860,193L860,192L860,192L860,190L860,190L861,189L861,189L862,188L863,189L864,188L865,187L866,186L865,186L867,186L868,187L868,188L869,186L868,184L868,184L868,183L870,184L871,183L871,183L869,182L869,181L869,179L870,177L872,175L871,174L872,172L873,171L873,170L873,170L872,170L872,169L872,168L872,168L872,167L872,166L871,165L871,162L872,161L873,160L873,160L872,154L879,135L879,134L881,135L882,134L882,136L883,138L883,138L885,139L887,137L889,137L889,135L890,135L892,135L891,134L892,133L893,133L895,133L895,133L897,134L900,136L900,136L902,137L904,146L908,159L909,160L909,160L909,161L910,162L909,163L910,165L911,165L913,166L915,166L916,165L916,166L917,167L916,167L916,168L916,169L918,170L917,172L919,174L919,174L920,175L921,174L921,173L922,173L923,173L924,175L924,175L925,176L926,177L927,177L928,180L927,181L926,184L925,185L924,185L924,183L922,184L923,185L923,186L922,186L922,187L921,187L921,188L922,188L921,190L920,189L920,188L918,190L918,189L918,190L917,190L917,192L917,191L917,192L916,192L916,193L915,193L915,194L914,194L914,193L913,194L913,195L913,196L913,197L912,198L910,198L909,196L909,195L910,194L909,194L909,195L909,194L908,194L907,196L908,196L907,197L909,198L909,199L908,201L908,201L908,201L909,202L909,203L908,204L907,202L907,201L906,201L906,200L906,199L905,198L904,198L904,198L903,196L903,195L903,194L902,196L901,196L901,196L900,197L902,198L902,199L901,199L901,201L901,202L901,204L902,204L901,205L902,205L902,206L901,207L900,208L899,208L900,209L899,210L899,208L898,209L898,208L897,208L897,209L896,210L896,211L896,210L896,211L895,212L894,212L894,213L893,212L893,214L892,215L891,214L890,214L890,215L890,216L889,216L889,217L887,217L887,218L888,220L887,220L887,220L885,221L885,222L886,223L885,224L886,225L885,225L884,226L884,226L884,228L884,228L884,230L884,230L883,232L883,232L882,236L882,237L883,238L884,240L885,241L886,240L887,240L886,242L885,243L883,244L884,245L883,246L883,246L883,247L883,246L882,247L883,248L882,248L883,250L884,250L884,249L884,249L885,250L887,250L888,250L888,251L889,252L890,253L889,255L891,255L892,255L893,257L893,258L893,258L895,259L897,258L897,259L898,258L899,257L901,256L901,256L900,254L900,253L899,254L899,252L898,251L897,251L897,252L896,251L896,251L898,251L899,251L901,253L902,255L903,258L903,260L902,261L902,259L902,259L900,259L898,260L897,261L896,261L895,262L895,263L893,264L891,266L891,267L889,268L889,267L891,266L892,264L892,263L892,261L892,260L890,260L891,261L890,261L890,262L889,262L890,263L888,263L888,266L887,267L885,267L885,268L884,266L883,265L883,265L884,268L883,268L882,269L882,268L883,265L883,263L883,263L883,264L882,265L882,264L882,263L880,262L881,264L879,264L880,265L880,266L880,267L881,267L881,269L880,271L880,271L878,272L877,273L875,274L875,274L873,274L872,274L871,275L871,275L870,275L870,276L867,277L866,277L864,278L864,278L863,278L862,279L861,278L859,279L859,278L858,279L858,281L857,281L856,282L855,282L854,284L854,283L852,284L853,285L852,285L851,286L850,287L849,287L848,288L848,289L847,290L847,291L847,291L847,292L848,290L849,291L849,290L850,289L851,289L851,288L853,288L853,287L853,288L856,288L857,287L857,286L858,286L862,285L865,284L867,282L868,279L870,279L869,280L870,280L870,281L871,281L872,281L873,282L875,280L875,279L876,279L876,279L873,282L869,285L862,290L860,292L857,294L856,294L855,294L852,296L849,297L846,298L846,298L845,298L845,297L844,297L844,296L844,296L844,296L844,297L844,298L842,300L841,300L842,301L843,301L844,301L845,301L846,301L846,300L847,302L847,304L847,308L847,312L848,315L846,320L845,323L845,325L843,327L842,329L841,331L840,334L839,336L838,336L838,336L838,334L838,333L838,331L837,331L835,331L835,331L834,331L834,332L833,331L833,330L831,330L830,329L829,329L828,328L827,327L826,327L826,324L825,324L825,324L825,322L825,322L824,324L825,325L825,326L825,327L826,328L827,329L828,330L829,331L829,332L829,333L830,335L832,336L832,338L835,340L836,340L836,340L837,342L839,347L839,350L838,350L838,354L837,357L837,358L836,360L835,361L834,363L833,364L833,366L834,368L833,370L833,370L832,374L832,374L832,375L832,377L831,378L830,379L830,379L829,378L828,377L828,376L828,375L828,373L828,372L828,368L829,364L829,364L830,363L831,361L830,361L831,360L830,359L829,360L828,361L827,361L827,360L827,359L828,358L827,358L827,357L827,356L826,357L825,357L825,356L827,355L826,354L826,355L825,354L826,352L825,352L825,353L825,354L824,355L824,353L824,353L824,352L823,352L823,354L823,354L823,355L823,355L822,355L821,355L820,354L819,354L819,353L817,351L818,350L817,349L818,347L819,348L819,347L820,348L821,348L822,348L821,347L820,347L819,346L818,345L817,346L817,345L817,347L816,346L816,345L817,343L818,343L818,343L818,341L817,341L816,342L815,342L816,343L815,343L815,341L815,339L816,340L817,340L818,339L817,338L818,337L817,337L817,339L816,339L816,338L815,336L816,334L816,333L816,332L817,331L819,331L818,330L819,329L818,329L818,327L817,327L816,328L818,329L817,330L815,332L815,331L815,330L814,332L815,332L815,333L814,331L813,331L814,333L813,333L813,334L814,334L812,336L810,335L811,337L813,337L813,338L813,339L814,340L813,341L813,341L813,342L813,343L813,344L812,345L813,346L813,347L814,349L814,350L815,351L816,353L817,354L817,354L816,355L817,355L818,355L817,356L818,357L819,358L819,359L820,360L818,359L818,359L817,358L817,358L817,359L816,359L814,357L813,357L811,358L810,355L809,356L810,357L809,357L808,356L807,356L806,354L804,356L803,356L802,354L802,352L804,350L803,351L802,351L802,352L801,354L801,355L802,356L803,357L804,357L805,356L806,356L806,355L807,355L807,357L808,358L808,359L811,359L814,359L815,360L816,360L816,361L817,361L818,362L820,362L822,363L822,364L821,365L821,367L821,367L821,368L822,369L821,370L819,369L818,369L816,367L814,366L812,364L812,364L811,363L810,363L810,364L812,365L814,367L815,367L816,368L817,369L818,370L820,370L820,370L822,370L821,371L821,372L822,371L823,372L824,374L824,376L822,375L821,374L821,375L822,377L823,377L820,378L821,378L822,378L822,379L823,379L824,380L825,380L825,382L824,382L823,383L822,382L820,382L819,381L819,380L818,379L816,379L816,380L815,379L814,379L813,380L814,380L815,380L816,381L817,381L817,379L818,382L818,383L820,383L822,384L822,385L824,385L824,384L825,385L824,383L825,383L826,383L828,384L829,383L830,383L831,385L834,390L834,391L836,396L838,398L840,401L843,405L843,405L841,403L840,402L839,402L838,399L836,396L835,396L835,395L835,393L834,392L832,392L832,391L831,392L832,393L833,394L834,393L834,395L836,398L837,400L837,400L836,399L836,399L834,397L834,397L834,398L835,399L833,399L831,397L830,397L831,398L832,399L832,400L832,400L831,401L829,400L830,401L826,400L827,401L829,402L828,402L827,402L826,404L825,404L824,405L824,404L823,404L821,402L821,401L822,399L821,399L821,401L821,402L822,404L823,405L822,406L823,406L825,406L828,404L828,405L831,403L833,403L834,404L834,404L834,406L834,407L835,410L835,410L835,408L835,405L836,404L835,403L836,403L838,403L839,404L840,405L840,406L840,408L840,409L841,410L840,411L838,411L837,412L837,415L836,415L836,416L835,418L833,417L831,418L829,418L828,417L826,415L828,415L828,414L827,415L826,415L826,415L826,416L827,418L825,417L824,418L823,417L820,417L819,417L819,417L820,418L822,418L826,419L829,419L830,420L829,422L829,424L828,425L825,428L822,426L822,427L824,428L826,428L828,427L830,425L830,424L831,424L831,426L832,426L833,426L832,425L834,425L834,426L833,428L832,428L832,429L832,430L831,431L831,433L830,433L830,431L829,431L829,432L828,433L831,433L832,431L834,428L835,426L837,423L838,423L836,425L835,427L834,428L832,432L831,435L831,434L828,433L826,433L822,435L820,437L818,439L816,440L814,442L813,444L812,446L811,448L810,451L810,454L810,455L809,455L809,455L806,455L802,456L800,457L799,458L797,459L795,461L793,463L792,466L791,467L791,469L791,472L791,473L790,475L789,476L788,478L787,478L786,479L785,478L784,479L784,480L785,481L783,482L783,484L781,485L780,484L779,485L780,485L780,487L779,488L778,489L776,489L775,491L775,490L773,492L772,492L772,493L771,492L770,492L770,493L772,495L771,496L769,498L768,498L768,497L767,497L766,498L767,498L768,499L767,500L766,502L765,502L764,503L765,504L765,504L765,505L764,506L764,505L764,506L764,506L763,508L762,507L762,509L763,509L762,510L761,511L760,511L761,512L761,512L762,513L761,514L759,515L760,515L761,515L761,515L760,518L760,520L760,521L760,522L759,523L759,524L758,524L759,526L758,527L757,528L758,528L759,528L759,529L758,532ZM792,656L793,655L793,655L792,656ZM790,657L791,657L791,657ZM785,660L788,658L789,659L786,661ZM772,665L773,663L776,661L776,661L778,659L781,660L782,661L783,661L780,663L780,662L778,663L777,663L774,665L772,666ZM768,666L771,666L770,667L768,667ZM765,666L765,666L766,666L766,667ZM756,622L757,622L759,625L760,626L761,626L762,626L760,627L758,626L756,622ZM750,667L751,667L751,667L750,668ZM702,561L704,560L704,561L703,562ZM911,199L912,198L912,199ZM909,200L909,198L911,200L911,201ZM908,196L908,195L909,197ZM904,200L905,200L905,200ZM905,208L905,207L906,209ZM903,203L903,202L904,201L905,202L905,202L906,203L906,204L905,204L904,204L904,203ZM902,200L902,199L902,197L902,197L903,197L903,198L903,200L902,201ZM900,267L900,268L902,267L903,266L903,265L905,267L904,268L902,268L900,268ZM891,269L892,268L892,267L894,265L894,265L895,266L896,267L896,266L897,267L894,268L893,268L892,270ZM839,403L840,403L841,404L842,405L841,405L841,404ZM838,423L838,421L839,421L842,419L843,418L844,418L845,416L845,415L845,410L845,409L843,406L845,408L845,409L846,412L846,417L844,418L842,420ZM89,446L90,446L91,448L92,449L93,450L93,451L92,450L90,450L90,449L90,448L89,447ZM86,456L87,456L88,458L90,461L88,461L87,460L87,458ZM81,444L81,444L81,444ZM77,431L78,431L78,432L77,432ZM71,446L72,446L73,448L72,448L71,447ZM69,428L71,429L72,429L73,430L74,430L74,430L76,430L75,431L73,431L72,431L69,430L70,429ZM63,428L66,428L67,428L66,429L68,429L67,430L65,431L64,430ZM60,426L61,426L62,427L61,427ZM825,361L824,360L825,359L825,360L825,361L825,362ZM823,358L823,356L823,356L824,356L825,358L824,358L824,358ZM815,345L815,345L815,345ZM661,214L661,214L662,215L665,215L665,217L663,216L662,215ZM650,217L650,216L650,217ZM648,216L649,217L649,217L648,217ZM647,221L647,220L647,218L648,218L648,219L649,221L648,222ZM645,218L646,218L646,219ZM643,225L644,225L644,226ZM641,232L641,231L642,232L642,234L641,233ZM640,235L641,234L641,235ZM631,223L632,224L631,224L630,223ZM589,177L590,176L594,173L595,173L597,171L598,170L599,170L600,170L598,172L598,173L597,174L594,175L592,176L592,177L593,177L590,178L590,178ZM630,559L632,559L631,560ZM625,559L626,559L628,559L627,559ZM621,560L622,560L621,560ZM617,560L619,560L618,560ZM872,276L873,275L874,275L873,276ZM872,280L873,279L873,280ZM870,278L871,277L870,278ZM793,236L793,235L793,236ZM791,236L792,235L792,235ZM702,302L703,301L703,302ZM700,301L700,299L701,300L701,301ZM826,363L826,363L826,363ZM104,138L105,136L106,135L106,136L105,137L106,138L105,138L104,138ZM109,113L109,112L110,113L109,113ZM109,109L110,108L110,111L110,110ZM108,112L109,111L109,112L108,113ZM106,119L107,117L108,117L108,116L109,116L109,117L110,118L110,118L109,119L108,118L106,119L108,119L108,120L108,122L108,122L108,124L108,124L108,122L109,123L109,124L110,124L110,126L109,127L109,127L108,125L107,125L107,125L107,123L107,122L107,121L106,121L106,120ZM106,106L107,107L108,108L107,107ZM104,108L105,108L105,108ZM106,102L107,102L107,102L106,102ZM102,109L102,109L103,109L104,111L105,111L104,110L107,108L107,108L109,110L107,111L108,112L107,113L107,113L106,114L105,114L105,113L103,113L102,111L102,110ZM102,107L103,108L103,109L102,108ZM627,229L627,227L629,227L628,230ZM621,233L622,232L622,233ZM572,197L572,196L573,196L573,197ZM571,200L572,199L572,200ZM569,199L569,199L571,198L571,198L571,199L570,199ZM568,201L568,200L569,200L569,200ZM568,198L569,199L568,199L568,199ZM567,197L569,196L570,197L570,197L571,197L570,198L569,198ZM567,202L568,202L570,200L571,201L569,201L569,202L568,202L567,203ZM564,198L565,198L565,198ZM623,563L624,565L624,566L624,568L624,570L624,570L624,568L624,565ZM614,564L617,562L616,563L617,564L617,565L616,564L614,564ZM610,576L611,575L610,576ZM596,586L597,585L598,586L597,587ZM593,586L595,587L594,587ZM589,587L591,587L591,587L589,588ZM565,577L566,576L568,576L570,577L571,577L570,578L570,579L569,579L565,577ZM881,264L881,264L881,264ZM881,269L881,267L881,267L882,268ZM880,276L880,274L881,276Z"},"xy":{"boston":[881.5,248.5],"new-york":[844.4,294.9],"chicago":[623.6,304.7],"pittsburgh":[749.8,320.1],"philadelphia":[829.5,315.4],"cincinnati":[680.5,359.8],"cleveland":[719.1,301.6],"washington":[803.9,344],"st-louis":[586.9,378.6],"ottawa":[795.8,200.9],"montreal":[826.9,192],"toronto":[747.6,249.5],"detroit":[695,286.8],"baltimore":[809.3,334.5],"minneapolis":[531.6,242.7],"brooklyn":[846,296.4],"rochester":[776.8,254.9],"syracuse":[799.8,252.7],"milwaukee":[617,280],"los-angeles":[97.9,435.5],"kansas-city":[513.5,371.1],"bay-area":[50.7,339.3],"dallas":[475.5,509.2],"portland":[90.8,175.2],"seattle":[108.2,133.3],"edmonton":[257.6,39.2],"calgary":[240,89.3],"houston":[501.7,574.7],"new-jersey":[840,293.9],"denver":[342,350.3],"atlanta":[696.7,475.5],"south-florida":[799.6,635.1],"san-antonio":[443,581.5],"phoenix":[203.2,470.3],"tampa-bay":[748.8,595.4],"carolina":[754.4,434.7],"indianapolis":[651.7,348.3],"new-orleans":[600.9,567.2],"las-vegas":[161,402.1],"oklahoma-city":[463.4,450.4],"buffalo":[758.3,264.4],"columbus":[702.9,337.9],"nashville":[649.2,427.8],"vancouver":[107.1,95.7],"winnipeg":[473.8,137.4],"memphis":[594.2,454.3],"orlando":[767.3,579.8],"sacramento":[68.1,325.7],"salt-lake-city":[232.9,313.5],"san-diego":[110.2,468.1],"jacksonville":[756.2,542.3]}};
const PENDING = 'Milwaukee beat Tampa Bay 4\u20131 in Game 5 on Oct 28 and won the series 4\u20131. It is the Brewers\u2019 first championship and is counted in the data.';

class Component extends DCLogic {
  state = {
    userTheme: null,
    sys: 'light',
    sports: { MLB: true, NHL: true, NBA: true, NFL: true },
    era: 'all',
    metric: 'titles',
    showAll: false,
    cmp: ['boston', 'new-york', 'chicago', 'los-angeles'],
    raceYear: NOW,
    playing: false,
    mapView: 'all',
    mapLabels: true,
    banner: true,
    cmpNote: '',
    aboutOpen: false,
    waitTab: 'all'
  };

  stopTimer() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }

  componentDidMount() {
    try {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      this.setState({ sys: mq.matches ? 'dark' : 'light' });
    } catch (e) { /* keep light */ }
  }

  componentWillUnmount() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }

  prep() {
    if (this._P) return this._P;
    const metros = D.metros.map((m, i) => ({ i, id: m[0], name: m[1], region: m[2], country: m[3], pop: m[5], noPc: !!m[6], stat: m[7] }));
    const byId = {};
    metros.forEach(m => { byId[m.id] = m; });
    const fr = D.fr.map((f, i) => ({ i, lg: f[0], name: f[1], metro: f[2], since: f[3], defunct: !!f[4], years: [] }));
    const titles = [];
    Object.keys(D.titles).forEach(k => {
      D.titles[k].forEach(t => { titles.push({ y: +k, li: t[0], lg: LG[t[0]], mi: t[1], team: t[2], label: t[3], fi: t[4] }); });
    });
    titles.sort((a, b) => (a.y - b.y) || (a.li - b.li));
    titles.forEach(t => { fr[t.fi].years.push(t.y); });
    this._P = { metros, byId, fr, titles };
    return this._P;
  }

  sw(fi) {
    const c = D.col[fi];
    if (!c) return { has: false, sw: [] };
    return { has: true, sw: c.filter(x => x).slice(0, 2).map(x => ({ c: x })) };
  }

  tally(P, list) {
    const out = P.metros.map(() => ({ c: [0, 0, 0, 0], total: 0, first: null, last: null }));
    list.forEach(t => {
      const a = out[t.mi];
      a.c[t.li] += 1;
      a.total += 1;
      if (a.first === null || t.y < a.first) a.first = t.y;
      if (a.last === null || t.y > a.last) a.last = t.y;
    });
    return out;
  }

  renderVals() {
    const P = this.prep();
    const S = this.state;
    const self = this;
    const propTheme = (this.props.theme && this.props.theme !== 'auto') ? this.props.theme : null;
    const theme = S.userTheme || propTheme || S.sys || 'light';
    const on = S.sports;
    const era = ERAS.find(e => e.id === S.era) || ERAS[0];
    const metric = S.metric;
    const sportOn = LG.filter(c => on[c]);

    // ---- filtered views of the data
    const L1 = P.titles.filter(t => on[t.lg]);
    const L2 = L1.filter(t => t.y >= era.from);
    const tallyAll = this.tally(P, P.titles);
    const tallyAny = this.tally(P, L1);
    const tallyEra = this.tally(P, L2);

    // ---- hero
    const titlesByLg = {};
    LG.forEach(c => { titlesByLg[c] = P.titles.filter(t => t.lg === c).length; });
    const withTitle = P.metros.filter(m => tallyAll[m.i].total > 0);
    const slams = P.metros.filter(m => m.stat === 'WWWW');
    const addedList = P.titles.filter(t => t.y >= 2022 && !(t.y === 2022 && t.lg === 'NFL'));

    // ---- rankings
    let tt = 0, pp = 0;
    P.metros.forEach(m => { if (m.pop && !m.noPc) { tt += tallyEra[m.i].total; pp += m.pop / 1e6; } });
    const rate = (pp > 0 && tt > 0) ? tt / pp : 0;
    const noPcNames = [];
    let list = [];
    P.metros.forEach(m => {
      const a = tallyEra[m.i];
      if (a.total <= 0) return;
      const pm = (m.pop && !m.noPc) ? a.total / (m.pop / 1e6) : null;
      const ix = (pm !== null && rate > 0) ? pm / rate : null;
      const val = metric === 'titles' ? a.total : (metric === 'perm' ? pm : ix);
      if (val === null) { noPcNames.push(m.name); return; }
      list.push({ m, a, pm, ix, val });
    });
    list.sort((x, y) => (y.val - x.val) || (y.a.total - x.a.total) || x.m.name.localeCompare(y.m.name));
    const maxVal = list.length ? list[0].val : 1;
    const shown = S.showAll ? list : list.slice(0, 12);
    const cmpFull = S.cmp.length >= CMP_MAX;
    const toggleCompare = (id) => () => {
      this.setState(s => {
        const c = s.cmp.slice();
        const k = c.indexOf(id);
        if (k >= 0) c.splice(k, 1); else if (c.length < CMP_MAX) c.push(id);
        return { cmp: c };
      });
    };
    // move one compared metro into another's slot; the order drives the cards, table and charts
    const reorderTo = (fromId, toId) => {
      this.setState(s => {
        const c = s.cmp.slice();
        const from = c.indexOf(fromId), to = c.indexOf(toId);
        if (from < 0 || to < 0 || from === to) return null;
        c.splice(from, 1);
        c.splice(to, 0, fromId);
        return { cmp: c, cmpNote: P.byId[fromId].name + ' moved to position ' + (to + 1) + ' of ' + c.length + '.' };
      });
    };
    const rows = shown.map((r, i) => {
      const m = r.m, a = r.a, any = tallyAny[m.i];
      const inC = S.cmp.indexOf(m.id) >= 0;
      const segs = [];
      a.c.forEach((n, li) => { if (n > 0) segs.push({ cls: 'sw-' + LG[li].toLowerCase(), n, tip: LG[li] + ' ' + n }); });
      const row = {
        rank: i + 1,
        name: m.name,
        region: m.region + (m.country === 'CA' ? ' · Canada' : ''),
        isTitles: metric === 'titles', isPerm: metric === 'perm', isIndex: metric === 'index',
        segs, fill: 0, left: 50, w: 0, bg: 'var(--brand)',
        value: '', unit: '',
        counts: LG.map((c, li) => ({ code: c, ...lgm(c), n: a.c[li] })),
        last: any.last ? (any.last + ' · ' + (NOW - any.last === 0 ? 'this year' : (NOW - any.last) + ' yrs ago')) : 'none',
        perm: r.pm !== null ? r.pm.toFixed(2) + ' per million' : 'per million: n/a',
        inCompare: inC,
        full: cmpFull && !inC,
        btnLabel: inC ? 'In compare' : (cmpFull ? 'Compare is full' : 'Add to compare'),
        toggle: toggleCompare(m.id),
        barLabel: ''
      };
      if (metric === 'titles') {
        row.fill = Math.max(2, (a.total / maxVal) * 100);
        row.value = String(a.total); row.unit = 'titles';
        row.barLabel = m.name + ': ' + a.total + ' titles';
      } else if (metric === 'perm') {
        row.fill = Math.max(2, (r.pm / maxVal) * 100);
        row.value = r.pm.toFixed(1); row.unit = 'per million';
        row.barLabel = m.name + ': ' + r.pm.toFixed(2) + ' titles per million residents';
      } else {
        const lv = Math.max(-3, Math.min(3, Math.log2(r.ix)));
        const wv = Math.abs(lv) / 3 * 50;
        row.w = Math.max(1, wv);
        row.left = lv >= 0 ? 50 : 50 - wv;
        row.bg = lv >= 0 ? 'var(--brand)' : 'var(--accent)';
        row.value = r.ix.toFixed(1) + '×'; row.unit = r.ix >= 1 ? 'above even share' : 'below even share';
        row.barLabel = m.name + ': ' + r.ix.toFixed(1) + ' times an even share by population';
      }
      return row;
    });
    const sportsText = sportOn.length === 4 ? 'all four leagues' : sportOn.join(', ');
    const cmpNames = S.cmp.map(id => P.byId[id].name);
    const board = {
      rows,
      empty: list.length === 0,
      caption: list.length + ' metros with at least one title in ' + sportsText + ', ' + era.sub + '.',
      cmpLine: cmpNames.length ? 'Comparing ' + cmpNames.join(', ') + '.' : 'Nothing selected to compare yet.',
      toggleAll: () => this.setState(s => ({ showAll: !s.showAll })),
      toggleLabel: S.showAll ? 'Show the top 12' : 'Show all ' + list.length + ' metros',
      hasMissing: metric !== 'titles' && noPcNames.length > 0,
      missingNote: 'Not shown: ' + noPcNames.join(' and ') + '. Your workbook’s population figure for these covers a city or borough, not the metro, so it cannot be compared.'
    };

    // ---- filters
    const filters = {
      sports: LG.map(c => ({
        code: c, ...lgm(c), on: !!on[c],
        toggle: () => this.setState(s => {
          const nx = { ...s.sports, [c]: !s.sports[c] };
          if (!LG.some(k => nx[k])) return null;
          return { sports: nx };
        })
      })),
      // picking an era restarts the title race at the end of that era
      eras: ERAS.map(e => ({ label: e.label + ' (' + e.sub.replace(' to ', '–') + ')', on: e.id === S.era, pick: () => { this.stopTimer(); this.setState({ era: e.id, playing: false, raceYear: NOW }); } })),
      metrics: METRICS.map(mt => ({ label: mt.label, on: mt.id === metric, pick: () => this.setState({ metric: mt.id }) })),
      isDefault: sportOn.length === LG.length && S.era === 'all' && metric === 'titles',
      reset: () => {
        this.stopTimer();
        this.setState({ sports: { MLB: true, NHL: true, NBA: true, NFL: true }, era: 'all', metric: 'titles', playing: false, raceYear: NOW });
      },
      summary: 'Showing ' + sportsText + ' for ' + era.sub + '.',
      metricHint: (METRICS.find(x => x.id === metric) || METRICS[0]).hint
    };

    // ---- compare
    const cards = S.cmp.map(id => {
      const m = P.byId[id];
      const a = tallyEra[m.i], any = tallyAny[m.i];
      const maxC = Math.max(1, ...a.c);
      const pm = (m.pop && !m.noPc && a.total > 0) ? a.total / (m.pop / 1e6) : null;
      const decs = DECADES.map(d => L2.filter(t => t.mi === m.i && t.y >= d && t.y < d + 10).length);
      const bestN = Math.max(0, ...decs);
      const best = bestN > 0 ? (DECADES[decs.indexOf(bestN)] + 's (' + bestN + ')') : 'none';
      const st = m.stat.split('');
      return {
        id, m, a, any, pm, best,
        name: m.name,
        region: m.region + (m.country === 'CA' ? ' · Canada' : ''),
        pop: m.noPc ? 'city figure only' : (m.pop ? (m.pop / 1e6).toFixed(1) + ' million residents (2020)' : '[2020 POPULATION]'),
        total: a.total,
        bars: LG.map((c, li) => ({ code: c, cls: 'sw-' + c.toLowerCase(), ...lgm(c), n: a.c[li], pct: a.c[li] / maxC * 100 })),
        facts: [
          { k: 'First title', v: any.first ? String(any.first) : 'none' },
          { k: 'Most recent title', v: any.last ? String(any.last) : 'none' },
          { k: 'Years since', v: any.last ? (NOW - any.last === 0 ? 'this year' : String(NOW - any.last)) : 'n/a' },
          { k: 'Per million residents', v: pm !== null ? pm.toFixed(2) : 'n/a' },
          { k: 'Best decade', v: best }
        ],
        status: st.map((ch, li) => ({ code: LG[li], word: STAT[ch].word, cls: STAT[ch].cls, d: ICON[STAT[ch].icon] })),
        teams: P.fr.filter(f => !f.defunct && f.metro === m.id).sort((x, y) => (LG.indexOf(x.lg) - LG.indexOf(y.lg)) || x.name.localeCompare(y.name))
          .map(f => ({ ...self.sw(f.i), ...lgm(f.lg), text: f.name + ' (' + (f.years.length > 0 ? f.years.length + ' ' + (f.years.length === 1 ? 'title' : 'titles') : 'no title') + ')' }))
      };
    });
    const H = [
      { label: 'Titles (filtered)', get: c => c.a.total, dir: 1 },
      { label: 'MLB titles', get: c => c.a.c[0], dir: 1 },
      { label: 'NHL titles', get: c => c.a.c[1], dir: 1 },
      { label: 'NBA titles', get: c => c.a.c[2], dir: 1 },
      { label: 'NFL titles', get: c => c.a.c[3], dir: 1 },
      { label: 'Titles per million residents', get: c => c.pm, dir: 1, fmt: v => v.toFixed(2) },
      { label: 'Most recent title', get: c => c.any.last, dir: 1 },
      { label: 'Years since last title', get: c => (c.any.last ? NOW - c.any.last : null), dir: -1 }
    ];
    const h2hRows = H.map(h => {
      const vals = cards.map(c => h.get(c));
      const nn = vals.filter(v => v !== null && v !== undefined);
      let best = null;
      if (nn.length > 1) {
        best = h.dir === 1 ? Math.max(...nn) : Math.min(...nn);
        if (nn.every(v => v === best)) best = null;
      }
      return {
        label: h.label,
        cells: vals.map(v => {
          const has = v !== null && v !== undefined;
          const lead = has && best !== null && v === best;
          return { text: has ? (h.fmt ? h.fmt(v) : String(v)) : 'n/a', leads: lead, w: lead ? 600 : 400 };
        })
      };
    });
    const addOptions = P.metros.filter(m => S.cmp.indexOf(m.id) < 0).map(m => ({ id: m.id, name: m.name })).sort((a, b) => a.name.localeCompare(b.name));
    const cmp = {
      chips: cards.map((c, ci) => ({
        name: c.name, removeLabel: 'Remove ' + c.name,
        remove: toggleCompare(c.id),
        gripLabel: 'Reorder ' + c.name + ', position ' + (ci + 1) + ' of ' + cards.length + '. Press the left or right arrow key to move it.',
        // drag a pill onto another to take that pill's place
        dragStart: (e) => {
          self._drag = c.id;
          try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', c.id); } catch (err) { /* keep going */ }
        },
        dragOver: (e) => {
          if (!self._drag || self._drag === c.id) return;
          e.preventDefault();
          try { e.dataTransfer.dropEffect = 'move'; } catch (err) { /* keep going */ }
          e.currentTarget.setAttribute('data-over', 'true');
        },
        dragLeave: (e) => {
          const t = e.currentTarget;
          if (!e.relatedTarget || !t.contains(e.relatedTarget)) t.removeAttribute('data-over');
        },
        drop: (e) => {
          e.preventDefault();
          e.currentTarget.removeAttribute('data-over');
          const from = self._drag;
          self._drag = null;
          if (from && from !== c.id) reorderTo(from, c.id);
        },
        dragEnd: (e) => {
          self._drag = null;
          try { e.currentTarget.closest('.coc').querySelectorAll('[data-over]').forEach(n => n.removeAttribute('data-over')); } catch (err) { /* keep going */ }
        },
        // keyboard: arrow keys on the grip move the pill and keep focus on it
        key: (e) => {
          const k = e && e.key;
          const dir = (k === 'ArrowLeft' || k === 'ArrowUp') ? -1 : ((k === 'ArrowRight' || k === 'ArrowDown') ? 1 : 0);
          if (!dir) return;
          e.preventDefault();
          const to = ci + dir;
          if (to < 0 || to >= cards.length) return;
          const root = e.currentTarget.closest('.coc');
          reorderTo(c.id, cards[to].id);
          setTimeout(() => {
            try { const g = root.querySelectorAll('[data-grip]'); if (g[to]) g[to].focus(); } catch (err) { /* keep going */ }
          }, 40);
        }
      })),
      orderHint: cards.length > 1 ? 'Drag a pill to reorder the cities, or focus its grip and use the arrow keys. The cards, table and charts below follow this order.' : '',
      note: S.cmpNote,
      empty: cards.length === 0,
      cards,
      options: addOptions,
      addValue: '',
      addPlaceholder: cmpFull ? 'Compare is full (' + CMP_MAX + ')' : 'Add a metro',
      onAdd: (e) => {
        const v = e && e.target ? e.target.value : '';
        if (!v) return;
        this.setState(s => (s.cmp.indexOf(v) >= 0 || s.cmp.length >= CMP_MAX) ? null : { cmp: s.cmp.concat([v]) });
      },
      h2h: {
        minW: Math.max(560, 170 + 120 * Math.max(1, cards.length)),
        cols: 'minmax(170px,1.3fr) repeat(' + Math.max(1, cards.length) + ',minmax(120px,1fr))',
        heads: cards.map(c => ({ name: c.name })),
        rows: h2hRows
      }
    };


    // ---- density map
    const NEIDS = ['boston', 'montreal', 'chicago', 'milwaukee', 'st-louis', 'cincinnati', 'washington', 'toronto', 'pittsburgh', 'baltimore'];
    const ne = NEIDS.map(id => MAP.xy[id]);
    let zx0 = Math.min(...ne.map(p => p[0])) - 50, zx1 = Math.max(...ne.map(p => p[0])) + 90;
    let zy0 = Math.min(...ne.map(p => p[1])) - 50, zy1 = Math.max(...ne.map(p => p[1])) + 50;
    if ((zx1 - zx0) / (zy1 - zy0) < 1.15) { const need = (zy1 - zy0) * 1.15 - (zx1 - zx0); zx0 -= need / 2; zx1 += need / 2; }
    const zoom = S.mapView === 'ne';
    const RECT = zoom ? { x: zx0, y: zy0, w: zx1 - zx0, h: zy1 - zy0 } : { x: 0, y: 0, w: 1000, h: 700 };
    const ranked = list.map((r, i) => ({ r, i }));
    const labelN = zoom ? 14 : 9;
    const blobs = [], pins = [];
    ranked.slice().reverse().forEach(({ r, i }) => {
      const pt = MAP.xy[r.m.id];
      if (!pt) return;
      const lx = (pt[0] - RECT.x) / RECT.w * 100, ty = (pt[1] - RECT.y) / RECT.h * 100;
      if (lx < -2 || lx > 102 || ty < -2 || ty > 102) return;
      const norm = maxVal > 0 ? Math.sqrt(Math.max(0, r.val) / maxVal) : 0;
      const d = (zoom ? 9 : 5) + (zoom ? 16 : 14) * norm;
      const hot = (metric === 'index' && r.val < 1) ? 'var(--accent)' : 'var(--brand)';
      blobs.push({ style: 'position:absolute;left:' + lx.toFixed(2) + '%;top:' + ty.toFixed(2) + '%;width:' + d.toFixed(2) + '%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;background:radial-gradient(circle,color-mix(in srgb,' + hot + ' ' + Math.round(38 + 22 * norm) + '%,transparent) 0%,color-mix(in srgb,' + hot + ' 14%,transparent) 55%,transparent 72%)' });
    });
    ranked.forEach(({ r, i }) => {
      const pt = MAP.xy[r.m.id];
      if (!pt) return;
      const lx = (pt[0] - RECT.x) / RECT.w * 100, ty = (pt[1] - RECT.y) / RECT.h * 100;
      if (lx < -2 || lx > 102 || ty < -2 || ty > 102) return;
      const inC = S.cmp.indexOf(r.m.id) >= 0;
      const valText = metric === 'titles' ? r.a.total + ' titles' : (metric === 'perm' ? r.pm.toFixed(2) + ' titles per million' : r.ix.toFixed(1) + '\u00d7 an even share');
      pins.push({
        style: 'left:' + lx.toFixed(2) + '%;top:' + ty.toFixed(2) + '%',
        sel: inC, name: r.m.name.split(' / ')[0],
        hasLabel: S.mapLabels && i < labelN,
        aria: r.m.name + ': ' + valText + (inC ? '. In compare.' : '. Select to add to compare.'),
        tip: r.m.name + ': ' + valText + (metric === 'titles' ? '' : ' (' + r.a.total + ' titles)'),
        toggle: (!inC && cmpFull) ? (() => {}) : toggleCompare(r.m.id)
      });
    });
    const CORR = ['boston', 'new-york', 'brooklyn', 'new-jersey', 'philadelphia', 'baltimore', 'washington'];
    const corrTitles = CORR.reduce((n, id) => n + tallyEra[P.byId[id].i].total, 0);
    const allTitles = tallyEra.reduce((n, a) => n + a.total, 0);
    const mapObj = {
      viewBox: RECT.x.toFixed(1) + ' ' + RECT.y.toFixed(1) + ' ' + RECT.w.toFixed(1) + ' ' + RECT.h.toFixed(1),
      aspect: (RECT.w / RECT.h).toFixed(3),
      width: 'min(100%, calc(80vh * ' + (RECT.w / RECT.h).toFixed(3) + '))',
      paths: MAP.paths, blobs, pins,
      metricWord: metric === 'titles' ? 'titles' : (metric === 'perm' ? 'titles per million residents' : 'titles compared with an even share by population'),
      views: [{ label: 'North America', on: !zoom, pick: () => this.setState({ mapView: 'all' }) }, { label: 'Northeast and Great Lakes', on: zoom, pick: () => this.setState({ mapView: 'ne' }) }],
      labelsOn: !!S.mapLabels,
      toggleLabels: () => this.setState(s => ({ mapLabels: !s.mapLabels })),
      legendText: metric === 'index' ? 'Teal glows are above an even share, gold glows below. ' + sportsText + ', ' + era.sub + '.' : sportsText.charAt(0).toUpperCase() + sportsText.slice(1) + ', ' + era.sub + '. Glow size and strength follow the ranking above.',
      alt: 'Map of the United States and southern Canada with a glow over each metro sized by ' + (metric === 'titles' ? 'titles won' : (metric === 'perm' ? 'titles per million residents' : 'share against population')) + '. The strongest clusters are in the Northeast, Chicago and Los Angeles. The rankings above list the same figures.',
      stat: allTitles > 0 ? 'The seven metros from Boston to Washington, D.C. (including Brooklyn and New Jersey) hold ' + corrTitles + ' of the ' + allTitles + ' titles under these filters, ' + Math.round(corrTitles / allTitles * 100) + '%.' : 'No titles under these filters.'
    };

    // ---- time: decades and year by year
    const decCounts = cards.map(c => DECADES.map((d, di) => c.a.c.map((_, li) => L2.filter(t => t.mi === c.m.i && t.li === li && t.y >= d && t.y < d + 10).length)));
    let maxDec = 1;
    decCounts.forEach(dc => dc.forEach(arr => { const s = arr.reduce((x, y) => x + y, 0); if (s > maxDec) maxDec = s; }));
    const unit = Math.max(8, Math.min(26, Math.floor(130 / maxDec)));
    const chartH = Math.max(60, maxDec * unit + (maxDec - 1) * 2 + 4);
    const decades = cards.map((c, ci) => ({
      name: c.name,
      sum: c.a.total + ' titles',
      cols: DECADES.map((d, di) => {
        const arr = decCounts[ci][di];
        const segs = [];
        arr.forEach((n, li) => { for (let k = 0; k < n; k++) segs.push({ cls: 'sw-' + LG[li].toLowerCase(), h: unit }); });
        const tip = d + 's: ' + LG.map((code, li) => code + ' ' + arr[li]).join(', ');
        return { segs, tip };
      })
    }));
    const years = []; for (let y = 1903; y <= NOW; y++) years.push(y);
    const codes = cards.map(c => ({
      name: c.name,
      lanes: LG.map((code, li) => ({
        code, ...lgm(code),
        op: on[code] ? 1 : 0.35,
        cells: years.map(y => {
          const t = on[code] && y >= era.from ? P.titles.find(x => x.mi === c.m.i && x.li === li && x.y === y) : null;
          return t ? { cls: 'sw-' + code.toLowerCase(), tip: y + ': ' + t.team + ' (' + t.label + ')' } : { cls: 'cellempty', tip: String(y) };
        })
      }))
    }));
    const time = { decades, codes, chartH, labels: DECADES.map(d => String(d).slice(2) === '00' ? String(d) : "'" + String(d).slice(2) + 's').map((s, i) => DECADES[i] + 's') };

    // ---- race
    // the race follows both filters: it counts up from the first year of the chosen era, for the chosen leagues
    const Y = Math.min(NOW, Math.max(era.from, S.raceYear));
    const rt = this.tally(P, L2.filter(t => t.y <= Y));
    let raceMax = 1;
    P.metros.forEach(m => { if (tallyEra[m.i].total > raceMax) raceMax = tallyEra[m.i].total; });
    const raceList = P.metros.filter(m => rt[m.i].total > 0).sort((a, b) => (rt[b.i].total - rt[a.i].total) || a.name.localeCompare(b.name)).slice(0, 12);
    const topN = raceList.length ? rt[raceList[0].i].total : 0;
    const leaders = raceList.filter(m => rt[m.i].total === topN).map(m => m.name);
    const winnersNow = L1.filter(t => t.y === Y).map(t => ({ ...self.sw(t.fi), ...lgm(t.lg), text: t.team + ', ' + t.label + ' (' + t.lg + ')' }));
    const race = {
      year: Y,
      min: era.from,
      lead: 'Drag the year, or press play, to watch the running total build from ' + era.from + '. It follows the league and year filters above, so every metro starts at zero in the first year of the era and counts only ' + sportsText + '.',
      playLabel: S.playing ? 'Pause' : (Y >= NOW ? 'Play from ' + era.from : 'Play'),
      togglePlay: () => {
        if (this.timer) { clearInterval(this.timer); this.timer = null; this.setState({ playing: false }); return; }
        this.setState(s => {
          const f = (ERAS.find(x => x.id === s.era) || ERAS[0]).from;
          return { playing: true, raceYear: (s.raceYear >= NOW || s.raceYear < f) ? f : s.raceYear };
        });
        this.timer = setInterval(() => {
          this.setState(s => {
            if (s.raceYear >= NOW) { if (self.timer) { clearInterval(self.timer); self.timer = null; } return { playing: false }; }
            return { raceYear: s.raceYear + 1 };
          });
        }, 170);
      },
      onInput: (e) => {
        const v = parseInt(e && e.target ? e.target.value : '', 10);
        if (!isNaN(v)) this.setState({ raceYear: Math.max(era.from, Math.min(NOW, v)) });
      },
      leaderText: leaders.length ? ('Through ' + Y + ', ' + leaders.slice(0, 3).join(leaders.length === 2 ? ' and ' : ', ') + (leaders.length > 3 ? ' and others' : '') + (leaders.length > 1 ? ' lead with ' : ' leads with ') + topN + (topN === 1 ? ' title.' : ' titles.')) : 'No titles yet in the selected leagues.',
      winners: winnersNow,
      noWinners: winnersNow.length === 0,
      noWinnersText: (Y === 1904 || Y === 1994 || Y === 2005) ? 'No champion this year in some leagues (MLB 1904 and 1994, NHL 2005).' : 'No champion in the selected leagues this year.',      rows: raceList.map(m => {
        const a = rt[m.i];
        return {
          name: m.name, total: a.total, fill: Math.max(2, a.total / raceMax * 100),
          label: m.name + ': ' + a.total + ' titles through ' + Y,
          segs: a.c.map((n, li) => ({ cls: 'sw-' + LG[li].toLowerCase(), n })).filter(s => s.n > 0)
        };
      })
    };

    // ---- matrix
    const matrix = P.metros.slice().sort((a, b) => (tallyAll[b.i].total - tallyAll[a.i].total) || a.name.localeCompare(b.name)).map(m => {
      const a = tallyAll[m.i];
      return {
        name: m.name, region: m.region, total: a.total,
        cells: m.stat.split('').map((ch, li) => ({
          cls: STAT[ch].cls, d: ICON[STAT[ch].icon],
          text: ch === 'W' ? 'Won · ' + a.c[li] : STAT[ch].word
        }))
      };
    });

    // ---- waiting and droughts
    const wTab = S.waitTab;
    const waitAll = LG.map(code => {
      const cur = P.fr.filter(f => f.lg === code && !f.defunct);
      const none = cur.filter(f => f.years.length === 0).map(f => {
        const start = Math.max(f.since || ELIG[code], ELIG[code]);
        return { ...self.sw(f.i), name: f.name, metro: P.byId[f.metro].name, since: f.since, wait: NOW - start, pending: false };
      }).sort((a, b) => (b.wait - a.wait) || a.name.localeCompare(b.name));
      return {
        code, ...lgm(code), title: LGLONG[code] + ' (' + code + ')',
        count: none.length, total: cur.length,
        note: 'Counted from ' + ELIG[code] + ' or the first season, whichever is later.',
        rows: none
      };
    });
    const droughtAll = P.fr.filter(f => !f.defunct && f.years.length > 0).map(f => {
      const last = Math.max(...f.years);
      return { name: f.name, lg: f.lg, metro: P.byId[f.metro].name, last, yrs: NOW - last };
    }).sort((a, b) => (b.yrs - a.yrs) || a.name.localeCompare(b.name));
    const waiting = {
      tabs: [{ label: 'All', hasIcon: false, ic: '', lc: '', count: waitAll.reduce((n, w) => n + w.count, 0), on: wTab === 'all', pick: () => this.setState({ waitTab: 'all' }) }]
        .concat(waitAll.map(w => ({ label: w.code, hasIcon: true, ic: w.ic, lc: w.lc, count: w.count, on: wTab === w.code, pick: () => this.setState({ waitTab: w.code }) }))),
      panelLabel: wTab === 'all' ? 'Still waiting, all leagues' : 'Still waiting, ' + wTab,
      cols: waitAll.filter(w => wTab === 'all' || w.code === wTab),
      gapTitle: wTab === 'all' ? 'Longest gaps between titles' : 'Longest gaps between titles in the ' + wTab,
      droughts: droughtAll.filter(d => wTab === 'all' || d.lg === wTab).slice(0, 12)
    };

    return {
      theme,
      themeLabel: theme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme',
      themeIconD: theme === 'dark' ? ICON.sun : ICON.moon,
      toggleTheme: () => this.setState({ userTheme: theme === 'dark' ? 'light' : 'dark' }),
      icons: ICON,
      legend: LG.map(c => ({ code: c, cls: 'sw-' + c.toLowerCase(), label: LGLONG[c] + ' (' + c + ')' })),
      hero: {
        asOf: 'Oct 28, 2026',
        titles: P.titles.length,
        byLeague: LG.map(c => c + ' ' + titlesByLg[c]).join(' · '),
        metros: withTitle.length,
        titleless: P.metros.length - withTitle.length,
        slams: slams.length,
        slamNames: slams.map(m => m.name.split(' / ')[0].split('–')[0].replace(', D.C.', '')).join(', '),
        added: addedList.length,
        pending: PENDING
      },
      map: mapObj,
      filters, board, cmp, time, race, matrix, waiting,
      banner: { open: !!S.banner, dismiss: () => this.setState({ banner: false }) },
      notes: {
        isOpen: !!S.aboutOpen,
        label: S.aboutOpen ? 'Hide details' : 'Show details',
        chev: S.aboutOpen ? ICON.chevUp : ICON.chevDown,
        toggle: () => this.setState(s => ({ aboutOpen: !s.aboutOpen })),
        openIt: () => this.setState({ aboutOpen: true }),
        added: addedList.map(t => ({ ...self.sw(t.fi), ...lgm(t.lg), y: t.y, team: t.team, label: t.label, lg: t.lg }))
      }
    };
  }
}
