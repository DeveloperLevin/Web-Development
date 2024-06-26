const API_KEY = "-CC856SVGZh8X3qIjgj9SiKfkTKnC11f2Ucyq2rM4H4"
const formElement = document.querySelector('.form')

const btn = formElement.querySelector('.submit');
const showMore = document.querySelector('.show-more');
const result = document.querySelector('.result');

let page = 1;

const findImage = async () => {
    try {
        const image = formElement.querySelector('.search').value;

        if (page >= 1) {
            showMore.style.display = 'block';
        }

        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${image}&client_id=${API_KEY}`);
        
        if (!response.ok){
            throw new Error("Network response was not okay")
        }

        const data = await response.json()
        const finalData = data.results;

        page += 1;

        //create a loop that traverses the array of objects
        finalData.map(d => {
            const box = document.createElement('div');
            const resultImage = document.createElement('img');
            const link = document.createElement('a')
            
            resultImage.classList.add('img');
            link.classList.add('link')
            box.classList.add('box');

            box.appendChild(resultImage);
            box.appendChild(link);
            result.appendChild(box);

            resultImage.src = d.urls.full;
            link.innerText = d.alt_description;
            link.href = d.links.download;
            link.target = "_blank";
        })

    }
    catch(Error){
        result.style.display = none;
        const h2 = document.createElement('h2');
        h2.innerText = "An error Occured";
        formElement.appendChild(h2);
    }
}

showMore.addEventListener('click', (e) => {
    e.preventDefault();
    findImage()
    
})

btn.addEventListener('click', (e) => {
    e.preventDefault()
    result.innerHTML = "";
    findImage()
})
