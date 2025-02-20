let currentIndex = 0;
let activeSlides = [];

const slidesData = {
    home: [
        {
            image: 'assets/cesta-do.jpg',
            title: 'Cesta do Scheaditz',
            description: 'Právě přejíždíme hranice a vidíme nějaké náhodné hory.',
        },
        {
            image: 'assets/mcDonaldsNemecko.jpeg',
            title: 'McDonald\'s v Německu',
            description: 'Byli jsme v McDonaldu kousek před Lipskem a já si nic nekoupil :D',
        },
        {
            image: 'assets/areal.jpeg',
            title: 'Office',
            description: 'Clock tower - tam máme vždycky sraz, když někam odcházíme.',
        },
        {
            image: 'assets/snidane.jpeg',
            title: 'Švédské stoly',
            description: 'Na snídani máme vejce, nutellu, šunku, sýr, ovoce, zeleninu...',
        },
        {
            image: 'assets/nadavani.jpeg',
            title: 'Představování Martinovi',
            description: 'Představovali jsme se a Martin nám za skoro všechno vytknul.',
        },
        {
            image: 'assets/pg.webp',
            title: 'Náš pokoj (č. 137)',
            description: 'Takhle to vypadá na našem pokoji.',
        },
        {
            image: 'assets/pg.webp',
            title: 'Koupelna',
            description: '',
        }
    ],
    work: {
        'work1w': [
            {
                image: 'assets/w1-wd1.jpg',
                title: 'Dával jsem prezentaci, kterou teď prohlížíte',
                description: 'Všichni to dělají přes AI.',
            },
            {
                image: 'assets/pg.webp',
                title: 'Zapojovani zasuvek',
                description: ''
            },
            {
                image: 'assets/pg.webp',
                title: 'Zapojovani svetel',
                description: ''
            }
        ],
        'work2w': [
            {
                image: 'assets/pg.webp',
                title: 'Práce - 2 týdny',
                description: 'Brzy.',
            }
        ]
    },
    culture: {
        'culture-leipzig': [
            {
                image: 'assets/nadrazi-markt.jpg',
                title: 'Nádražní zastávka v Lipsku, Markt',
                description: 'Přišlo mi zajímavé, jak všude mají vysoké stropy.',
            },
            {
                image: 'assets/socha-gete.jpg',
                title: 'Nejdřív jsme měli zastávku u památníku Johann Wolfgang von Goethe',
                description: 'On tam jezdil hrát pro bohaté lidi, protože měli hodně peněz.',
                link: './assets/socha-gete.jpg',
            },
            {
                image: 'assets/2nejstarsi-restaurace.jpg',
                title: 'Budova, ve které je 2. nejstarší restaurace v Evropě',
                description: 'Tato budova byla postavena kolem roku 1900 a v jejím podzemí se nachází 2. nejstarší restaurace v Evropě, která slaví tento rok 500 let.',
            },
            {
                image: 'assets/oltar-kostel.jpg',
                title: 'Oltář kostela',
                description: '',
            },
            {
                image: 'assets/guide.jpeg',
                title: 'Nejvýznamnější kostel v Lipsku',
                description: 'Do toho kostela chodili, protože tam mohli drbat proti tajné policii a mohli tam pouštět americké písně.',
            }
        ],
        'culture-berlin': [
            {
                image: 'assets/berlin.jpeg',
                title: 'Kultura - Berlín',
                description: 'Prozkoumejte kulturu Berlína.',
            }
        ],
    },
    freetime: [
        {
            image: 'assets/pg.webp',
            title: 'Hrani ve VR',
            description: 'Hrali jsme hru strilecku ve VR'
        },
        {
            image: 'assets/pg.webp',
            title: 'Volný čas',
            description: 'Programovani v C a C++',
        },
        {
            image: 'assets/pg.webp',
            title: 'Jsem jiny :D',
            description: 'Accually jsem si uvedomil ze nemuzu delat to co delaji vsichni, skola je totalni klauniada. Poslouchal jsem podast od "Diary of CEO" s MrBeast a prijede mi ze celkem dost toho mame spolecneho v detstvi.'
        }
    ]
};



// Load all slides into the DOM once
function loadSlides() {
    const slidesWrapper = document.getElementById('slidesWrapper');
    slidesWrapper.innerHTML = '';  // Clear the container before adding new slides

    // Iterate through the slidesData structure
    for (let category in slidesData) {
        const categorySlides = slidesData[category];

        // If the category is not an array (subcategories exist), iterate through subcategories
        if (Array.isArray(categorySlides)) {
            categorySlides.forEach(slide => {
                const slideElement = createSlideElement(slide, category);
                slidesWrapper.appendChild(slideElement);
            });
        } else {
            // Iterate through subcategories within a category
            for (let specific in categorySlides) {
                const specificSlides = categorySlides[specific];
                specificSlides.forEach(slide => {
                    const slideElement = createSlideElement(slide, category, specific);
                    slidesWrapper.appendChild(slideElement);
                });
            }
        }
    }
}

// Create slide element with required structure
function createSlideElement(slide, category, specific = null) {
    const slideElement = document.createElement('div');
    slideElement.classList.add('slide', category, specific);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const imageLink = document.createElement('a');
    if (slide.image) {
        imageLink.href = slide.image;
        imageLink.target = '_blank';  // Ensure link opens in a new tab
    }

    const image = document.createElement('img');
    image.src = slide.image;
    image.alt = slide.title;

    imageContainer.appendChild(image);
    imageLink.appendChild(imageContainer);

    const content = document.createElement('div');
    content.classList.add('content');

    const title = document.createElement('h2');
    title.textContent = slide.title;
    content.appendChild(title);

    const description = document.createElement('p');
    description.textContent = slide.description;
    content.appendChild(description);

    slideElement.appendChild(imageLink);
    slideElement.appendChild(content);

    return slideElement;
}

// Show only the selected category slides
function showSlides(category, specific = null) {
    const allSlides = document.querySelectorAll('.slide');

    // Hide all slides by removing the 'active' class
    allSlides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Filter slides by category and specific subcategory
    if (specific) {
        activeSlides = [...document.querySelectorAll(`.slide.${category}.${specific}`)];
    } else {
        activeSlides = [...document.querySelectorAll(`.slide.${category}`)];
    }

    // Reset the index to the first slide
    currentIndex = 0;
    if (activeSlides.length > 0) {
        activeSlides[currentIndex].classList.add('active');
    }
}

// Change slides left or right
function changeSlide(direction) {
    if (activeSlides.length === 0) return;

    // Remove the 'active' class from the current slide
    activeSlides[currentIndex].classList.remove('active');

    // Update the index
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = activeSlides.length - 1;
    if (currentIndex >= activeSlides.length) currentIndex = 0;

    // Add the 'active' class to the new slide
    activeSlides[currentIndex].classList.add('active');
}

// Show 'home' slides by default when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadSlides();
    showSlides('home');
});
