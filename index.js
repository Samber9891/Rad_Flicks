const url = "http://localhost:8080/api/posts";
const postsDiv = document.getElementById("posts"); 



function getAllBlogPosts() {
    axios
      .get(url)
      .then(function (response) {
        data = response.data;
        createBlogPostView(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

function deleteBlogPost(id) {
    console.log(id);

    axios
    .delete(`${url}/${id}`)
    .then(
        (response) => {
          console.log(response);
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      )
}

const makePostRequest = () => {
    const image = document.getElementById("formImage").value;
    const title = document.getElementById("formTitle").value;
    const genre = document.getElementById("formGenre").value; 
    const blogEntry = document.getElementById("formBlogEntry").value;
  
    const blogPost = {
      image,
      title,
      genre,
      blogEntry,
    };
  
    console.log(blogPost)
    axios
      .post(url, blogPost)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };



function createBlogPostView(blogPosts) {

    blogPosts.forEach((blogPost) => {

        let imgElement = document.createElement("img"); 
        imgElement.src = blogPost.image;
        
    
        let title = document.createTextNode(blogPost.title);
        let titleElement = document.createElement("h5");
        titleElement.classList.add("card-title"); 
        titleElement.appendChild(title); 
    
        let genre = document.createTextNode(blogPost.genre);
        let genreElement = document.createElement("div");
        genreElement.classList.add("card-subtitle"); 
        genreElement.classList.add("mb-2"); 
        genreElement.classList.add("text-muted"); 
        genreElement.appendChild(genre); 
    
        let blogEntry = document.createTextNode(blogPost.blogEntry);
        let blogEntryElement = document.createElement("div");
        blogEntryElement.classList.add("card-body");
        blogEntryElement.appendChild(blogEntry);
        
        let deleteButtonElement = document.createElement("button")
        deleteButtonElement.innerHTML = `<button class="btn btn-danger" onclick="deleteBlogPost(${blogPost.id})"/>`
    
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
    
        let cardBodyElement = document.createElement("div");
        cardBodyElement.classList.add("card-body");
    
        cardBodyElement.appendChild(titleElement);
        cardBodyElement.appendChild(genreElement);
        cardBodyElement.appendChild(blogEntryElement);
       
    
        cardElement.appendChild(imgElement);
        cardElement.appendChild(cardBodyElement); 
        cardElement.appendChild(deleteButtonElement); 
        cardElement.classList.add("mt-5"); 
    
        postsDiv.appendChild(cardElement); 

    });
 
}

getAllBlogPosts(); 