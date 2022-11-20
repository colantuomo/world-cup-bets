import { toast } from '@zerodevx/svelte-toast';

function success(msg: string) {
	toast.push(msg, {
		theme: {
			'--toastBackground': '#9bdd9b',
			'--toastColor': 'black',
			'--toastBarBackground': 'darkgreen',
			'--toastBorderRadius': '0.3rem'
		}
	});
}

function error(msg: string) {
	toast.push(msg, {
		theme: {
			'--toastBackground': '#d55',
			'--toastColor': 'white',
			'--toastBarBackground': 'darkred',
			'--toastBorderRadius': '0.3rem'
		}
	});
}

export const toasts = { success, error };
