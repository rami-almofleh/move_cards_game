const container = document.querySelector(".container");
let image_id = 1;

for (let i = 1; i < 82; i++) {
    let div = document.createElement("div");
    div.classList.add("box");
    div.id = 'box_' + i;

    if (i === 81) {
        div.classList.add("empty");
    } else {
        let innerDiv = document.createElement("div");

        if ((i - 1) % 4 === 0) {
            image_id = ((i - 1) / 4) + 1;
        }
        innerDiv.classList.add(`image_${image_id}`);
        innerDiv.style.backgroundImage = `url(/images/${image_id}.png)`;

        div.append(innerDiv);
    }

    div.onclick = (event) => {
        applyClickToCard(event);
    };

    container.append(div);
}


function reorderElements() {
    let arr = [],
        newContainer = document.createElement('div');

    while (arr.length < 82) {
        let num = Math.floor(Math.random() * 82);
        if (!arr.includes(num)) {
            arr.push(num);
        }
    }

    arr.forEach(function(idx) {
        let item = container.querySelector('#box_' + idx)
        if (item) {
            newContainer.appendChild(item);
        }
    });
    container.innerHTML = newContainer.innerHTML;

    let i=1;
    container.childNodes.forEach(el => {
        el.onclick = (event) => {
            applyClickToCard(event);
        };
        el.id = 'box_' + i;
        i++;
    })
}

reorderElements();

function applyClickToCard(event) {
    let id = event.target.parentElement.id.split('_')[1];
    let div = event.currentTarget;

    let el1 = document.getElementById('box_' + (Number(id) - 9));
    // div is in the first line
    if (el1?.classList.contains("empty")) {
        let divHtmlContent = div.innerHTML;
        el1.classList.remove("empty");
        div.classList.add("empty");
        el1.innerHTML = divHtmlContent;
        div.innerHTML = "";

        return;
    }

    let el2 = document.getElementById('box_' + (Number(id) + 9));
    // div is in the last line
    if (el2?.classList.contains("empty")) {
        let divHtmlContent = div.innerHTML;
        el2.classList.remove("empty");
        div.classList.add("empty");
        el2.innerHTML = divHtmlContent;
        div.innerHTML = "";

        return;
    }

    let el3 = document.getElementById('box_' + (Number(id) - 1));

    // div is in the first column
    if (Number(id) - (1 % 9) !== 0 && el3?.classList.contains("empty")) {
        let divHtmlContent = div.innerHTML;
        el3.classList.remove("empty");
        div.classList.add("empty");
        el3.innerHTML = divHtmlContent;
        div.innerHTML = "";

        return;
    }

    let el4 = document.getElementById('box_' + (Number(id) + 1));
    // div is in the last column
    if (Number(id) % 9 !== 0 && el4?.classList.contains("empty")) {
        let divHtmlContent = div.innerHTML;
        el4.classList.remove("empty");
        div.classList.add("empty");
        el4.innerHTML = divHtmlContent;
        div.innerHTML = "";
    }
}