import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=33483798-cfc94c7459e9d93c6a5457b44&image_type=photo&orientation=horizontal';

export const getImages = async (query, page) => {
  try {
    const response = await axios.get(`&per_page=12&page=${page}&q=${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
