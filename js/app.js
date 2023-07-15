/* ---------------------------
    category data load & display
--------------------------------- */
const categoriLoad = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}
const displayCategories = (categories) => {
    const catagoryContainer = document.getElementById('catagory-container')
    categories.forEach(category => {
        // console.log(category)
        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add('fw-semibold', 'text-secondary', 'py-2')
        categoryDiv.innerHTML = `
            <a onclick="categoyDataLoad(${category.category_id})" class="text-decoration-none">${category.category_name}</a>
        `;
        catagoryContainer.appendChild(categoryDiv)
    })
}

const categoyDataLoad = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);
    }
    catch (error) {
        console.log(error)
    }

}


categoriLoad()

