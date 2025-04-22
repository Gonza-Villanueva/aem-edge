import { h, render } from '@dropins/tools/preact.js';
import { useEffect, useRef, useState } from '@dropins/tools/preact-hooks.js';
import createModal from '../../atoms/customModal/customModal.js';
import htm from '../../../scripts/htm.js';
import { UserInfoForm } from './user-info-form.js';
import gigyaClient from '../../../scripts/gigya/user.js';

const html = htm.bind(h);

export const ChangePasswordModal = ({ isOpen, onClose, userInfo }) => {
  const [modal, setModal] = useState();
  const [modeChangePasswordModal, setModeChangePasswordModal] =
    useState('info');

  const handleChangePasswordView = () => {
    setModeChangePasswordModal('password');
  };

  useEffect(() => {
    if (modal) {
      return;
    }
    const container = document.createElement('div');
    const CONTAINER_ID = 'change-pw-modal-container';
    container.id = CONTAINER_ID;
    document.body.appendChild(container);

    render(
      html`
        <div id="change-password-modal" class="change-password-modal">
          <div id="user-info-form" className="isHidden">
            <${UserInfoForm}
              props=${{
                userInfo,
                handleChangePasswordView,
              }}
            />
          </div>
          <div
            id="ulta-beauty-change-password-cdc-container"
            className="isHidden"
          ></div>
        </div>
      `,
      container
    );
    createModal([container], 'slide', 'right').then((modal) => {
      const dialogEl = modal.block.querySelector('dialog');
      dialogEl.addEventListener('close', () => {
        setModeChangePasswordModal('info');
        onClose();
      });

      setModal(modal);
    });
  }, []);

  useEffect(() => {
    if (modal && isOpen) {
      modal.showModal();
    }
  }, [modal, isOpen]);

  useEffect(() => {
    gigyaClient
      .showGigyaView('ulta-beauty-change-password-cdc-container', {
        screenSet: 'Default-LiteRegistration',
        startScreen: 'gigya-change-password-screen',
      })
      .catch((error) =>
        console.error('Error al renderizar la vista Gigya:', error)
      );
  }, [modal]);

  useEffect(() => {
    if (!modal) return;
    const infoEl = document.getElementById('user-info-form');
    const pwdEl = document.getElementById(
      'ulta-beauty-change-password-cdc-container'
    );

    if (modeChangePasswordModal === 'info') {
      infoEl.classList.remove('isHidden');
      pwdEl.classList.add('isHidden');
    } else {
      infoEl.classList.add('isHidden');
      pwdEl.classList.remove('isHidden');

      gigyaClient
        .showGigyaView('ulta-beauty-change-password-cdc-container', {
          screenSet: 'Default-LiteRegistration',
          startScreen: 'gigya-change-password-screen',
        })
        .catch(console.error);
    }
  }, [modeChangePasswordModal, modal]);
};
