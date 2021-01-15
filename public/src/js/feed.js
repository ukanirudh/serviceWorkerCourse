var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedMomentsArea = document.querySelector('#shared-moments');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);
        if(choiceResult.outcome === 'dismissed') {
          console.log('user cancelled installation');
        } else {
          console.log('user added to homescreen');
        }
      deferredPrompt = null;
    })
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

/* Currently not in use */
// const onSaveBtnClick = (event) => {
//     console.log('onSaveBtnClick', event);
//     if ( 'caches' in window ) {
//         caches.open('user-requested')
//             .then((openedCache) => {
//                 openedCache.add('https://httpbin.org/get');
//                 openedCache.add('/src/images/sf-boat.jpg');
//             })
//     }
// }

function createCard() {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
    const cardTitle = document.createElement('div');
    cardTitle.className = 'mdl-card__title';
    cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
    cardTitle.style.backgroundSize = 'cover';
    cardTitle.style.height = '180px';
    cardWrapper.appendChild(cardTitle);
    const cardTitleTextElement = document.createElement('h2');
    cardTitleTextElement.style.color = 'white';
    cardTitleTextElement.className = 'mdl-card__title-text';
    cardTitleTextElement.textContent = 'San Francisco Trip';
    cardTitle.appendChild(cardTitleTextElement);
    const cardSupportingText = document.createElement('div');
    cardSupportingText.className = 'mdl-card__supporting-text';
    cardSupportingText.textContent = 'In San Francisco';
    cardSupportingText.style.textAlign = 'center';

    /* Just an example */
    // const cardSaveBtn = document.createElement('button');
    // cardSaveBtn.textContent = 'Save';
    // cardSaveBtn.addEventListener('click', onSaveBtnClick);
    // cardSupportingText.appendChild(cardSaveBtn);

    cardWrapper.appendChild(cardSupportingText);
    componentHandler.upgradeElement(cardWrapper);
    sharedMomentsArea.appendChild(cardWrapper);
}


fetch('https://httpbin.org/get')
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        createCard();
    });
