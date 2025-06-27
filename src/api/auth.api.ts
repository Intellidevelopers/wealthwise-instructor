import axios from 'axios';

const API_BASE_URL = 'https://wealthwise-api.onrender.com'; // Replace with your actual backend base URL

export const signupInstructor = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
    ...formData,
    role: 'instructor',
  });

  return response.data;
};

export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
    email,
    otp,
  });
  return response.data;
};

export const loginInstructor = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
  return response.data;
};

// ✅ NEW: Get instructor's courses using token
export const getCourses = async () => {
  const token = localStorage.getItem('instructorToken');
  if (!token) throw new Error('Instructor token not found in localStorage');

  const response = await axios.get(`${API_BASE_URL}/api/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};



export const createCourse = async (formData: FormData) => {
  const token = localStorage.getItem('instructorToken');

  const response = await axios.post(`${API_BASE_URL}/api/courses`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
// --------------------- CATEGORIES ---------------------

export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/categories`);
  return response.data;
};

// src/api/auth.api.ts
export const updateCourse = async (id: string, formData: FormData) => {
  const token = localStorage.getItem('instructorToken'); // ✅ token must match your backend check

  const response = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/courses/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, // ✅ required if your route uses authMiddleware
      },
    }
  );

  return response.data;
};



// src/api/auth.api.ts
export const getCourseById = async (id: string) => {
  const token = localStorage.getItem('instructorToken'); // if required
  const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const sendStudentNotification = async (title: string, message: string) => {
  const token = localStorage.getItem('instructorToken'); // 🔐 Adjust to your actual token key

  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/notifications/students/global`,
    { title, message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const getInstructorNotifications = async () => {
  const token = localStorage.getItem('instructorToken');
  const response = await axios.get(`${API_BASE_URL}/api/notifications/sent`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Assuming it returns an array of notifications
};

export const logoutInstructor = async () => {
  const token = localStorage.getItem('instructorToken');
  if (!token) throw new Error('Instructor token not found in localStorage');

  const response = await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};