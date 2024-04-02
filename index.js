import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  query,
  get,
  orderByChild,
  equalTo,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://insiread-1e175-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings); //connect to DB
const database = getDatabase(app); // get DB data
const bookList = ref(database, "bookList"); //thumbnail DB source
const chapterList = ref(database, "chapterList"); //chpater DB source
const textList = ref(database, "textList");

const inputFieldEl = document.getElementById("input-field");
const searchButtonEl = document.getElementById("search-button");
const homeButton = document.getElementById("home-Button");
const chapterListEl = document.getElementById("chapter-List");
const thumbnailContainerEl = document.getElementById("book-list");
const contentListEl = document.getElementById("content-List");
const menuButtonEL = document.getElementById("menu-Button")
const closemenuButtonEl = document.getElementById("menu-close")
const sideMenuEl = document.getElementById("side-menu")

menuButtonEL.addEventListener("click", () => {
  sideMenuEl.classList.remove("shrink")
  sideMenuEl.classList.add("grow")
})

closemenuButtonEl.addEventListener("click", () => {
  sideMenuEl.classList.remove("grow")
  sideMenuEl.classList.add("shrink")
})


ListBooks(); // Load DefaultDB

homeButton.addEventListener("click", () => {
  //Homebutton function
  clearInnerHtml();
  ListBooks();
  inputFieldEl.value = "";
  inputFieldEl.disabled = false;
  inputFieldEl.style.backgroundColor = "white";
});

searchButtonEl.addEventListener("click", () => {
  thumbnailContainerEl.innerHTML = "";
  onValue(ref(database, `bookList/${inputFieldEl.value}`), function (snapshot) {
    //All the Books added to DB
    if (inputFieldEl.value !== "") {
      if (snapshot.exists()) {
        let itemTitle = Object.values(snapshot.val()).join("");
        appendPictureTothumbnailContainerEl([inputFieldEl.value,itemTitle]);
      } else {
        thumbnailContainerEl.innerHTML = "No books have been found";
      }
    } else {
      ListBooks();
    }
  });
});

function ListBooks() {
  clearInnerHtml();

  onValue(bookList, function (snapshot) {
    //All the Books added to DB
    clearInnerHtml();
    if (snapshot.exists()) {
      let itemsArray = Object.entries(snapshot.val());
      thumbnailContainerEl.innerHTML = "";

      for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i];
        appendPictureTothumbnailContainerEl(currentItem);
      }
    } else {
      thumbnailContainerEl.innerHTML = "No books have been found";
    }
  });
}

function ListChapters(bookID) {
  //function to load Details on click
  clearInnerHtml();
  inputFieldEl.disabled = true;
  inputFieldEl.style.backgroundColor = "#A0A0A0";

  onValue(chapterList, function (snapshot) {
    clearInnerHtml();
    if (snapshot.exists()) {
      let itemsArray = Object.entries(snapshot.val());
      thumbnailContainerEl.innerHTML = "";

      for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i];
        if (currentItem[0] === bookID) {
          appendArrayToThumbnailContainerEl(currentItem, bookID);
        } else {
        }
      }
    } else {
      thumbnailContainerEl.innerHTML = "No Chapter have been found";
    }
  });
}

function ListText(chapterNumber, bookID) {
  clearInnerHtml();
  onValue(
    ref(database, `textList/${bookID}/${chapterNumber}/`),
    function (snapshot) {
      clearInnerHtml();
        if (snapshot.exists()) {
        
      //All the Books added to DB
      let itemsArray = Object.entries(snapshot.val());
      let itemsText = Object.values(snapshot.val())
      thumbnailContainerEl.innerHTML = "";

      let newbuttongroup2 = document.createElement("div");
      contentListEl.append(newbuttongroup2);
      let newButton4 = document.createElement("button");
      let newButton5 = document.createElement("button");
      let newButton6 = document.createElement("button");
      newbuttongroup2.className = "ButtonGroup2";
      newButton4.className = "ChapterButton4";
      newButton5.className = "ChapterButton5";
      newButton6.className = "ChapterButton6";
      newButton4.innerText = "↤";
      newButton5.innerText = "🕮";
      newButton6.innerText = "↦";
      newbuttongroup2.append(newButton4);
      newbuttongroup2.append(newButton5);
      newbuttongroup2.append(newButton6);
      newButton4.addEventListener("click", () => {
        let nextChapter = chapterNumber - 1;
        clearInnerHtml();
        scrollToTop();
        ListText(nextChapter, bookID);
      });
      newButton5.addEventListener("click", () => {
        ListChapters(bookID);
      });
      newButton6.addEventListener("click", () => {
        let nextChapter = chapterNumber + 1;
        clearInnerHtml();
        scrollToTop();
        ListText(nextChapter, bookID);
      })

      //check if https=Manga or nohttps=Novel

      let containsHttps = false;
      for (let i = 0; i < itemsArray.length; i++) {
          if (itemsArray[i][1].startsWith("http") || itemsArray[i][1].includes("http")) {
              containsHttps = true;
              // Call function if "https" is found
              for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i];
                renderReadingImages(currentItem)
              }
              break; // Stop iterating if "https" is found
          }
      }
      if (!containsHttps) {
          // Call another function if "https" is not found
          appendStringToThumbnailContainerEl(itemsText)
      }
      
      let newbuttongroup = document.createElement("div");
      contentListEl.append(newbuttongroup);
      let newButton1 = document.createElement("button");
      let newButton2 = document.createElement("button");
      let newButton3 = document.createElement("button");
      newbuttongroup.className = "ButtonGroup";
      newButton1.className = "ChapterButton1";
      newButton2.className = "ChapterButton2";
      newButton3.className = "ChapterButton3";
      newButton1.innerText = "↤";
      newButton2.innerText = "🕮";
      newButton3.innerText = "↦";
      newbuttongroup.append(newButton1);
      newbuttongroup.append(newButton2);
      newbuttongroup.append(newButton3);
      newButton1.addEventListener("click", () => {
        let nextChapter = chapterNumber - 1;
        clearInnerHtml();
        scrollToTop();
        ListText(nextChapter, bookID);
      });
      newButton2.addEventListener("click", () => {
        ListChapters(bookID);
      });
      newButton3.addEventListener("click", () => {
        let nextChapter = chapterNumber + 1;
        clearInnerHtml();
        scrollToTop();
        ListText(nextChapter, bookID);
      });
    } else {
        thumbnailContainerEl.innerHTML = "No Chapter Found"
    }
    }
  );
}

function appendPictureTothumbnailContainerEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newImg = document.createElement("img");

  newImg.src = itemValue;
  newImg.title = itemID;
  newImg.className = "content-Image";
  newImg.addEventListener("click", () => {
    //  let exactLocationOfItemInDB = ref(database, `bookList/${itemID}`) to delete/add
    ListChapters(itemID);
    inputFieldEl.value = itemID;
  });

  thumbnailContainerEl.append(newImg);
}

function appendArrayToThumbnailContainerEl(item, bookID) {
  let arrayID = item[0]; //ID for further usage
  let arrayDB = item[1]; //Array from Firebase

  for (let i = 0; i < arrayDB.length; i++) {
    let newLI = document.createElement("li");
    newLI.textContent = "Chapter " + arrayDB[(0, i)];
    newLI.className = "list-Element";
    newLI.addEventListener("click", function () {
      ListText(arrayDB[i], bookID);
    });
    chapterListEl.append(newLI);
  }
}

function renderReadingImages(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newImg = document.createElement("img");

  newImg.src = itemValue;
  newImg.title = itemID;
  newImg.className = "reading-Image";
  newImg.addEventListener("click", () => {
    //  let exactLocationOfItemInDB = ref(database, `bookList/${itemID}`) to delete/add
  });
  contentListEl.append(newImg);
}

function clearInnerHtml() {
  chapterListEl.innerHTML = "";
  thumbnailContainerEl.innerHTML = "";
  contentListEl.innerHTML = "";
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function appendStringToThumbnailContainerEl(item) {
  let itemID = item[0]
  let itemString = item.join("")
  let newString = document.createElement("p")
 
  newString.className = "chapter-Text"
  newString.innerHTML += itemString
  contentListEl.append(newString)
}
