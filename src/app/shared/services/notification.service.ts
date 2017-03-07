import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
	constructor() { }

	private timeoutDuration: number = 3500;

	public showNotification(message: string): void {
		let notification =  document.querySelector('.mdl-js-snackbar');
		let data = {
			message: message,
			timeout: this.timeoutDuration
		};

		notification['MaterialSnackbar'].showSnackbar(data);
	}

}