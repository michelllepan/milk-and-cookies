import getIngred from 'src/ingredextract';
import getReplacer from 'src/ingredextract';


var names = getIngred()
var replacements = getReplacer()
var checklists = document.querySelectorAll('ul[class^="checklist dropdownwrapper list-ingredients-"]')
for (var i = 0; i < checklists.length; i++){
     var thing1 = checklists[i].getElementsByClassName("checkList__line")
     for (var j = 0; j<thing1.length; j++){
     	var thing2 = thing1[j].getElementsByClassName("recipe-ingred_txt added")
     	thing2[0].innerText = replacements[x.title][2]
     }
}



