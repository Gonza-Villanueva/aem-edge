import { h } from '@dropins/tools/preact.js';
import { Button } from '@dropins/tools/components.js';
import { CustomeIcon } from '../customeIcon/customeIcon.js';
import htm from '../../../scripts/htm.js';

const html = htm.bind(h);
/**
 *
 * @param {*} param0
 * @returns
 *
 * variant = 'primary' | 'secondary' | 'tertiary' | 'accent'
 * size = 'xl' | 'l' | 'm' | 's' | 'xs'
 */

export const CustomeIconButton = ({
  variant = 'primary',
  icon,
  size = 'm',
}) => html`
<div className=${['customeIconButtonWrapper', `size-${size}`].join(' ')}>
    <${Button} variant='${variant}'><${CustomeIcon} icon="${icon}" color="white"/> </${Button}>
</div>
  `;

export default Button;
