import axios from "axios";

async function makeRequest(method, url, data = {}, params = {}, headers = {}, auth = {}) {
    try {
      const config = {
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? data : {}, // Only send body for POST/PUT
        params: params,
        headers: headers
      };

      // Handle different types of authentication
      if (auth.type === 'basic' && auth.key && auth.value) {
        config.auth = {
          username: auth.key,
          password: auth.value
        };
      } else if (auth.type === 'bearer' && auth.value) {
        config.headers['Authorization'] = `Bearer ${auth.value}`;
      } else if (auth.type === 'api' && auth.key && auth.value) {
        // Assuming API Key is sent in headers
        config.headers[auth.key] = auth.value; // Change this key as per your API documentation
      }

      const response = await axios(config);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Rethrow the error for further handling if needed
    }
}

export default makeRequest;
