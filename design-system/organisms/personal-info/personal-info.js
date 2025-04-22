import { h } from '@dropins/tools/preact.js';
import htm from '../../../scripts/htm.js';
import { useEffect, useState } from '@dropins/tools/preact-hooks.js';
import gigyaClient from '../../../scripts/gigya/user.js';
import { ChangePasswordModal } from './change-password-modal.js';
import { CustomButton } from '../../atoms/customButton/CustomButton.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const PersonalInfo = ({ props }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(gigyaClient.isUserLogged.value);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    gigyaClient.isUserLogged.subscribe((newValue) => {
      setIsLogged(newValue);
    });
    gigyaClient.checkGigyaSession();
  }, []);

  useEffect(() => {
    if (isLogged) {
      gigyaClient.getGigyaUserData().then((result) => {
        if (result.logged) {
          setUserInfo(result.profile);
        } else {
          setUserInfo({});
        }
      });
    }
  }, [isLogged]);

  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/organisms/personal-info/personal-info.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  const getDateOfBirth = (age, birthYear) => {};

  const handleEditClick = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };

  // todo convertirlo a place holder
  return html`
    <div className="${['personal-info-wrapper'].join(' ')}">
      <h4>Información de mi cuenta</h4>
      ${userInfo &&
      html`
           <div className="personal-info-content-wrapper">
        <div className="personal-info-data">
          <label><span className="strong">Nombre: </span>${
            userInfo.firstName
          } ${userInfo.lastName}</label>
          <label
            ><span className="strong">Correo: </span>${userInfo.email}</label
          >
          <label><span className="strong">Contraseña: </span>******</label>
          <label
          getDateOfBirth
            ><span className="strong">Fecha de nacimiento: </span> ${getDateOfBirth(
              userInfo.age,
              userInfo.birthYear
            )}</label
          >
          ${
            userInfo.cellphone &&
            html`
              <label>
                <span className="strong">Teléfono móvil: </span
                >${userInfo.cellphone}
              </label>
            `
          }
        </div>
        <div className='button-wrapper'>
        <${CustomButton} size='small' onClick=${() =>
        handleEditClick()}  variant="tertiary">
               EDITAR
               </${CustomButton}>
        </div>
      </div>
        `}
      <div className="line-divider"></div>
      <${ChangePasswordModal}
        isOpen=${modalOpen}
        onClose=${() => {
          closeModal();
        }}
        userInfo=${userInfo}
      />
    </div>
  `;
};
export default PersonalInfo;
