document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('enlacesContainer');

  const select = document.createElement('select');
  select.id = 'enlaces';
  select.style.width = '100%';
  select.style.padding = '20px';
  select.style.fontSize = '20px';
  select.style.textAlign = 'center';
  select.onchange = function() { abrirEnlace(this); };

  const options = [
    { value: '', text: 'add repo', selected: true },
    { value: 'javascript:void(0);', text: 'Copy URL', onclick: 'copiarUrl()' },
    { value: 'scarlet://repo=https://qxangel.github.io/scarlet.json', text: 'Scarlet' },
    { value: 'esign://addsource?url=https://qxangel.github.io/repo.json', text: 'ESign' },
    { value: 'altstore://source?url=https://qxangel.github.io/repo.json', text: 'Altstore' },
    { value: '', text: '--------------------', disabled: true },
    { value: '', text: 'Support Me', disabled: true },
    { value: 'https://www.paypal.me/onlykex1', text: 'Donate', onclick: 'copiarUrl()' }, // Cambiado para copiar URL
    { value: 'https://www.instagram.com/6ky_l/', text: 'Instagram' },
    { value: 'https://github.com/QxAngel', text: 'Github' },
  ];

  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.text = option.text;
    if (option.selected) opt.selected = true;
    if (option.disabled) opt.disabled = true;
    select.appendChild(opt);
  });

  container.appendChild(select);
});

function abrirEnlace(select) {
  const url = select.value;
  if (url && url !== "javascript:void(0);") {
    redirectToApp(url);
    // Restablecer la selección a "add repo" para permitir una nueva selección
    select.selectedIndex = 0; 
  }
}

function copiarUrl() {
  const url = "https://qxangel.github.io/"; // URL que deseas copiar
  navigator.clipboard.writeText(url).then(() => {
    alert('URL copiada: ' + url);
  }).catch(err => {
    console.error('Error al copiar la URL: ', err);
    alert('No se pudo copiar la URL, por favor inténtalo manualmente.');
  });
}

function redirectToApp(link) {
  window.location.href = link; // Redirige a la URL proporcionada
}

function createCard(imageSrc, version, downloadURL, localizedDescription, appName, versionDate) {
  var card = document.createElement("div");
  card.className = "card mb-3";

  var cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  cardHeader.textContent = "AppName :  " + appName;
  card.appendChild(cardHeader);

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";

  var img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "Vista previa";
  img.style.maxWidth = "50%";
  img.style.borderRadius = "30px";
  cardBody.appendChild(img);

  var p = document.createElement("p");
  p.textContent = "Version :  " + version;
  cardBody.appendChild(p);

  var descriptionLabel = document.createElement("p");
  descriptionLabel.textContent = "Description :  " + localizedDescription;
  cardBody.appendChild(descriptionLabel);

  var dateLabel = document.createElement("p");
  dateLabel.textContent = "Upload date :  " + versionDate;
  cardBody.appendChild(dateLabel);

  var downloadButton = document.createElement("a");
  downloadButton.className = "btn btn-sm btn-primary mb-2";
  downloadButton.href = downloadURL;
  downloadButton.textContent = "Download iPA";
  downloadButton.addEventListener("click", function () {
      redirectToApp(downloadURL);
  });
  cardBody.appendChild(downloadButton);

  var scarletButton = document.createElement("button");
  scarletButton.className = "btn btn-sm btn-secondary mb-2";
  scarletButton.textContent = "Scarlet Direct";
  scarletButton.addEventListener("click", function () {
      redirectToApp("scarlet://install=" + downloadURL);
  });
  cardBody.appendChild(scarletButton);

  var trollStoreButton = document.createElement("button");
  trollStoreButton.className = "btn btn-sm btn-secondary mb-2";
  trollStoreButton.textContent = "TrollStore Direct";
  trollStoreButton.addEventListener("click", function () {
      redirectToApp("apple-magnifier://install?url=" + downloadURL);
  });
  cardBody.appendChild(trollStoreButton);

  card.appendChild(cardBody);

  return card;
}

window.onload = function () {
  var jsonFilePath = 'repo.json';

  fetch(jsonFilePath)
      .then(response => response.json())
      .then(data => {
          processJsonData(data);
      })
      .catch(error => {
          console.error('Error al cargar el archivo JSON:', error);
      });
};

function processJsonData(data) {
  var apps = data.apps;
  var cardsContainer = document.querySelector(".cards-container");

  apps.sort((a, b) => new Date(b.versionDate) - new Date(a.versionDate));

  apps.forEach(function (app) {
      var card = createCard(
          app.iconURL,
          app.version,
          app.downloadURL,
          app.localizedDescription,
          app.name,
          app.versionDate
      );

      cardsContainer.appendChild(card);
  });
}
