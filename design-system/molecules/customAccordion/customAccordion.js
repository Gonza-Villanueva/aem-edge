import { h } from '@dropins/tools/preact.js';
import { Accordion, AccordionSection } from '@dropins/tools/components.js';
import htm from '../../../scripts/htm.js';

const html = htm.bind(h);

/**
 *  ## props
 *  {
 *    acordionProps:{
        actionIconPosition?: 'left' | 'right';
        iconOpen?: IconNode;
        iconClose?: IconNode;
        iconLeft?: IconNode;
        showIconLeft?: boolean;
        secondaryText?: string | VNode<HTMLAttributes<HTMLSpanElement>>;
      },
      sections:[{
          title=string
          defaultOpen?: boolean;
          actionIconPosition?: 'left' | 'right';
          ariaLabelTitle: string;
          iconOpen?: IconNode;
          iconClose?: IconNode;
          iconLeft?: IconNode;
          showIconLeft?: boolean;
          secondaryText?: string | VNode<HTMLAttributes<HTMLSpanElement>>;
          renderContentWhenClosed?: boolean;
          onStateChange?: (open: boolean) => void;
          children: inner section content
      }]

 * }
 */

export const CustomAccordion = ({ props }) =>
  html`
    <div className="custom-accordion-wrapper">
      <${Accordion} ...${props.acordionProps}>
        ${props.sections.map(
          (section) => html`<${AccordionSection} ...${section}>
            ${section.children}
          <//>`
        )}
      <//>
    </div>
  `;
export default CustomAccordion;
