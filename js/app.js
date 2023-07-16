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
        // console.log(category.category_id)

        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add('fw-semibold', 'text-secondary', 'py-2',)
        categoryDiv.innerHTML = `
            <a onclick="categoyDataLoad(${category.category_id})" class="text-decoration-none category-item">${category.category_name}</a>
        `;

        catagoryContainer.appendChild(categoryDiv)


    })

}


/* ------------------
news data load and display
------------------ */
const categoyDataLoad = async (id = 1) => {
    spinnerLoader(true)
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryData(data.data);
    }
    catch (error) {
        console.log(error)
    }
}

const displayCategoryData = (newses) => {
    // console.log(newses)
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const noNews = document.getElementById('no-news')
    if (newses.length === 0) {
        noNews.classList.remove('d-none')
    }
    else {
        noNews.classList.add('d-none')
    }
    // view wise show content upper to lower
    const viewWiseShow = newses;
    viewWiseShow.sort((a, b) => b.total_view - a.total_view)
    // console.log(viewWiseShow)
    viewWiseShow.forEach(news => {

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row', 'g-3', 'align-items-md-center', 'my-4')
        newsDiv.innerHTML = `
        <!-- news content -->
                <div class="col-12 col-md-3 text-center">
                    <img class="" src="${news.thumbnail_url}" alt="">
                </div>
                <div  class="col-12 col-md-9 text-justify text-center text-md-start">
                    <div>
                        <h3>${news.title}</h3>
                        <p class="news-details">${news.details.split(' ').slice(0, 100).join(' ')}...</p>

                    </div>
                    <!-- news author, view, rating ,details -->
                    <div class="d-flex justify-content-between">
                        <div class="d-flex gap-2 align-items-center">
                            <p><img style="width: 50px; border-radius: 50%" src="${news.author.img}" alt=""></p>
                            <p class="fw-bold text-secondary">${news.author.name === 'system' ? 'No data available' : news.author.name}</p>
                        </div>
                        <div class="d-flex gap-1 align-items-center">
                            <p><img src="images/carbon_view.png" alt=""></p>
                            <p class="fw-bold text-secondary">${news.total_view ? news.total_view : 'No View'}</p>
                        </div>
                        <div class="arrow-btn" >
                            <button onclick="loadDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" class="border-0"><i class="fs-5 text-secondary fa-solid fa-arrow-right"></i></button>
                        </div>  
                    </div>
                </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
    spinnerLoader(false)
}
/* --------------------------
modal load and dispaly-
----------------------------- */
const loadDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        dispalyDetails(data.data[0])
    }
    catch (error) {
        console.log(error)
    }
}
const dispalyDetails = (news) => {
    // console.log(news)
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="newseModalLabel">${news.title.split(' ').slice(0, 10).join(' ')}...</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p><img class="img-fluid" src="${news.image_url}"/></p>
            <h3 class="mb-3">${news.title}</h3>
            <p class="mb-3 news-details"> ${news.details}</p>
            <div class="d-flex justify-content-between px-2">
                <div class="d-flex gap-2 align-items-center">
                    <p><img style="width: 50px; border-radius: 50%" src="${news.author.img}" alt=""></p>
                    <p class="fw-bold text-secondary">${news.author.name === 'system' ? 'No data available' : news.author.name}</p>
                </div>
                
                <div class="d-flex gap-1 align-items-center">
                    <p><img src="images/carbon_view.png" alt=""></p>
                    <p class="fw-bold text-secondary">${news.total_view ? news.total_view : 'No View'}</p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        
    `;
}
/* -----------------------
    spinner load
--------------------------*/
const spinnerLoader = (isLoading) => {
    const spinnerLoader = document.getElementById('spinner');
    if (isLoading === true) {
        spinnerLoader.classList.remove('d-none')
    }
    else {
        spinnerLoader.classList.add('d-none')
    }
}

categoriLoad()
categoyDataLoad()
spinnerLoader(true)