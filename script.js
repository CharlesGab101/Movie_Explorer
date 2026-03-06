// To-Do
var page_number = 1;
var is_already_fetched = false;
var saved_criteria = "popularity.desc";
let page_number_element = "";
var page_object = "";
var total_pages = 0;
let trigger = true;
let trigger2 = true;

const pageNext = () => {
    page_number_element = document.getElementById('page-number');
    if (is_already_fetched == false) {
        return;
    }
    page_number += 1;
    if (page_number > total_pages) {
        page_number = total_pages;
    }
    page_object = `<div class="font-page-number">
                          Page ${page_number} of ${total_pages}
                    </div>`;
    page_number_element.innerHTML = page_object;
    show_movie_by_criteria(saved_criteria);
}

const pagePrevious = () => {
    page_number_element = document.getElementById('page-number');
    if (is_already_fetched == false) {
        return;
    }
    page_number -= 1;
    if (page_number < 1) {
        page_number = 1;
    }
    page_object = `<div class="font-page-number">
                          Page ${page_number} of ${total_pages}
                    </div>`;
    page_number_element.innerHTML = page_object;
    show_movie_by_criteria(saved_criteria);
}

const show_movie_by_criteria = (criteria) => {
    let objoutput = document.getElementById('content');

    is_already_fetched = true;
    saved_criteria = criteria;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjk0MjI1NmEwZjg0YjM0ZjlmMmVhMjE4MWZjNzhlMyIsIm5iZiI6MTc3MTkxNzI3MS44NDA5OTk4LCJzdWIiOiI2OTlkNGZkN2Q1NTc5MjJhYmUwNjVkMDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rfnc_0ya1FAP_dJfXqTX6vEEPWnmdu_NJblTMW1ASfI'
    }
    };
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page_number}&sort_by=${saved_criteria}`, options)
    .then(res => res.json())
    .then(data => {
        const baseUrl = 'https://image.tmdb.org/t/p/w500';
        var output = "";
        
        if (trigger) {
            total_pages = data.total_pages;
            pagePrevious();
            trigger = false;
        }
        //console.log(total_pages);
        //data.results.slice(0, n - 1).forEach(movies
        data.results.slice(0, data.results.total_pages).forEach(movies => {
            output += `
            <div class="box_movies">
                <dl>
                    <dd>
                        <div><img src="${baseUrl}${movies.poster_path}" class="box-img"></div>
                        <h1 class="box-title">${movies.original_title}</h1>
                        <p class="box-release-date">Release Date: ${movies.release_date}</p>
                        <p class="box-rating">Rating: ${movies.vote_average}</p>
                    </dd>
                </dl>
            </div>
            `;

        });
        objoutput.innerHTML = output;
    })
    .catch(err => console.error(err));
}

const show_movie_by_search = () => {
    let objoutput = document.getElementById('content');
    const search = document.getElementById('search-input').value;
    if (search === "") {
        show_movie_by_criteria(saved_criteria);
        return;
    }
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjk0MjI1NmEwZjg0YjM0ZjlmMmVhMjE4MWZjNzhlMyIsIm5iZiI6MTc3MTkxNzI3MS44NDA5OTk4LCJzdWIiOiI2OTlkNGZkN2Q1NTc5MjJhYmUwNjVkMDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rfnc_0ya1FAP_dJfXqTX6vEEPWnmdu_NJblTMW1ASfI'
    }
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US`, options)
    .then(res => res.json())
    .then(data => {
        const baseUrl = 'https://image.tmdb.org/t/p/w500';
        var output = "";
        data.results.slice(0,1000).forEach(movies =>
            output += `<div class="box_movies">
                <dl>
                    <dd>
                        <div><img src="${baseUrl}${movies.poster_path}" class="box-img"></div>
                        <h1 class="box-title">${movies.title}</h1>
                        <p class="box-release-date">Release Date: ${movies.release_date}</p>
                        <p class="box-rating">Rating: ${movies.vote_average}</p>
                    </dd>
                </dl>
            </div>
                `
        )
        objoutput.innerHTML = output;
    })
    .catch(err => console.error(err));

    }
    
document.addEventListener('DOMContentLoaded', () => {
    show_movie_by_criteria(saved_criteria);
    pagePrevious();
});