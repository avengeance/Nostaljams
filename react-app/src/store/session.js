// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CHECK_USERNAME = "session/CHECK_USERNAME";
const GET_ALL_USERS = "session/GET_ALL_USERS";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const checkUsernameSuccess = (exists) => ({
	type: CHECK_USERNAME,
	payload: exists,
});

const getAllUsers = (users) => ({
	type: GET_ALL_USERS,
	payload: users,
})

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return response;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const checkUsername = (username) => async (dispatch) => {
	try {
		const response = await fetch(`/api/users/${username}`);
		if (response.ok) {
			const data = await response.json();
			return data.exists;
		} else {
			throw new Error("Unable to check username");
		}
	} catch (error) {
		console.error(error);
	}
};
export const signUp = (username, email, firstName, lastName, bio, userImage, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			firstName,
			lastName,
			bio,
			userImage,
			password
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const response = await fetch("/api/users/");
        if (response.ok) {
            const { users } = await response.json();
            dispatch(getAllUsers(users));
        } else {
            console.error("Failed to fetch users");
        }
    } catch (error) {
        console.error(error);
    }
};
const initialState = { user: null, allUsers: {} };
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case CHECK_USERNAME:
			return { ...state, usernameExists: action.payload };
		case GET_ALL_USERS:
            const usersObj = {};
            action.payload.forEach(user => {
                usersObj[user.id] = user;
            });
            return { ...state, allUsers: usersObj };
		default:
			return state;
	}
}
