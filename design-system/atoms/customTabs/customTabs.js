// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import { useEffect, useState, useCallback } from '@dropins/tools/preact-hooks.js';

import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const CustomTabs = ({
  defaultActiveIndex = 0,
  onTabChange = () => {},
  children
}) => {

  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/atoms/customTabs/customTabs.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const handleTabClick = useCallback((index) => {
    setActiveIndex(index);
    onTabChange(index);
  }, [onTabChange]);

  const tabsArray = Array.isArray(children) ? children : [children];
  const tabTitles = tabsArray.map(child => child.props.tabTitle);

  return html`
    <div className="custom-tabs">
      <div className="custom-tabs__list">
        ${tabTitles.map((title, index) => {
          const isActive = index === activeIndex;
          return html`
            <button
              key=${index}
              className=${[
                'custom-tabs__tab',
                isActive ? 'custom-tabs__tab--active' : 'custom-tabs__tab--inactive'
              ].join(' ')}
              onClick=${() => handleTabClick(index)}
            >
              ${title}
            </button>
          `;
        })}
      </div>
      <div className="custom-tabs__content">
        ${tabsArray[activeIndex]}
      </div>
    </div>
  `;
};

export default CustomTabs;
