import Cookies from "js-cookie";
import { writable } from "svelte/store";

export let token = writable("");

export const getCurrentUser = () => {
	try {
		return JSON.parse(String(Cookies.get("user")));
	} catch (error) {}
};
