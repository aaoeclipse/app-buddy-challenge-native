import axios, { AxiosResponse } from "axios";

const HOST = "http://192.168.1.10:3000";

// AUTH

export const loginApiCall = async (
  username: string,
  password: string
): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    console.debug("[*] API ~ Logging in");

    const response = await axios.post(`${HOST}/login`, {
      email: username,
      password: password,
    });

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return;
  }
};

export const registerApiCall = async (
  username: string,
  password: string
): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    console.debug("[*] API ~ Register");

    const response = await axios.post(`${HOST}/register`, {
      email: username,
      password: password,
    });

    return response;
  } catch (error) {
    console.debug(error);
    return;
  }
};

// Challenges

export const getAllChallenges = async (
  token: string
): Promise<Challenge[] | undefined> => {
  try {
    console.debug("[*] API ~ Getting all Challenges");
    const response = await axios.get(`${HOST}/challenge`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.info("token: ", token);
    console.error("Error on getting challenges: ", error);
  }
};

export const getDetailChallenge = async (
  token: string,
  challengeId: number
): Promise<Challenge | undefined> => {
  try {
    console.debug("[*] API ~ Getting Detail Challenge on " + challengeId);

    const response = await axios.get(`${HOST}/challenge/${challengeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error on get detail challenge: ", error);
    return;
  }
};

export const createChallenge = async (
  token: string,
  challenge: NewChallenge
): Promise<any> => {
  try {
    console.debug("[*] API ~ Creating new challenge");
    const response = await axios.post(`${HOST}/challenge/new`, challenge, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating challenge: ", error);
    return;
  }
};

export const getLatestChallenge = async (token: string): Promise<any> => {
  try {
    console.debug("[*] API ~ Getting latest challenge");

    const response = await axios.get(`${HOST}/challenge/latest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error on getting challenges");
  }
};

// Friends

export const getAllFriends = async (token: string): Promise<any> => {
  try {
    console.debug("[*] API ~ Getting all friends");

    const response = await axios.get(`${HOST}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error on getting challenges");
  }
};

export const addFriend = async (
  token: string,
  friend: string
): Promise<any> => {
  try {
    console.debug("[*] API ~ Adding new friend");

    const response = await axios.post(
      `${HOST}/addFriend`,
      {
        friend: friend,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error on getting challenges");
  }
};
