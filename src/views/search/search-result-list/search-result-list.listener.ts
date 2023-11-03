export const toggleFullDescriptionListener = (event: Event) => {
  const container = (event.currentTarget as Element).closest(
    '.search-result-list-item-description',
  );
  if (container) {
    const checkbox = container.querySelector('input');
    if (checkbox) checkbox.checked = !checkbox.checked;
  }
};

const imageTester = (src: string) => {
  return new Promise((res) => {
    const image = new Image();
    image.onload = () => res(true);
    image.onerror = () => res(false);
    image.src = src;
  });
};

export const collapseImage = async (element: Element) => {
  const loaded = await imageTester((element as HTMLImageElement).src);
  if (
    !loaded &&
    element.parentNode &&
    element.parentElement &&
    element.parentNode.parentNode
  )
    element.parentElement.outerHTML = '';
};
