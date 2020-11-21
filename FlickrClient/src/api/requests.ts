import axios from 'axios';
import XMLParser from 'react-xml-parser';

const API_KEY = '6b5287e6acbce688391e81d0201210d5';

export interface ImageItem {
  imageId: string;
  serverId: string;
  secret: string;
}

export interface ImageItemDetails {
  authorName: string;
  title: string;
  description: string;
}

export async function fetchImages(query: string): Promise<any> {
  try {
    const response = await axios.get(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${query}`,
    );

    const result = new XMLParser()
      .parseFromString(response.data)
      .getElementsByTagName('photo');
    return result.map((item) => {
      return {
        imageId: item.attributes.id,
        serverId: item.attributes.server,
        secret: item.attributes.secret,
      };
    });
  } catch (error) {}
}

export async function fetchImageDetails(imageId: string): Promise<any> {
  try {
    const response = await axios.get(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${API_KEY}&photo_id=${imageId}`,
    );

    const result = new XMLParser().parseFromString(response.data);

    return {
      name: result.getElementsByTagName('owner')[0].attributes.realname,
      title: result.getElementsByTagName('title')[0].value,
      description: result.getElementsByTagName('description')[0].value,
    };
  } catch (error) {}
}
