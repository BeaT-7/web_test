function loadFirstArticle() {
    const latestArticleContainer = document.getElementById("latestArticleContainer");

    fetch("data/articles.json")
        .then(response => response.json())
        .then(articles => {
            if (articles.length > 0) {
                const firstArticle = articles[0];

                const articleContainer = document.createElement("div");
                articleContainer.classList.add("primeryArticle-container");

                const leftCont = document.createElement("div");
                leftCont.classList.add("primeryArticle-left");

                const articleLink = document.createElement("a");
                articleLink.href = `newsArticle.html?id=${firstArticle.id}`;

                const articleTitle = document.createElement("h1");
                articleTitle.textContent = firstArticle.title;

                const articleDate = document.createElement("h4");
                articleDate.textContent = firstArticle.date;
                articleDate.classList.add("secondaryArticle-date");
                articleDate.style.marginLeft = "0";
                
                const articleContentShort = document.createElement("p");
                articleContentShort.textContent = firstArticle.contentShort;
                articleContentShort.classList.add("secondaryArticle-text");
                articleContentShort.style.marginLeft = "0";

                const articleImage = document.createElement("img");
                articleImage.src = `images/news/${firstArticle.img}.jpg`;
                articleImage.alt = "news article image";
                articleImage.classList.add("primeryArticle-img");
                
                leftCont.appendChild(articleTitle);
                leftCont.appendChild(articleDate);
                leftCont.appendChild(articleContentShort);

                articleContainer.appendChild(leftCont);
                articleContainer.appendChild(articleImage);

                articleLink.appendChild(articleContainer);

                latestArticleContainer.appendChild(articleLink);
            }
        })
        .catch(error => {
            console.error("Error fetching articles:", error);
        });
}

function loadNewestInterviews(){
    const latestInterviewContainer = document.getElementById("newInterviewContainer");

    fetch("data/interviews.json")
        .then(response => response.json())
        .then(interviews => {
            interviews.slice(0,4).forEach(interview => {
                const listContainer = document.createElement("div");
                listContainer.classList.add("homePage-listingContainer");

                const midCont = document.createElement("div");
                midCont.style.display = "flex";
                midCont.style.marginTop = "5px";

                const title = document.createElement("text");
                title.textContent = interview.title;
                title.classList.add("homePage-title");

                const date = document.createElement("text");
                date.textContent = interview.date;
                date.classList.add("homePage-date");

                const content = document.createElement("p");
                content.textContent = interview.content.slice(0,100) + "...";
                content.classList.add("secondaryArticle-text");
                content.style.marginLeft = "0";
                content.style.marginTop = "4px";
                
                const category = document.createElement("text");
                category.textContent = interview.category;
                category.classList.add("homePage-category");

                const link = document.createElement("a");
                link.href = `interviewFull.html?id=${interview.id}`;

                midCont.appendChild(category);
                midCont.appendChild(date);
                
                listContainer.appendChild(title);
                listContainer.appendChild(midCont);
                listContainer.appendChild(content);

                link.appendChild(listContainer);

                latestInterviewContainer.appendChild(link);
            });
        })
        .catch(error => {
            console.error("Error fetching interviews:", error);
        });
    }
    
    function loadNewestWorkListings(){
        const latestWorkContainer = document.getElementById("newWorkContainer");
        
        fetch("data/work.json")
        .then(response => response.json())
        .then(listings => {
            listings.slice(0,4).forEach(listing => {
                const listContainer = document.createElement("div");
                listContainer.classList.add("homePage-listingContainer");

                const midCont = document.createElement("div");
                midCont.style.display = "flex";
                midCont.style.marginTop = "5px";

                const title = document.createElement("text");
                title.textContent = listing.title;
                title.classList.add("homePage-title");

                const pay = document.createElement("text");
                pay.textContent = "Salary: " + listing.pay;
                pay.classList.add("homePage-date");
                pay.style.marginLeft = "30px";
                
                const region = document.createElement("text");
                region.textContent = listing.region;
                region.classList.add("homePage-date");
                region.style.fontWeight = "bold";

                const link = document.createElement("a");
                link.href = `workListing.html?id=${listing.id}`;

                midCont.appendChild(region);
                midCont.appendChild(pay);
                
                listContainer.appendChild(title);
                listContainer.appendChild(midCont);

                link.appendChild(listContainer);
                
                latestWorkContainer.appendChild(link);
                
            });
        })
        .catch(error => {
            console.error("Error fetching work listings:", error);
        });
}

function loadSecondaryArticles() {
    const articleContainer = document.getElementById("articleContainer");

    fetch("data/articles.json")
        .then(response => response.json())
        .then(articles => {
            articles.slice(1,7).forEach(article => {
                const articleLink = document.createElement("a");
                articleLink.href = `newsArticle.html?id=${article.id}`;
                
                const articleDiv = document.createElement("div");
                articleDiv.classList.add("secondaryArticle");

                const articleImg = document.createElement("img");
                articleImg.src = `images/news/${article.img}.jpg`;
                articleImg.alt = "news pic";
                articleImg.classList.add("secondaryArticle-img");

                const articleTitle = document.createElement("h2");
                articleTitle.classList.add("secondaryArticle-title");
                articleTitle.textContent = article.title;

                const articleDate = document.createElement("h4");
                articleDate.classList.add("secondaryArticle-date");
                articleDate.textContent = article.date;

                const articleContentShort = document.createElement("p");
                articleContentShort.textContent = article.contentShort;
                articleContentShort.classList.add("secondaryArticle-text")

                articleLink.appendChild(articleImg);
                articleLink.appendChild(articleTitle);
                articleLink.appendChild(articleDate);
                articleLink.appendChild(articleContentShort);
                
                articleDiv.appendChild(articleLink);
                articleContainer.appendChild(articleDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching articles:", error);
        });
}

function loadFullArticle(){
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");
    const fullArticleContainer = document.getElementById("fullArticleContainer");

    // Fetch the full article content based on the article ID
    fetch("data/articles.json")
        .then(response => response.json())
        .then(articles => {
            const article = articles.find(article => article.id === articleId);

            const articleBreak = document.createElement("hr");
            articleBreak.style.width = "85%";
            articleBreak.style.marginLeft = "10px";
            articleBreak.style.marginTop = "-20px";
            articleBreak.style.marginBottom = "30px";

            const articleTextBox = document.createElement("div");
            articleTextBox.classList.add("articleBox");

            const articleTitle = document.createElement("h1");
            articleTitle.textContent = article.title;
            articleTitle.classList.add("fullArticle-title");
            
            const articleImg = document.createElement("img");
            articleImg.src = `images/news/${article.img}.jpg`;
            articleImg.alt = "news pic";
            articleImg.classList.add("fullArticle-img");

            const articleContent = document.createElement("p");
            articleContent.innerHTML = article.content;
            articleContent.classList.add("fullArticle-text");

            articleTextBox.appendChild(articleImg);
            articleTextBox.appendChild(articleContent);
            
            fullArticleContainer.appendChild(articleTitle);
            fullArticleContainer.appendChild(articleBreak);
            fullArticleContainer.appendChild(articleTextBox);
        })
        .catch(error => {
            console.error("Error fetching articles:", error);
        });
}

function getFilteredArticles(category){
    const filteredArticleContainer = document.getElementById("filteredArticleContainer");

    fetch("data/articles.json")
        .then(response => response.json())
        .then(articles => {
            const filteredArticles = articles.filter(article => article.category === category);

            filteredArticles.forEach(article => {
                const articleLink = document.createElement("a");
                articleLink.href = `newsArticle.html?id=${article.id}`;


                const articleContainer = document.createElement("div");
                articleContainer.classList.add("filteredArticle-container");

                const articleContainerLeft = document.createElement("div");
                articleContainer.classList.add("filteredArticle-leftSideContainer");

                const articleTitle = document.createElement("h2");
                articleTitle.textContent = article.title;

                const articleImg = document.createElement("img");
                articleImg.src = `images/news/${article.img}.jpg`;
                articleImg.alt = "article img";
                articleImg.classList.add("filteredArticle-img")


                const articleDate = document.createElement("h4");
                articleDate.textContent = article.date;
                articleDate.classList.add("secondaryArticle-date")
                
                const articleContentShort = document.createElement("p");
                articleContentShort.textContent = article.contentShort;
                articleContentShort.classList.add("secondaryArticle-text")

                articleContainerLeft.appendChild(articleTitle);
                articleContainerLeft.appendChild(articleDate);
                articleContainerLeft.appendChild(articleContentShort);
                articleContainer.appendChild(articleContainerLeft);
                articleContainer.appendChild(articleImg);
                articleLink.appendChild(articleContainer);


                filteredArticleContainer.appendChild(articleLink);
            });
        })
        .catch(error => {
            console.error("Error fetching articles:", error);
        });
}

function loadFilteredVideos(categories){
    const interviewContainer = document.getElementById("interviewContainer");

    fetch("data/interviews.json")
        .then(response => response.json())
        .then(videos => {

            //filters the json file
            const filteredVideos = videos.filter(video => categories.includes(video.category));

            filteredVideos.forEach( video => {
                const vidContainer = document.createElement("div");
                vidContainer.classList.add("videoList-container");

                const vidContainerTop = document.createElement("div");
                vidContainerTop.style.display = "flex";
                vidContainerTop.style.alignItems = "center";
            
                const vidContainerLower = document.createElement("div");
                vidContainerLower.classList.add("videoList-containerLower")

                const vidLink = document.createElement("a");
                vidLink.href = `interviewFull.html?id=${video.id}`

                const vidCategory = document.createElement("h3");
                vidCategory.textContent = video.category;
                vidCategory.classList.add("videoList-category");

                const videoPlayer = document.createElement("iframe");
                videoPlayer.src = `https://www.youtube.com/embed/${video.video}`;
                videoPlayer.classList.add("videoList-player");

                const vidTitle = document.createElement("h1");
                vidTitle.textContent = video.title;
                vidTitle.style.marginBottom = "-10px";
                vidTitle.classList.add("title");

                const vidDate = document.createElement("h4");
                vidDate.textContent = video.date;
                vidDate.classList.add("secondaryArticle-date");
                
                const vidContent = document.createElement("p");
                vidContent.textContent = video.content;
                vidContent.classList.add("secondaryArticle-text");
                vidContent.style.flex = "1";
                
                vidContainerTop.appendChild(vidCategory);
                vidContainerTop.appendChild(vidDate);

                vidContainerLower.appendChild(videoPlayer);
                vidContainerLower.appendChild(vidContent);
                
                vidContainer.appendChild(vidTitle);
                vidContainer.appendChild(vidContainerTop);
                vidContainer.appendChild(vidContainerLower);
                
                vidLink.appendChild(vidContainer);

                interviewContainer.appendChild(vidLink);
            })
        })
        .catch(error => {
            console.error("Error fetching videos:", error);
        });
}

function getFullInterview(){
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get("id");
    const fullInterviewContainer = document.getElementById("fullInterviewContainer");

    fetch("data/interviews.json")
        .then(response => response.json())
        .then(videos => {

            const interviewContainer = document.createElement("div");
            interviewContainer.classList.add("videoFull-container");

            const interview = videos.find(video => video.id === videoId);

            const vidTitle = document.createElement("h1");
            vidTitle.textContent = interview.title;
            vidTitle.classList.add("title");

            const vidDate = document.createElement("h4");
            vidDate.textContent = interview.date;
            vidDate.classList.add("secondaryArticle-date");
            vidDate.style.marginLeft = "0px";
            
            const vidFrame = document.createElement("iframe");
            vidFrame.src = `https://www.youtube.com/embed/${interview.video}`;
            vidFrame.classList.add("videoList-playerFull");
            vidFrame.allowFullscreen = true;
            
            const vidContent = document.createElement("p");
            vidContent.textContent = interview.content;
            vidContent.classList.add("secondaryArticle-text");
            vidContent.style.marginLeft = "0px";
            
            interviewContainer.appendChild(vidTitle);
            interviewContainer.appendChild(vidDate);
            interviewContainer.appendChild(vidContent);
            interviewContainer.appendChild(vidFrame);

            fullInterviewContainer.appendChild(interviewContainer);
        })
        .catch(error => {
            console.error("Error fetching videos:", error);
        });
}

function getFilteredWorkList(region, remote, fulltime){
    const workListContainer = document.getElementById("workList");
    workListContainer.innerHTML = '';

    fetch("data/work.json")
        .then(response => response.json())
        .then(workList => {
            let filteredWork = workList;

            if(parseInt(region) !== 1){
                filteredWork = filteredWork.filter(work => (work.region === region));
            }
            if(remote){
                filteredWork = filteredWork.filter(work => (work.isRemote == true));
            }
            if(fulltime){
                filteredWork = filteredWork.filter(work => (work.isFullTime == true));
            }
            
            //stops function, if no listings are found with current filters
            if (filteredWork.length<1){
                const message = document.createElement("h1");
                message.textContent = "Sorry, no listing found";

                workListContainer.appendChild(message);

                return; 
            }

            filteredWork.forEach(work => {
                const workListingContainer = document.createElement("div");
                workListingContainer.classList.add("workListing-container");

                const contTop = document.createElement("div");
                contTop.classList.add("workListing-innerContainers");
                const contBottom = document.createElement("div");
                contBottom.classList.add("workListing-innerContainers");

                const workListingTitle = document.createElement("text");
                workListingTitle.textContent = work.title;
                workListingTitle.classList.add("workListing-title");
                contTop.appendChild(workListingTitle);
                
                const workListingRegion = document.createElement("text");
                workListingRegion.textContent = work.region;
                workListingRegion.classList.add("workListing-text");
                contTop.appendChild(workListingRegion);
                
                const workListingPay = document.createElement("text");
                workListingPay.textContent = "Pay: " + work.pay;
                workListingPay.classList.add("workListing-text");
                contTop.appendChild(workListingPay);
                
                const workListingDate = document.createElement("text");
                workListingDate.textContent = "Apply till: " + work.date;
                workListingDate.classList.add("workListing-text");
                contBottom.appendChild(workListingDate);
                
                const workListingRemote = document.createElement("text");
                workListingRemote.textContent = "Is remote: " + ((work.isRemote == true)?"Yes":"No");
                workListingRemote.classList.add("workListing-text");
                contBottom.appendChild(workListingRemote);
                
                const workListingTime = document.createElement("text");
                workListingTime.textContent = "Is full time: " + ((work.isFullTime == true)?"Yes":"No");
                workListingTime.classList.add("workListing-text");
                contBottom.appendChild(workListingTime);
                
                const workListingLink = document.createElement("a");
                workListingLink.href =`workListing.html?id=${work.id}`;
                

                workListingContainer.appendChild(contTop);
                workListingContainer.appendChild(contBottom);

                workListingLink.appendChild(workListingContainer)

                workListContainer.appendChild(workListingLink);
            });

        })
        .catch(error => {
            console.error("Error fetching work listings:", error);
        });
}

function loadFullWorkListing(){
    const params = new URLSearchParams(window.location.search);
    const workId = params.get("id");
    const workListing = document.getElementById("workListingContainer");

    fetch("data/work.json")
        .then(response => response.json())
        .then(work => {
            const listing = work.find(workListing => workListing.id === workId);

            const contTop = document.createElement("div");
            contTop.classList.add("workListing-innerContainers");
            const contBottom = document.createElement("div");
            contBottom.classList.add("workListing-innerContainers");

            const workListingTitle = document.createElement("text");
            workListingTitle.textContent = listing.title;
            workListingTitle.classList.add("workListing-title");
            contTop.appendChild(workListingTitle);
            
            const workListingRegion = document.createElement("text");
            workListingRegion.textContent = listing.region;
            workListingRegion.classList.add("workListing-text");
            contTop.appendChild(workListingRegion);
            
            const workListingPay = document.createElement("text");
            workListingPay.textContent = "Pay: " + listing.pay;
            workListingPay.classList.add("workListing-text");
            contTop.appendChild(workListingPay);
            
            const workListingDate = document.createElement("text");
            workListingDate.textContent = "Apply till: " + listing.date;
            workListingDate.classList.add("workListing-text");
            contBottom.appendChild(workListingDate);
            
            const workListingRemote = document.createElement("text");
            workListingRemote.textContent = "Is remote: " + ((listing.isRemote == true)?"Yes":"No");
            workListingRemote.classList.add("workListing-text");
            contBottom.appendChild(workListingRemote);
            
            const workListingTime = document.createElement("text");
            workListingTime.textContent = "Is full time: " + ((listing.isFullTime == true)?"Yes":"No");
            workListingTime.classList.add("workListing-text");
            contBottom.appendChild(workListingTime);

            const workListingContent = document.createElement("p");
            workListingContent.textContent = listing.content;

            const line = document.createElement("hr");
            
            workListing.appendChild(contTop);
            workListing.appendChild(contBottom);
            workListing.appendChild(line);
            workListing.appendChild(workListingContent);

        })
        .catch(error => {
            console.error("Error fetching work listing:", error);
        });
}

// Execute the scripts when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    loadFirstArticle();
    loadSecondaryArticles();
    loadNewestInterviews();
    loadNewestWorkListings();
    loadFullArticle();
    getFullInterview();
    loadFullWorkListing();
});