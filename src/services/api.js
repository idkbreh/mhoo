const API_URL = 'https://api.triamdod8.com/api';

export const memoryApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/memories`);
    return response.json();
  },

  create: async (memory) => {
    const response = await fetch(`${API_URL}/memories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memory),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/memories/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
};

export const restaurantApi = {
  getRecent: async () => {
    const response = await fetch(`${API_URL}/restaurants/recent`);
    return response.json();
  },

  addVisit: async (name) => {
    const response = await fetch(`${API_URL}/restaurants/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    return response.json();
  }
};

export const travelApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/travels`);
    return response.json();
  },

  create: async (formData) => {
    const response = await fetch(`${API_URL}/travels`, {
      method: 'POST',
      body: formData, // FormData will set the correct headers
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/travels/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
}; 