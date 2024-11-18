import type { IUser } from "@/types/user";
import { API_BASE_URL } from "@/config";

const loginUser = async (user: IUser): Promise<Boolean> => {
  const currentUrl = API_BASE_URL + '/auth/login';
  try {
    const fetchResponse = await fetch(currentUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: new URLSearchParams({
        'email': user.email, 
        'password': user.password
      }),
    });
    
    return fetchResponse.status === 200;

  } catch (error) {
    throw new Error('Login request failed...')
  }
};

const logoutUser = async (): Promise<Boolean> => {
  const currentUrl = API_BASE_URL + '/auth/logout';
  try {
    const fetchResponse = await fetch(currentUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
      credentials: 'include',
    });
    return fetchResponse.status === 200;

  } catch (error) {
    throw new Error('Logout request failed...')
  }
};

const createUser = async (user: IUser): Promise<Boolean> => {
  const currentUrl = API_BASE_URL + '/user';
  try {
    const fetchResponse = await fetch(currentUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'email': user.email, 
        'password': user.password,
        'name': user.name,
        'surname': user.surname,
      }),
    });
    return fetchResponse.status === 200;

  } catch (error) {
    throw new Error('Create user request failed...')
  }
};

const getProfile = async (): Promise<IUser> => {
  const currentUrl = API_BASE_URL + '/profile';
  try {
    const fetchResponse = await fetch(currentUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
      credentials: 'include',
    });
    const response: IUser = await fetchResponse.json();

    return response;
  } catch (error) {
    throw new Error('Profile request failed...')
  }
};

export { 
  loginUser,
  logoutUser,
  createUser,
  getProfile,
}