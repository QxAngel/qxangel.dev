document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('enlacesContainer');

  const select = document.createElement('select');
  select.id = 'enlaces';
  select.style.width = '100%';
  select.style.padding = '10px';
  select.style.fontSize = '16px';
  select.style.textAlign = 'center';
  select.onchange = function() { abrirEnlace(this); };

  const options = [
    { value: '', text: 'add repo', selected: true },
    { value: 'javascript:void(0);', text: 'Copy Page URL', onclick: 'copiarUrl()' },
    { value: 'scarlet://repo=https://qxangel.github.io/scarlet.json', text: 'Scarlet' },
    { value: 'esign://addsource?url=https://qxangel.github.io/repo.json', text: 'ESign' },
    { value: 'altstore://source?url=https://qxangel.github.io/repo.json', text: 'Altstore' },
    { value: '', text: '--------------------', disabled: true },
    { value: '', text: 'Support Me', disabled: true },
    { value: 'https://example.com/donate', text: 'Donate' },
    { value: 'https://example.com/patreon', text: 'Patreon' },
    { value: 'https://example.com/support', text: 'Support Page' },
  ];

  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.text = option.text;
    if (option.selected) opt.selected = true;
    if (option.disabled) opt.disabled = true;
    if (option.onclick) {
      opt.onclick = function() { copiarUrl(); };
    }
    select.appendChild(opt);
  });

  container.appendChild(select);
});

function abrirEnlace(select) {
  const url = select.value;
  if (url && url !== "javascript:void(0);") {
    window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
    select.selectedIndex = 0; // Vuelve a seleccionar "add repo"
  }
}

function copiarUrl() {
  const url = window.location.href; // Obtiene la URL de la página
  navigator.clipboard.writeText(url).then(() => {
    alert('URL copiada: ' + url);
    document.getElementById('enlaces').selectedIndex = 0; // Regresa a "add repo"
  });
}



function createCard(imageSrc, version, downloadURL, localizedDescription, appName, versionDate) {
    var card = document.createElement("div");
    card.className = "card mb-3" ;
    card.style.display = "flex";
    card.style.alignItems = "center";
    card.style.padding = "10px"; // Ajusta el padding

    var img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "Vista previa";
    img.style.maxWidth = "60px"; // Tamaño de la imagen
    img.style.borderRadius = "10px";
    img.style.marginRight = "10px"; // Espaciado a la derecha
    card.appendChild(img);

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    var appNameLabel = document.createElement("h5");
    appNameLabel.textContent = appName;
    cardBody.appendChild(appNameLabel);

    var versionLabel = document.createElement("p");
    versionLabel.textContent = "Version: " + version;
    cardBody.appendChild(versionLabel);

    var dateLabel = document.createElement("p");
    dateLabel.textContent = "Upload date: " + versionDate;
    cardBody.appendChild(dateLabel);

    var infoButton = document.createElement("button");
    infoButton.textContent = "ℹ️"; // Icono de información
    infoButton.style.marginLeft = "10px"; // Espaciado a la izquierda
    infoButton.addEventListener("click", function () {
        alert("Description: " + localizedDescription); // Aquí puedes abrir una ventana/modal
    });
    cardBody.appendChild(infoButton);

    card.appendChild(cardBody);

    var downloadButton = document.createElement("a");
    downloadButton.className = "btn btn-sm btn-primary mb-2";
    downloadButton.href = downloadURL;
    downloadButton.textContent = "Download iPA";
    downloadButton.addEventListener("click", function () {
        redirectToApp(downloadURL);
    });
    cardBody.appendChild(downloadButton);

    // Botones adicionales
    addAdditionalButtons(cardBody, downloadURL);

    return card;
}

function addAdditionalButtons(cardBody, downloadURL) {
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
}

// El resto de tu código permanece igual


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
