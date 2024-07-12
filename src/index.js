console.log('%c HI', 'color: firebrick')


document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    // Fetch and display random dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const images = data.message;
            const imageContainer = document.getElementById('dog-image-container');
            
            images.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Random Dog Image';
                imgElement.style.width = '200px';
                imgElement.style.height = '200px';
                imgElement.style.margin = '10px';
                
                imageContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error fetching images:', error));

    // Fetch and display all dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;
            const breedList = document.getElementById('dog-breeds');
            const breedDropdown = document.getElementById('breed-dropdown');

            function renderBreeds(filterLetter = '') {
                breedList.innerHTML = '';
                for (let breed in breeds) {
                    if (breed.startsWith(filterLetter)) {
                        const liElement = document.createElement('li');
                        liElement.textContent = breed;
                        liElement.addEventListener('click', () => {
                            liElement.style.color = 'blue'; // Change to your preferred color
                        });
                        breedList.appendChild(liElement);
                    }
                }
            }

            breedDropdown.addEventListener('change', (event) => {
                const selectedLetter = event.target.value;
                renderBreeds(selectedLetter);
            });

            renderBreeds('a'); // Initial render with 'a' filter
        })
        .catch(error => console.error('Error fetching breeds:', error));
});
