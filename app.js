const btnSuccess = document.querySelector('.btn--success');
const btnWarning = document.querySelector('.btn--warning');
const container = document.querySelector('#toast-container');

btnSuccess.onclick = function () {
	toast({
		title: 'Success',
		type: 'success',
		text: 'Anyone with access can view your visited visitors',
	});
};
btnWarning.onclick = function () {
	toast({
		title: 'Warning',
		type: 'warning',
		text: 'Anyone with access can view your visited visitors',
		duration: 5000,
	});
};

function toast({ title = '', type = 'info', text = '', duration = 3000 }) {
	if (container) {
		const toastElement = document.createElement('div');

		toastElement.classList.add('toast', `toast--${type}`);

		const delay = duration / 1000 + 's';

		// set animation for the toast message
		toastElement.style.animation = `slideInLeft 0.3s ease-out, fadeOut 0.3s ease-out ${delay} forwards`;

		const icons = {
			info: 'toast__icon--info fa-solid fa-circle-info',
			warning: 'toast__icon--warning fa-solid fa-circle-exclamation',
			success: 'toast__icon--success fa-solid fa-circle-check',
			error: 'toast__icon--error fa-solid fa-circle-exclamation',
		};
		const iconClasses = icons[type];

		//add toast content
		toastElement.innerHTML = `
        <i
          class="toast__icon ${iconClasses}"
        ></i>
        <div class="toast__body">
          <h2 class="toast__title">${title}</h2>
          <p class="toast__text">
            ${text}
          </p>
        </div>
        <i class="toast__close fa-solid fa-xmark"></i>`;

		container.appendChild(toastElement);

		//auto remove toast after amount of time
		const timeoutId = setTimeout(() => {
			toastElement.remove();
		}, duration + 300);

		//remove toast when close button clicked
		toastElement.onclick = function (e) {
			const closeBtn = e.target.closest('.toast__close');
			closeBtn.onclick = function () {
				toastElement.remove();
				clearTimeout(timeoutId);
			};
		};
	}
}
