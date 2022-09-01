"use strict"

document.addEventListener('DOMContentLoaded', () => {

  async function getWorkers() {
    let url = 'http://localhost:3000/workers';
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  // workers 
  async function showWorkers() {
    let workers = await getWorkers();
    let wrapperWorker = '';
    workers.forEach((worker, id) => {
      let workerSegment = '';

      if (id < 1) {
        workerSegment += `<div class="carousel-item active ">
          <img src="${worker.img}"
              class="img-fluid team-image" alt="">
  
          <div class="team-thumb bg-warning">
              <h3 class="text-white mb-0">${worker.fullname}</h3>
  
              <p class="text-secondary-white-color mb-0">${worker.jobtitle}</p>
          </div>
      </div>`;
      } else {
        workerSegment += `<div class="carousel-item">
          <img src="${worker.img}"
              class="img-fluid team-image" alt="">
  
          <div class="team-thumb bg-warning">
              <h3 class="text-white mb-0">${worker.fullname}</h3>
  
              <p class="text-secondary-white-color mb-0">${worker.jobtitle}</p>
          </div>
      </div>`;
      }

      wrapperWorker += workerSegment;
    });

    let container = document.querySelector('.carousel-inner');
    container.innerHTML = wrapperWorker;
  }
  showWorkers();

  // portfolios

  async function getPortfolios() {
    let url = 'http://localhost:3000/portfolios';
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function renderPortfolio() {
    let portfolio = await getPortfolios();

    const linkImgs = document.querySelectorAll('[data-portfolio-a]'),
      imgs = document.querySelectorAll('[data-portfolio-img]'),
      titles = document.querySelectorAll('[data-portfolio-title]'),
      types = document.querySelectorAll('[data-portfolio-type]');
    let visibleData = portfolio.slice((portfolio.length - 4), portfolio.length).reverse();

    visibleData.forEach((data, id) => {
      linkImgs[id].href = data.img
      imgs[id].src = data.img
      titles[id].textContent = data.projectname
      types[id].textContent = data.direction
    })




  }
  renderPortfolio();

  // news

  async function getNews() {
    let url = 'http://localhost:3000/news';
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }



  const newsClicks = document.querySelectorAll('[data-news]');
  const btnCloseModal = document.querySelector('#news-modal__close-btn');
  const modal = document.querySelector('.news-modal');
  const main = document.querySelector('#main');

  async function showNews() {
    let newsData = await getNews();

    let latestNewsDate = newsDataSeparation(newsData, 'latestNews');
    let eventsDate = newsDataSeparation(newsData, 'events');
    let oldNewsDate = newsDataSeparation(newsData, 'oldNews');


    latestNewsDate.forEach(item => {
      document.querySelector('[data-news-img=latestNews]').src = item.img;
      document.querySelector('[data-news-title=latestNews]').textContent = item.title;
      document.querySelector('[data-news-date=latestNews]').textContent = item.date;
    })
    eventsDate.forEach(item => {
      document.querySelector('[data-news-img=events]').src = item.img;
      document.querySelector('[data-news-title=events]').textContent = item.title;
      document.querySelector('[data-news-date=events]').textContent = item.date;
    })
    oldNewsDate.forEach(item => {
      document.querySelector('[data-news-img=oldNews]').src = item.img;
      document.querySelector('[data-news-title=oldNews]').textContent = item.title;
      document.querySelector('[data-news-date=oldNews]').textContent = item.date;
    })

  }
  showNews()

  async function newsModalShow(num) {
    let newsData = await getNews();
    let newsBody = document.querySelector('.news-detail-body');
    let modalNewsData = newsDataSeparation(newsData, num);



    modalNewsData.forEach(item => {
      let modalTop = `<h1 class="news-detail-title text-white mt-lg-5 mb-lg-4" data-aos="zoom-in" data-aos-delay="300">${item.title}</h1>`;
      let modalTopImg = `<img src="${item.img}" class="img-fluid news-detail-image" alt="">`;
      modal.querySelector('.heroText').innerHTML = modalTop;
      modal.querySelector('.videoWrapper').innerHTML = modalTopImg;
      let modalChildren = `
            <h2 class="mb-3" data-aos="fade-up">${item.title}</h2>
            <p class="me-4" data-aos="fade-up">${item.post1}</p>
            <p data-aos="fade-up">${item.post2}</p>
            <div class="clearfix my-4 mt-lg-0 mt-5">
                <div class="col-md-6 float-md-end mb-3 ms-md-3" data-aos="fade-up">
                    <figure class="figure">
                        <img src="${item.smollimg}"
                            class="img-fluid news-image" alt="">
                        <figcaption class="figure-caption text-end">A caption for the above image.
                        </figcaption>
                    </figure>
                </div>
                <p data-aos="fade-up">${item.post3}</p>
                <p data-aos="fade-up">${item.post4}</p>
                <p data-aos="fade-up">${item.post5}</p>
            </div>
            <div class="social-share d-flex mt-5">
                <span class="me-4" data-aos="zoom-in">Share this article:</span>
                <a href="" class="social-share-icon bi-facebook" data-aos="zoom-in"></a>
                <a href="" class="social-share-icon bi-twitter mx-3" data-aos="zoom-in"></a>
                <a href="" class="social-share-icon bi-envelope" data-aos="zoom-in"></a>
            </div>`;
      newsBody.innerHTML = modalChildren;
    })

  }

  function newsDataSeparation(data, news) {
    return data[news].slice((data[news].length - 1), data[news].length);

  }

  btnCloseModal.addEventListener('click', () => {
    modal.classList.remove('display-block');
    modal.classList.add('display-none');
    main.classList.remove('display-none');
    main.classList.add('display-block');
    window.scrollTo(0, 3500);
  });

  newsClicks.forEach((item) => {
    item.addEventListener('click', () => {
      window.scrollTo(0, 0);
      modal.classList.remove('display-none');
      modal.classList.add('display-block');
      main.classList.remove('display-block');
      main.classList.add('display-none');
      newsModalShow(item.getAttribute("data-news"));
    })
  })

})