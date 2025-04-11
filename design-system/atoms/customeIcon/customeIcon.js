// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useEffect, useState } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';

const html = htm.bind(h);

/**
 *
 * @param {*} param0
 * @returns
 *
 * variant = 'primary' | 'secondary' | 'tertiary' | accent
 * color = 'black' | 'white'
 * size = 'xxs' | 'xs' | 's' | 'm' | 'l'
 */

export const CustomeIcon = ({ icon = 'arrow-up', color = 'black', size='s' }) => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    fetch(`../../icons/ultaIcons/${icon}.svg`)
      .then((res) => res.text())
      .then(setSvgContent);
  }, [icon]);

  return html`
    <div
      className="${['custome-icon', `custome-icon--${color}`, `custome-icon--size-${size}`].join(' ')}"
      dangerouslySetInnerHTML=${{ __html: svgContent }}
    ></div>
  `;
};

export default CustomeIcon;
