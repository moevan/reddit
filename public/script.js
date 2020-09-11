// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// define variables that reference elements on our page
const dataDisplayer = document.getElementById("dataDisplayer");
const loadPostForm = document.querySelector("form");
const loading = document.getElementById("loading");

// listen for the form to be submitted and add a new dream when it is
loadPostForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loading.innerText = "loading...";
  const dayInput =  new Date(document.getElementById("dayInput").value).getTime()/1000;
  const subredditInput = document.getElementById("subredditInput").value;

  fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dayInput, subredditInput }),
  }).then((res) => {
    
    res.json().then((dreams) =>
      dreams.forEach((post) => {
        
       let node = document.createElement("li");
       node.className = 'item';
        node.innerHTML =  `<a href="https://reddit.com${post.data.permalink}"><img src="${post.data.thumbnail}"/></a>` ;
        dataDisplayer.appendChild(node);
        loading.innerText = "";
      })
    );
  });
});
