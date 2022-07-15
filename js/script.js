let endOfThePage = 0;

let preloading = false;

let showPreloader = ()=>{
     let preloader = document.getElementById('preloader');
     preloader.style.display= 'block';
     preloader = true;
};

let hidePreloader = ()=>{
    let preloader = document.getElementById('preloader');
    preloader.style.display= 'none';
    preloader = false;
};

const getData = () => {

if(!preloading) {

    showPreloader();

    fetch("https://akademia108.pl/api/ajax/get-users.php")
    .then((res) => res.json())
    .then((data) => {  
      let body = document.body;
      let hr = document.createElement('hr');
      body.appendChild(hr);



      //dane, doklejane do strony (pobierane z data)
      for (let user of data) {
        let pId = document.createElement("p");
        let pName = document.createElement("p");
        let pWebsite = document.createElement("p");

        pId.innerText = `User Id: ${user.id}`;
        pName.innerText = `User Name: ${user.name}`;
        pWebsite.innerHTML = `User URL: ${user.website}<br/>-----------`;

        let body = document.body;

        body.appendChild(pId);
        body.appendChild(pName);
        body.appendChild(pWebsite);
      }

      hidePreloader();
    })

    .catch((error) => {
      console.error(error);
    });
}


  
};

const scrollToEndOfPage = () => {
  let doc = document.documentElement;

  //height of en Element's content, including content, not visible on the screen

  let scrollHeight = doc.scrollHeight;

  //Number of pixels, Element's content is scrolled vertically

  let scrollTop = doc.scrollTop;

  //Inner height of Element in pixels
  let clientHeight = doc.clientHeight;

  let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

  console.log(`scrollHeight: ${scrollHeight}`);
  console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);

  console.log(`scrollTop: ${scrollTop}`);
  console.log(`clientHeight: ${clientHeight}`);
  console.log(`==============================`);

  //Gdy scrollHeight >= sumScrollTopClientHeight - to znaczy doskrolowaliśmy do końca strony

  if (sumScrollTopClientHeight >= scrollHeight) {
    endOfThePage += 1;

    
    //doklejanie danych do strony infinit scrollem 
    getData();
  }
};

window.addEventListener("scroll", scrollToEndOfPage);
