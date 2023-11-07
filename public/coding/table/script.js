var elements = [{name: "Dragan", number: 8}, {name: "Petar", number: 5}, {name: "Ivan", number: 25}]

function sortByNumber(){
    elements.sort((a, b)=> {
        if (a.number < b.number) {
            return 1
        }else {
            return -1
        }
    });
}

function sortByName(){
    elements.sort((a, b) => a.name.localeCompare(b.name))
}


function tableCreate(){
    const body = document.body,
    tbl = document.getElementsByClassName("table");
  
    for (let i = 0; i < elements.length; i++) {
        const tr = tbl[0].insertRow();
        const tdName = tr.insertCell();
        tdName.appendChild(document.createTextNode(elements[i].name));
        tr.appendChild(tdName);
        const tdNumber = tr.insertCell();
        tdNumber.appendChild(document.createTextNode(elements[i].number));
        tr.appendChild(tdNumber);

        tr.classList.add("generated")
        tdName.classList.add("generated")
        tdNumber.classList.add("generated")
    }
}

function tableDelete(){
    const toRemove = document.querySelectorAll('.generated');

    toRemove.forEach(generated => {
        generated.remove();
    });
}

function tableUpdate(){
    tableDelete()
    tableCreate()
}

function inputFunction(){
    nameInput = document.getElementById('name').value
    numInput = document.getElementById('num').value
}

function newObject(){
    elements.push({name: nameInput, number: numInput})
}

/*function getText(file) {
    myObject = fetch(file);
    myText = myObject.text();
    myDisplay(myText);
}*/

tableCreate()

document.getElementById("nameSort").addEventListener("click", function(){
    sortByName()
    tableUpdate()
});
document.getElementById("numSort").addEventListener("click", function(){
    sortByNumber()
    tableUpdate()
});

document.getElementById("submit").addEventListener("click", function(){
    if(nameInput != "" && numInput != ""){
        newObject()
        tableUpdate()
    }
});

//getText('file:///F:/Projekti/Moj%20Sajt/dg.com/table/data.txt')

function main(){
    requestAnimationFrame(main)

    inputFunction()
    //saveData(elements)
}

main()




