/* global gigya */

function getAccountInfoResponse(response) {
  if (response.errorCode === 0) { // Uso de triple igual para comparar
    const { profile } = response; // Desestructuración
    const msg = `${profile.firstName} is ${profile.age} years old`;
    console.log(msg);
  } else {
    console.error(`Error: ${response.errorMessage}`);
  }
}

function initializeGigya(container) {
  window.gigyaConf = {
    onGigyaServiceReady() {
      if (typeof gigya === 'undefined') {
        console.error('Gigya is not defined');
        return;
      }

      gigya.accounts.addEventHandlers({
        onLogin(r) {
          console.log('User is logged in', r);
          gigya.accounts.getAccountInfo({ callback: getAccountInfoResponse });
        },
        onLogout(r) {
          console.log('User is logged out', r);
          gigya.accounts.showScreenSet({
            screenSet: 'Default-LiteRegistration',
            containerID: container.id,
          });
        },
      });

      gigya.accounts.session.verify({
        callback(response) {
          if (response.errorCode === 0) {
            gigya.accounts.showScreenSet({
              screenSet: 'Default-ProfileUpdate',
              containerID: container.id,
            });
          } else {
            gigya.accounts.showScreenSet({
              screenSet: 'Default-RegistrationLogin',
              containerID: container.id,
            });
          }
        },
      });
    },
  };

  const gigyaScript = document.createElement('script');
  gigyaScript.src = 'https://cdns.gigya.com/js/gigya.js?apikey=4_VdOdUO1BkYX2CMMdGd8LhA';
  gigyaScript.onload = () => {
    if (typeof gigya !== 'undefined' && window.gigyaConf.onGigyaServiceReady) {
      window.gigyaConf.onGigyaServiceReady();
    }
  };
  document.head.appendChild(gigyaScript);
}

export default async function decorate(block) {
  // Limpiamos el contenido existente
  block.innerHTML = '';

  // ======================================================
  // 1. Creamos el overlay con la integración de Gigya
  // ======================================================
  const overlay = document.createElement('div');
  overlay.classList.add('ulta-beauty-register-cdc-overlay');
  overlay.style.display = 'none'; // Oculto por defecto

  const panel = document.createElement('div');
  panel.classList.add('ulta-beauty-register-cdc-panel');

  const panelHeader = document.createElement('div');
  panelHeader.classList.add('ulta-beauty-register-cdc-header');

  const closeButton = document.createElement('button');
  closeButton.classList.add('ulta-beauty-register-cdc-close');
  closeButton.type = 'button';
  closeButton.innerHTML = '<img src="../../icons/X.svg" alt="Cerrar" />';

  // Armamos la estructura del overlay
  panelHeader.appendChild(closeButton);
  panel.appendChild(panelHeader);

  // Contenedor para Gigya
  const container = document.createElement('div');
  container.id = 'ulta-beauty-register-cdc-container';
  panel.appendChild(container);

  overlay.appendChild(panel);
  // Lo agregamos al final del bloque
  block.appendChild(overlay);

  // ======================================================
  // 2. Inyectamos el HTML del header
  // ======================================================
  const headerHTML = `
    <!-- Barra superior (full-width) -->
    <div class="ulta-header-topbar">
      <div class="ulta-header-topbar-inner">
        <div class="ulta-header-topbar-shipping">
          <span>Envío gratuito en órdenes mayores a MXN$600</span>
        </div>
        <div class="ulta-header-topbar-links">
          <ul>
            <li><a href="#">Iniciar sesión</a></li>
            <li><a href="#">Registrarse</a></li>
            <li><a href="#">Rastrea una orden</a></li>
            <li><a href="#">Encuentra una tienda</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Contenedor interno (máximo 1360px) para el resto del header -->
    <div class="ulta-header-inner">
      <div class="ulta-header-main">
        <!-- Logo -->
        <div class="ulta-header-logo">
          <a href="#">
            <img src="../../icons/Logodesktop.svg" alt="Ulta Beauty Logo" />
          </a>
        </div>

        <!-- Navegación principal -->
        <nav class="ulta-header-nav">
          <ul>
            <li><a href="#">Categorías</a></li>
            <li><a href="#">Novedades</a></li>
            <li><a href="#">Marcas</a></li>
            <li><a href="#">Promociones</a></li>
            <li><a href="#">Orgullosamente mexicano</a></li>
          </ul>
        </nav>

        <!-- Buscador -->
        <div class="ulta-header-search">
          <input type="text" placeholder="Buscar productos y más" aria-label="Buscar productos" />
          <button type="button" aria-label="Buscar">
            <img src="../../icons/Search--Streamline-Streamline--3.0.svg" alt="Icono de búsqueda" />
          </button>
        </div>

        <!-- Íconos (favoritos, cuenta, bolsa) -->
        <div class="ulta-header-icons">
          <a href="#" class="ulta-header-icon" aria-label="Favoritos">
            <img src="../../icons/Grupo200284.svg" alt="Ícono de favoritos" />
          </a>
          <a href="#" class="ulta-header-icon" aria-label="Bolsa de compras">
            <img src="../../icons/bag.svg" alt="Ícono de bolsa de compras" />
          </a>
          <a href="#" class="ulta-header-icon" aria-label="Mi cuenta">
            <img src="../../icons/Grupo201637.svg" alt="Ícono de cuenta" />
          </a>
        </div>
      </div>
    </div>
  `;
  // Insertamos el header al inicio del bloque
  block.insertAdjacentHTML('afterbegin', headerHTML);

  // ======================================================
  // 3. Eventos para mostrar/ocultar el overlay
  // ======================================================
  // Al dar click en el ícono "Mi cuenta" se muestra el overlay
  const accountButton = block.querySelector('.ulta-header-icon[aria-label="Mi cuenta"]');
  if (accountButton) {
    accountButton.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.style.display = 'block';
    });
  }

  // Al dar click en el botón de cerrar se oculta el overlay
  closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  // ======================================================
  // 4. Inicializamos Gigya en el contenedor correspondiente
  // ======================================================
  initializeGigya(container);
}
