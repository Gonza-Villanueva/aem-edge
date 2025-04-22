// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useEffect } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

/**
 * A customizable tag component for highlighting small content blocks or labels.
 * 
 * @param {Object} props
 * @param {string} [props.backgroundColor="#C40058"] - Background color in HEX.
 * @param {string} [props.textColor="#FFFFFF"] - Text color in HEX.
 * @param {string} [props.text=""] - Text to be displayed inside the tag.
 */
export const CustomTagHighlight = ({
  backgroundColor = '#C40058',
  textColor = '#FFFFFF',
  text = ''
}) => {
  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/atoms/customTagHighlight/customTagHighlight.css`
    ).catch((err) => console.error('Error loading CSS', err));
  }, []);

  return html`
    <span
      className="tag-highlight"
      style=${{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      ${text}
    </span>
  `;
};

export default CustomTagHighlight;
