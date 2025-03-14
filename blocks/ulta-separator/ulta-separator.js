export default function decorate(block) {
  // console.log('Decorating ulta-separator block', block);
  const paragraphs = block.querySelectorAll('p');

  const heightDesktop = paragraphs[0]?.textContent.trim() || '20px';
  const heightMobile = paragraphs[1]?.textContent.trim() || '10px';
  let separatorColor = paragraphs[2]?.textContent.trim() || 'FFFFFF';

  if (!separatorColor.startsWith('#')) {
    separatorColor = `#${separatorColor}`;
  }

  const separator = document.createElement('div');
  separator.style.backgroundColor = separatorColor;

  const setSeparatorHeight = () => {
    if (window.innerWidth <= 1024) {
      separator.style.height = heightMobile;
    } else {
      separator.style.height = heightDesktop;
    }
  };

  setSeparatorHeight();
  window.addEventListener('resize', setSeparatorHeight);

  block.innerHTML = '';
  block.appendChild(separator);
}
