//Internal app
import { encrypt } from '@/utils/encrypt_decrypt';

export function log_message(type: string, msg: string) {
	const data = { type, msg };
	fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/logger`, {
		method: 'POST',
		body: JSON.stringify({ payload: encrypt({ data: JSON.stringify(data )}) }),
	});
}

export function ramdomData(
	length: number,
	format: string = 'alpha'
): string | number {
	let result: string | number = '';
	let characters =
		format == 'alpha'
			? 'ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzZ0123456789'
			: '0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	result = format == 'alpha' ? result : parseInt(result);
	return result;
}