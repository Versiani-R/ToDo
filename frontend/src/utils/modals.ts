const displayModal = ({ modal, display }: { modal: HTMLElement, display: boolean }) => display ? modal.style.display = 'block' : modal.style.display = 'none';

export { displayModal };