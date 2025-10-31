import axios from "axios";
const URL = "http://localhost:3000";

// Add axios interceptor to ensure token is set before each request
axios.interceptors.request.use(
  (config) => {
    // Get token from sessionStorage before each request
    const token = sessionStorage.getItem("User");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getPosts() {
  const response = await axios.get(`${URL}/posts`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}
export async function getPost(id) {
  try {
    const response = await axios.get(`${URL}/posts/${id}`);
    const post = response.data;

    // Only fetch image if imageId exists
    if (post.imageId) {
      try {
        const imageData = await getImage(post.imageId);
        if (imageData && imageData.data) {
          post.image = imageData.data;
        } else {
          post.image = null;
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        post.image = null;
      }
    } else {
      post.image = null;
    }

    return post;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication required. Please log in.");
      throw new Error("Authentication required. Please log in to view this post.");
    }
    throw error;
  }
}

export async function createPost(post) {
  // Only upload image if it exists
  if (post.image) {
    const imageData = await uploadImage(post.image);
    // Store the public_id from Cloudinary response (may include folder path like "mern_uploads/d45djorhxys7waqsmnzf")
    post.imageId = imageData.data.public_id;
  }

  const response = await axios.post(`${URL}/posts/`, post);
  return response;
}
export async function updatePosts(id, post) {
  const response = await axios.put(`${URL}/posts/${id}`, post);
  return response;
}
export async function deletePosts(id) {
  const response = await axios.delete(`${URL}/posts/${id}`);
  return response;
}

export async function getUser(id) {
  const response = await axios.get(`${URL}/users/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}
export async function createUser(user) {
  const response = await axios.post(`${URL}/users/`, user);
  return response;
}
export async function updateUser(id, user) {
  const response = await axios.put(`${URL}/users/${id}`, user);
  return response;
}

export async function verifyUser(user) {
  const response = await axios.post(`${URL}/users/login`, user);
  if (response.data.success) {
    return response.data.token;
  } else {
    return;
  }
}

export async function uploadImage(image) {
  const formData = new FormData();
  formData.append('image', image);
  const response = await axios.post(`${URL}/api/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function getImage(id) {
  // Encode the public_id to handle folder paths with slashes (e.g., "mern_uploads/d45djorhxys7waqsmnzf")
  const response = await axios.get(`${URL}/api/images/${encodeURIComponent(id)}`);
  return response;
}
// export async function deleteImage(id) {
//   const response = await axios.delete(`${URL}/images/${id}`);
//   return response;
// }
