export interface User {
	id?: string;
	username: string;
	email?: string;
	password?: string;
}

export interface Campground {
	id?: string;
	title?: string;
	location?: string;
	image?: string;
	price?: number;
	description?: string;
	reviews?: Review[];
	user?: User;
	user_id?: string;
}

export interface Review {
	id?: string;
	body?: string;
	rating?: number;
	campground?: Campground;
	campground_id?: string;
	user?: User;
	user_id?: string;
}
