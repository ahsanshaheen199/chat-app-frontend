import Axios from 'axios';

const appAxios = Axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL ?? '',
	headers: {
		Accept: 'application/json',
		'content-type': 'application/json',
	},
});

export default appAxios;
