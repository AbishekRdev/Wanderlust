let originalOrder = [];

const initializeListings = () => {
  const items = document.querySelectorAll(".Sitem");
  for (let item of items) {
    originalOrder.push(item);
  }
};

const Search = () => {
  const matchingItems = [];
  const nonMatchingItems = [];

  // Correctly get the search query value
  const searchQuery = document.querySelector("#search").value.toLowerCase();
  const items = document.querySelectorAll(".Sitem");

  // If the search query is empty, restore the original order
  if (searchQuery === '') {
    restoreOriginalOrder();
    return;
  }

  for (let item of items) {
    const match = item.querySelector(".Scard-title").textContent.toLowerCase();
    if (match.includes(searchQuery)) {
      matchingItems.push(item);
    } else {
      nonMatchingItems.push(item);
    }
  }

  const container = document.querySelector(".listing-container");
  container.innerHTML = ''; // Clear the existing container

  // Append matching items first, then non-matching items
  matchingItems.forEach(item => {
    container.appendChild(item);
  });

  
  nonMatchingItems.forEach(item => {

   
    // container.appendChild(item);
    item.computedStyleMap.display="none";
  });


  if(matchingItems.length===0){
   let h3=document.createElement("h3");
   h3.innerText="No Listing Found";
   container.appendChild(h3);


  };

};

const restoreOriginalOrder = () => {
  const container = document.querySelector('.listing-container');
  container.innerHTML = ''; // Clear the existing container

  // Append the original order of items
  originalOrder.forEach(item => {
    container.appendChild(item);
  });
};

window.onload = initializeListings;
