import { h } from '@dropins/tools/preact.js';
import { useEffect, useState, useRef } from '@dropins/tools/preact-hooks.js';
import htm from '../../../scripts/htm.js';
import { loadCSS } from '../../../scripts/aem.js';

const html = htm.bind(h);

export const CustomSelect = ({ props }) => {
  // props
  const {
    label = '',
    options = [],
    defaultValue = 'Selecciona tu encabezado',
    required = false,
    errorMessage,
    onChange,
  } = props;

  //   inter states
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [error, setError] = useState(null);
  const wrapperRef = useRef(null);

  //   load css
  useEffect(() => {
    loadCSS(
      `${window.hlx.codeBasePath}/design-system/atoms/customSelect/customSelect.css`
    ).catch((err) => console.error('Error al cargar el CSS', err));
  }, []);

  // close dropdown on otside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  //   set errors

  useEffect(() => {
    if (errorMessage && errorMessage.length > 0) {
      setError(errorMessage);
    }
  }, [errorMessage]);

  // blur validation
  const handleBlur = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
      if (required && !selectedOption) {
        setError(errorMessage);
      } else {
        setError(null);
      }
    }
  };

  //   toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // select option
  const handleOptionSelect = (option, index) => {
    setSelectedOption(option);
    setIsOpen(false);
    setHighlightedIndex(index);
    if (required) setError(null);
    if (typeof onChange === 'function') {
      onChange(option);
    }
  };

  // keyyboard managmenr
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!isOpen) {
        setIsOpen(true);
      } else {
        if (options[highlightedIndex]) {
          handleOptionSelect(options[highlightedIndex], highlightedIndex);
        }
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) => (prev + 1) % options.length);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      if (isOpen) {
        setHighlightedIndex(
          (prev) => (prev - 1 + options.length) % options.length
        );
      }
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      e.preventDefault();
    }
  };
  return html`
    <div className="custom-select-wrapper">
      <label>
        ${label} ${required ? html`<span className="required">*</span>` : null}
      </label>
      <div
        className=${`custom-select-trigger ${
          isOpen && 'custom-select-trigger--is-open'
        } ${error && 'custom-select-trigger--hasError'}`}
        tabindex="0"
        onClick=${toggleDropdown}
        onKeyDown=${handleKeyDown}
      >
        <span className="custom-select-text">
          ${selectedOption ? selectedOption.label : defaultValue}
        </span>
        <span className="arrow">
          ${isOpen
            ? html`<img
                src="../../../icons/chevron-up.svg"
                width="16px"
                height="16px"
              />`
            : html`<img
                src="../../../icons/chevron-down.svg"
                width="16px"
                height="16px"
              />`}
        </span>
      </div>
      ${isOpen &&
      html`
        <div
          className=${`custom-select-options ${
            error && 'custom-select-options--has-error'
          }`}
        >
          ${options.map(
            (option, index) => html`
              <div
                className=${'custom-select-option' +
                (index === highlightedIndex ? ' highlighted' : '')}
                onClick=${() => handleOptionSelect(option, index)}
                onMouseEnter=${() => setHighlightedIndex(index)}
              >
                ${option.label}
              </div>
            `
          )}
        </div>
      `}
      ${error ? html`<div className="error-message">${error}</div>` : null}
    </div>
  `;
};
export default CustomSelect;
