export default async function decorate(block) {
  console.log('Desktop image: ', block.dataset.desktopimage);
  console.log('Mobile image: ', block.dataset.mobileimage);

  const desktopImage = block.dataset.desktopimage || '';
  const mobileImage = block.dataset.mobileimage || '';
  const desktopAlt = block.dataset.desktopalt || '';
  const mobileAlt = block.dataset.mobilealt || desktopAlt;
  const desktopUrl = block.dataset.desktopurl || '';
  const mobileUrl = block.dataset.mobileurl || '';

  const picture = document.createElement('picture');

  if (mobileImage) {
    const source = document.createElement('source');
    source.setAttribute('media', '(max-width: 900px)');
    source.setAttribute('srcset', mobileImage);
    picture.appendChild(source);
  }

  const img = document.createElement('img');
  img.setAttribute('src', desktopImage || mobileImage || '');
  img.setAttribute('alt', window.innerWidth <= 900 ? mobileAlt : desktopAlt);
  picture.appendChild(img);

  const wrapper = desktopUrl || mobileUrl
    ? document.createElement('a')
    : document.createElement('div');

  wrapper.classList.add('block-image-wrapper');
  if (window.innerWidth <= 900 && mobileUrl) {
    wrapper.setAttribute('href', mobileUrl);
  } else if (desktopUrl) {
    wrapper.setAttribute('href', desktopUrl);
  }

  wrapper.appendChild(picture);
  block.textContent = '';
  block.appendChild(wrapper);
}
