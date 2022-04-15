const elUserTemplate = document.querySelector(".users__template").content;
const elPostTemplate = document.querySelector(".posts__template").content;
const elUserList = document.querySelector(".users__list");
const elPostList = document.querySelector(".posts__list");


async function getUsers(){
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await response.json();
  console.log(data);


function renderUser(arr,element){
  element.innerHTML = "";

  arr.forEach(e => {
    
  const clonedTemplate = elUserTemplate.cloneNode(true);

  clonedTemplate.querySelector(".users__item").dataset.userId = e.id;
  clonedTemplate.querySelector(".users__name").textContent = e.username;
  clonedTemplate.querySelector(".users__title").textContent = e.name;
  clonedTemplate.querySelector(".users__id").textContent = e.id;
  clonedTemplate.querySelector(".users__address").textContent =e.address.street+" "+e.address.suite+" "+e.address.city+" "+e.address.zipcode;
  clonedTemplate.querySelector(".company__name").textContent = e.company.name;
  clonedTemplate.querySelector(".company__catchPhrase").textContent = e.company.catchPhrase;
  clonedTemplate.querySelector(".company__bs").textContent = e.company.bs;
  clonedTemplate.querySelector(".users__tel").textContent = e.phone;
  clonedTemplate.querySelector(".users__tel").setAttribute("href", `tel:${e.phone}`);

  clonedTemplate.querySelector(".users__loc").textContent = "GeoLocation";
  clonedTemplate.querySelector(".users__loc").setAttribute("href", `https://www.google.com/maps/place/${e.address.geo.lat},${e.address.geo.lng}`);

  clonedTemplate.querySelector(".users__website").textContent = e.website;
  clonedTemplate.querySelector(".users__website").setAttribute("href", `https://${e.website}`);

  clonedTemplate.querySelector(".users__mail").textContent = e.email;
  clonedTemplate.querySelector(".users__mail").setAttribute("href", `mailto:${e.email}`);


    if(data.isComplated){
      clonedTemplate.querySelector(".todo-list__check").checked = true;
    }
    element.appendChild(clonedTemplate);
  });
}
renderUser(data,elUserList);

}
getUsers();




elUserList.addEventListener("click" , evt =>{
  if (evt.target.matches(".users__item")) {
    let IdUser = evt.target.dataset.userId;
    // console.log(IdUser);

    async function getPost(){
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data = await response.json();
      // console.log(data);
    

      function renderPost(arr,element){
        element.innerHTML = "";
  
    
        arr.forEach(e => {
          // console.log(IdUser,e.userId);
          if(IdUser == e.userId - 0) {
        
          const clonedTemplate = elPostTemplate.cloneNode(true);

          clonedTemplate.querySelector(".posts__item").dataset.userId = e.id;
          clonedTemplate.querySelector(".posts__title").textContent = e.title;
          clonedTemplate.querySelector(".posts__text").textContent = e.body;
          // console.log(e.title);
          if(data.isComplated){
            clonedTemplate.querySelector(".todo-list__check").checked = true;
          }

        element.appendChild(clonedTemplate);
        }
        })
        
        
      }
      
  renderPost(data , elPostList);
  }
  
     
    getPost();
  }
});