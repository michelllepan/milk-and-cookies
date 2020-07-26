import getIngred from 'src/ingredextract';
import getReplacer from 'src/ingredextract';
import getItem from 'src/ingredextract';

var names = getIngred()
var replacements = getReplacer()
var checklists = document.querySelectorAll('ul[class^="checklist dropdownwrapper list-ingredients-"]')
for (var i = 0; i < checklists.length; i++){
     var inner1 = checklists[i].getElementsByClassName("checkList__line")
     for (var j = 0; j<inner1.length; j++){
     	var inner2 = inner1[j].getElementsByClassName("recipe-ingred_txt added")
     	inner2[0].innerText = replacements[getItem(inner2.innerText)][2]
     }
}



