// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useState, useCallback } from '@dropins/tools/preact-hooks.js';
import { CustomMessage } from '../../../atoms/customMessage/customMessage.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleMessage = () => {
  const [showErrorComplete, setShowErrorComplete] = useState(true);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(true);

  return html`
    <div className="${['home-wrapper'].join(' ')}">
      <h2>MESSAGE BLOCKS</h2>
      <section>
        <p>Estado de error (completo)</p>
        ${showErrorComplete && html`
          <${CustomMessage}
            type="error"
            variant="complete"
            title="Título"
            description="Descripción."
            links=${[
        { text: "Enlace", url: "#" },
        { text: "Enlace", url: "#" }
      ]}
            showCloseButton=${true}
            onClose=${() => setShowErrorComplete(false)}
          />
        `}
        <p>Estado de error (solo texto)</p>
        ${showErrorComplete && html`
          <${CustomMessage}
            type="error"
            variant="textOnly"
            title="Título"
            description="Descripción."
            links=${[
        { text: "Enlace", url: "#" },
        { text: "Enlace", url: "#" }
      ]}
            showCloseButton=${true}
            onClose=${() => setShowErrorComplete(false)}
          />
        `}
      </section>
      <section>
        <p>Estado informativo (completo)</p>
        ${showErrorComplete && html`
          <${CustomMessage}
            type="info"
            variant="complete"
            title="Título"
            description="Descripción."
            links=${[
        { text: "Enlace", url: "#" },
        { text: "Enlace", url: "#" }
      ]}
            showCloseButton=${true}
            onClose=${() => setShowErrorComplete(false)}
          />
        `}
        <p>Estado informativo (solo texto)</p>
        ${showErrorComplete && html`
          <${CustomMessage}
            type="info"
            variant="textOnly"
            title="Título"
            description="Descripción."
            links=${[
        { text: "Enlace", url: "#" },
        { text: "Enlace", url: "#" }
      ]}
            showCloseButton=${true}
            onClose=${() => setShowErrorComplete(false)}
          />
        `}
      </section>
      <section>
        <p>Estado de éxito (completo)</p>
        ${showErrorComplete && html`
          <${CustomMessage}
            type="success"
            variant="complete"
            title="Título"
            description="Descripción."
            links=${[
        { text: "Enlace", url: "#" },
        { text: "Enlace", url: "#" }
      ]}
            showCloseButton=${true}
            onClose=${() => setShowErrorComplete(false)}
          />
        `}
        <p>Estado de éxito (solo texto)</p>
        ${showErrorComplete && html`
          <${CustomMessage}
            type="success"
            variant="textOnly"
            title="Título"
            description="Descripción."
            links=${[
        { text: "Enlace", url: "#" },
        { text: "Enlace", url: "#" }
      ]}
            showCloseButton=${true}
            onClose=${() => setShowErrorComplete(false)}
          />
        `}
      </section>
      <section>
        <p>Estado de advertencia (completo)</p>
        ${showErrorComplete && html`
          <${CustomMessage}
            type="warning"
            variant="complete"
            title="Título"
            description="Descripción."
            links=${[
        { text: "Enlace", url: "#" },
        { text: "Enlace", url: "#" }
      ]}
            showCloseButton=${true}
            onClose=${() => setShowErrorComplete(false)}
          />
        `}
        <p>Estado de advertencia (solo texto)</p>
        ${showErrorComplete && html`
          <${CustomMessage}
            type="warning"
            variant="textOnly"
            title="Título"
            description="Descripción."
            links=${[
        { text: "Enlace", url: "#" },
        { text: "Enlace", url: "#" }
      ]}
            showCloseButton=${true}
            onClose=${() => setShowErrorComplete(false)}
          />
        `}
      </section>
      <h2>SNACKBAR</h2>
      <section>
      ${showErrorSnackbar && html`
        <${CustomMessage}
          type="error"
          variant="snackbar"
          description="Descripción."
          showCloseButton=${true}
          onClose=${() => setShowErrorSnackbar(false)}
        />
      `}
      ${showErrorSnackbar && html`
        <${CustomMessage}
          type="success"
          variant="snackbar"
          description="Descripción."
          showCloseButton=${true}
          onClose=${() => setShowErrorSnackbar(false)}
        />
      `}
      ${showErrorSnackbar && html`
        <${CustomMessage}
          type="info"
          variant="snackbar"
          description="Descripción."
          showCloseButton=${true}
          onClose=${() => setShowErrorSnackbar(false)}
        />
      `}
      ${showErrorSnackbar && html`
        <${CustomMessage}
          type="warning"
          variant="snackbar"
          description="Descripción."
          showCloseButton=${true}
          onClose=${() => setShowErrorSnackbar(false)}
        />
      `}
      </section>
    </div>
  `;
}
export default SampleMessage;