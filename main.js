let movies = [
    {
        "Title": "Captain Marvel",
        "Year": "2019",
        "imdbID": "tt4154664",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg"
    },
    {
        "Title": "Ms. Marvel",
        "Year": "2022",
        "imdbID": "tt10857164",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZmQ3OTZkNDUtNTU0Mi00ZjE4LTgyNTUtY2E4NWRmNDUxMzkyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg"
    },
    {
        "Title": "Marvel One-Shot: Agent Carter",
        "Year": "2013",
        "imdbID": "tt3067038",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZDIwZTM4M2QtMWFhYy00N2VmLWFlMjItMzI3NjBjYTc0OTMxXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg"
    },
    {
        "Title": "Marvel One-Shot: All Hail the King",
        "Year": "2014",
        "imdbID": "tt3438640",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZGFkMTZkMDQtNzM4Yy00YWEwLTkzOWEtZTMyNDRlNmJhYWJhXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg"
    },
    {
        "Title": "Marvel One-Shot: Item 47",
        "Year": "2012",
        "imdbID": "tt2247732",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjNlMzAxNmQtOGEwZi00NTEyLWI0NWYtMTlhNmE2YTA3ZDVhXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg"
    },
    {
        "Title": "Marvel One-Shot: A Funny Thing Happened on the Way to Thor's Hammer",
        "Year": "2011",
        "imdbID": "tt2011109",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYmVlYTg3N2QtMWM2OS00YWQyLWI2M2MtMDc0ZjBkZjk1MTY3XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg"
    },
    {
        "Title": "Marvel One-Shot: The Consultant",
        "Year": "2011",
        "imdbID": "tt2011118",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNGE4YjU5MDAtYzYzMC00M2RlLTk0NDgtNDU1MjgyMGI0MjI3XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg"
    },
    {
        "Title": "Marvel Studios: Legends",
        "Year": "2021–",
        "imdbID": "tt13650480",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMzdiNGVlZGYtMGY1Ni00OGU1LTlmYzEtZDBjYjk3OGM3YTNkXkEyXkFqcGdeQXVyNzk3NDUzNTc@._V1_SX300.jpg"
    },
    {
        "Title": "Marvel Studios: Assembled",
        "Year": "2021–",
        "imdbID": "tt14094206",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNWMyNWYyMmYtZjNiZi00MzFmLTg2MjYtYWEzZWY1MzBhY2I2XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg"
    },
    {
        "Title": "Lego Marvel Super Heroes",
        "Year": "2013",
        "imdbID": "tt2620204",
        "Type": "game",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOTA5ODA2NTI2M15BMl5BanBnXkFtZTgwNTcxMzU1MDE@._V1_SX300.jpg"
    }
]

let page = 1
let totalPages = 1
let keyword
let imdbID = "tt2620204"

let movieInfo = {}

if(!localStorage.getItem('comments')) {
    localStorage.setItem('comments', "{}")
}

if(!localStorage.getItem('ratings')) {
    localStorage.setItem('ratings', "{}")
}

const tableForMovieList = () => {
    return `<table id="movie-list">
        <tr class="movie-list-head">
            <th>Poster</th>
            <th>Name</th>
            <th>Type</th>
            <th>Year of Release</th>
        </tr>            
    </table>`
}

const tableForMovieInfo = () => {
    return `<button id="go-back-btn">Go Back</button>
    <table id="movie-info">       
    </table>`
}

const showNextPage = () => {
    page += 1
    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(keyword)}&apiKey=a9ad3b42&page=${page}`)
        .then(result => result.json())
        .then(data => {
            movies = data.Search
            showMoviesList()
        })
}

const showPreviousPage = () => {
    page -= 1
    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(keyword)}&apiKey=a9ad3b42&page=${page}`)
        .then(result => result.json())
        .then(data => {
            movies = data.Search
            showMoviesList()
        })
}

const getRating = () => {
    const data = JSON.parse(localStorage.getItem("ratings"))
    if(!data[imdbID]) {
        data[imdbID] = 0;
        localStorage.setItem("ratings", JSON.stringify(data))
    }
    return data[imdbID]
}

const getComment = () => {
    const data = JSON.parse(localStorage.getItem("comments"))
    if(!data[imdbID]) {
        data[imdbID] = "N/A";
        localStorage.setItem("comments", JSON.stringify(data))
    }
    return data[imdbID]
}

const getCommentAndRatingEditor = () => {
    let editorDiv = document.createElement("div")
    editorDiv.innerHTML = `
        <label for="comment-edit">Comment: </label>
        <input type="text" id="comment-edit" value="${JSON.parse(localStorage.getItem("comments"))[imdbID]}">
        <button id="comment-btn">Comment</button><br/><br/>
        <label for="ratings-edit">Ratings (out of 5): </label>
        <input type="number" id="rating-edit" value="${JSON.parse(localStorage.getItem("ratings"))[imdbID]}">
        <button id="rate-btn">Rate</button>    
    `
    editorDiv.style.margin = "10px";
    return editorDiv
}

const editAndSaveComment = (comment) => {
    const data = JSON.parse(localStorage.getItem("comments"))
    data[imdbID] = comment
    localStorage.setItem("comments", JSON.stringify(data))
    showMovieInfo()
}

const editAndSaveRating = (rating) => {
    if(rating < 0) {
        rating = 0
    }
    if(rating > 5) {
        rating = 5;
    }
    const data = JSON.parse(localStorage.getItem("ratings"))
    data[imdbID] = rating
    localStorage.setItem("ratings", JSON.stringify(data))
    showMovieInfo()
}

const showMovieInfo = () => {
    document.getElementById("search-movies").style.display = "none"
    const tableDiv = document.getElementById("table-div")
    tableDiv.innerHTML = tableForMovieInfo()
    const tableMovieInfo = document.getElementById("movie-info")

    fetch(`https://www.omdbapi.com/?i=${imdbID}&apiKey=a9ad3b42`)
        .then(result => result.json())
        .then(data => {
            if(data.Response) {
                delete data.Response
                delete data.imdbID
                delete data.Ratings
                movieInfo = data
                movieInfo["Your Rating"] = getRating()   
                movieInfo["Your Comment"] = getComment()

                let poster = document.createElement("tr")
                let posterCell = document.createElement("td")
                let img = document.createElement("img")
                let title = document.createElement("p")
    
                poster.className = "movie-info-poster"
                img.src = movieInfo.Poster
                title.innerText = movieInfo.Title
                posterCell.colSpan = 2
    
                poster.appendChild(posterCell)
                posterCell.appendChild(img)
                posterCell.appendChild(title)
                tableMovieInfo.appendChild(poster)

                for(const key in movieInfo) {
                    if(key !== "Title" && key !== "Poster") {
                        const tr = document.createElement("tr")
                        const tdKey = document.createElement("td")
                        const tdVal = document.createElement("td")
            
                        tdKey.innerHTML = key
                        tdVal.innerHTML = movieInfo[key]
                        tdKey.style.fontWeight = 600
            
                        tr.appendChild(tdKey)
                        tr.appendChild(tdVal)
                        tableMovieInfo.appendChild(tr)
                    }
                }
                tableMovieInfo.appendChild(getCommentAndRatingEditor())

                const commentBtn = document.getElementById("comment-btn")
                const ratingBtn = document.getElementById("rate-btn")

                commentBtn.addEventListener("click", () => {
                    editAndSaveComment(document.getElementById("comment-edit").value)
                })

                ratingBtn.addEventListener("click", () => {
                    editAndSaveRating(document.getElementById("rating-edit").value)
                })

            }
        })
    document.getElementById("go-back-btn").addEventListener("click", () => {
        showMoviesList()
    })

}

const showMoviesList = () => {
    const tableDiv = document.getElementById("table-div")
    tableDiv.innerHTML = tableForMovieList()
    const movieList = document.getElementById("movie-list")
    document.getElementById("search-movies").style.display = ""
    for(let i = 0; i < movies.length; i++) {
        const tableRow = document.createElement("tr")
        const nameCell = document.createElement("td")
        const posterCell = document.createElement("td")
        const typeCell = document.createElement("td")
        const yearCell = document.createElement("td")
        const nameElement = document.createElement("span")

        posterCell.className = "movie-list-poster"
        nameCell.className = "movie-list-name"
        typeCell.className = "movie-list-type"
        yearCell.className = "movie-list-year"
        nameElement.className = "movie-list-nameElement"

        posterCell.innerHTML = `<img src=${movies[i].Poster}/>`
        nameElement.innerHTML = movies[i].Title
        typeCell.innerHTML = movies[i].Type
        yearCell.innerHTML = movies[i].Year

        if(i%2 === 1) {
            tableRow.style.backgroundColor = "#88f"
        } else {
            tableRow.style.backgroundColor = "#ddf"
        }

        nameCell.appendChild(nameElement)
        tableRow.appendChild(posterCell)
        tableRow.appendChild(nameCell)
        tableRow.appendChild(typeCell)
        tableRow.appendChild(yearCell)
        movieList.appendChild(tableRow)

        nameElement.addEventListener("click", () => {
            imdbID = movies[i].imdbID
            showMovieInfo()
        })
    }

    const pageSpan = document.createElement("span")
    const nextBtn = document.createElement("button")
    const prevBtn = document.createElement("button")

    prevBtn.innerText = "Prev"
    nextBtn.innerText = "Next"
    pageSpan.innerHTML = `Showing ${page} of ${totalPages} pages`

    prevBtn.style.marginRight = "10px"
    nextBtn.style.marginRight = "10px"

    if(page === 1) {
        prevBtn.disabled = true
    }

    if(page === totalPages) {
        nextBtn.disabled = true
    }

    prevBtn.addEventListener("click", () => {
        showPreviousPage()
    })

    nextBtn.addEventListener("click", () => {
        showNextPage()
    })

    tableDiv.appendChild(prevBtn)
    tableDiv.appendChild(nextBtn)
    tableDiv.appendChild(pageSpan)
}

showMoviesList()

document.getElementById("search-btn").addEventListener("click", () => {
    page = 1
    keyword = document.getElementById("search").value.trim()
    if(keyword && keyword.length !== 0) {
        fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(keyword)}&apiKey=a9ad3b42&page=1`)
            .then(result => result.json())
            .then(data => {
                movies = data.Search
                totalPages = Math.ceil(data.totalResults/10)
                showMoviesList()
            })
    }
})