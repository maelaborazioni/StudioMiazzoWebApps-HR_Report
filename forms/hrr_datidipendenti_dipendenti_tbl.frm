dataSource:"db:/ma_anagrafiche/lavoratori",
extendsID:"E1B6951E-8C22-4464-9B19-707548D2B2DE",
items:[
{
labelFor:"codicefiscale",
location:"0,0",
name:"lbl_cf",
size:"140,20",
styleClass:"table_header_first",
text:"Codice fiscale",
typeid:7,
uuid:"0B0F0831-E728-495C-B50B-637D8010FF49"
},
{
anchors:11,
dataProviderID:"lavoratori_to_persone.nome",
editable:false,
location:"365,20",
name:"nome",
size:"225,20",
styleClass:"table",
text:"Nome",
typeid:4,
uuid:"200A6BAF-7C5C-4A24-B1C2-10F2C78F080A"
},
{
anchors:11,
labelFor:"nome",
location:"365,0",
name:"lbl_nome",
size:"225,20",
styleClass:"table_header",
text:"Nome",
typeid:7,
uuid:"3AA24D7E-F338-40FB-A3C7-20E358AB48B9"
},
{
height:40,
partType:5,
typeid:19,
uuid:"553D32D0-64A5-41BF-B952-BE5F4927363A"
},
{
anchors:11,
labelFor:"cognome",
location:"140,0",
name:"lbl_cogn",
size:"225,20",
styleClass:"table_header",
text:"Cognome",
typeid:7,
uuid:"6156BEF7-A645-48C9-83D7-B922A64453BB"
},
{
anchors:11,
dataProviderID:"lavoratori_to_persone.cognome",
editable:false,
location:"140,20",
name:"cognome",
size:"225,20",
styleClass:"table",
text:"Cognome",
typeid:4,
uuid:"9920C0E5-A41F-4A29-B953-8A70B9B18C1C"
},
{
dataProviderID:"codicefiscale",
editable:false,
horizontalAlignment:0,
location:"0,20",
name:"codicefiscale",
size:"140,20",
styleClass:"table_first",
text:"Codice fiscale",
typeid:4,
uuid:"C18FB745-17EB-457E-BF0E-4C1D373451A9"
}
],
name:"hrr_datidipendenti_dipendenti_tbl",
navigatorID:"-1",
scrollbars:32,
size:"590,40",
styleName:"leaf_style",
typeid:3,
uuid:"8370A6D4-235B-4D7E-B921-F7BD63D5876B",
view:3