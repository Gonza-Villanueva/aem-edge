import { h } from '@dropins/tools/preact.js';
import { useEffect } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';

const html = htm.bind(h);

export const UserInfoForm = ({ props }) => {
  //   const { firstName, lastName, email, phone, dateOfBirth } = props.userInfo;

  return html`
    <div className="user-info-data-acount">
        <div className="user-info-data-acount__field">
            <div className="data">
                <label className="strong">Nombre:*</label>
                
            </div>
            <div className="line-divider"></div>
        </div>
        <div className="user-info-data-acount__field">
            <div className="data">
                <label className="strong">Correo electrónico:*</label>
                
            </div>
            <div className="line-divider"></div>
        </div>
        <div className="user-info-data-acount__field clickable" onClick=${() =>
          props.handleChangePasswordView()}>
            <div className='pasword-container'>
                <div className="data">
                    <label className="strong">Contraseña:</label>
                    <label>*****</label>
                </div>
                <img src="../../../icons/chevron-right.svg" />
            </div>
            <div className="line-divider"></div>
        </div className="user-info-data-acount__field">
        <div className="user-info-data-acount__field">
            <div className="data">
                <label className="strong">Fecha de nacimiento:*</label>
                <label>date</label>
            </div>
            <div className="line-divider"></div>
        </div>
        <div className="user-info-data-acount__field">
            <div className="data">
                <label className="strong">Teléfono móvil:*</label>
                <label>phone number</label>
            </div>
            <div className="line-divider"></div>
        </div>
        <div className="disclaimer">
        Tomamos medidas adicionales para proteger tus datos. * Para actualizar tu teléfono móvil, acércate a una tienda con un documento de identidad con fotografía. Para actualizar tu nombre o fecha de nacimiento, ponte en contacto con el Servicio de Atención al Cliente.
        </div>
    </div>
    
  `;
};
