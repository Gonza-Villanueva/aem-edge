import { h } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';
import { useEffect } from '@dropins/tools/preact-hooks.js';
import { CustomButton } from '../../atoms/customButton/CustomButton.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

const addresses = [
  {
    name: 'Ana Rodríguez',
    address: 'Calle de la Reforma 123, Colonia Centro',
    location: 'Ciudad de México, CDMX, C.P. 06000',
    cel: '55 1234 5678',
    isMainOption: true,
  },
  {
    name: 'Ana Rodríguez',
    address: 'Calle de la Reforma 123, Colonia Centro',
    location: 'Ciudad de México, CDMX, C.P. 06000',
    cel: '55 1234 5678',
    isMainOption: false,
  },
];

export const MyAddresses = ({ props }) => {
  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/organisms/my-addresses/my-addresses.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  const handleClick = () => {};
  return html`
    <div className="${['my-addresses-wrapper'].join(' ')}">
      <h4>Mis direcciones</h4>
      <div className="address-list-wrapper">
        ${addresses.map((address) => {
          return html`
            <div className="address-wrapper">
              <div className="wrapper">
                <div className="content">
                  <div className="mainContent">
                    <label
                      ><span className="strong">${address.name} </span></label
                    >
                    <label>${address.address}</label>
                    <label>${address.location}</label>
                  </div>
                  <label>${address.cel}</label>
                  ${address.isMainOption &&
                  html`
                    <label className="mainOption">
                      Dirección principal de envío
                    </label>
                  `}
                </div>
                ${!address.isMainOption &&
                html`
                  <div className="buttons">
                    <${CustomButton} size="s" variant="tertiary">ELIMINAR<//>
                    <${CustomButton} size="s" variant="tertiary">EDITAR<//>
                  </div>
                `}
              </div>

              <div className="line-divider"></div>
            </div>
            <div></div>
          `;
        })}
      </div>
    </div>
  `;
};
export default MyAddresses;
