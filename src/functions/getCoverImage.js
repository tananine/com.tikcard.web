import coverImage from '@/data/jsons/cover-image.json';

const getCoverImage = (coverImageId, colorCoverImageId) => {
  const objectImageColor = coverImage.colors.find(
    (color) => color.id === parseInt(colorCoverImageId)
  )?.objectImage;

  const coverImageURL = coverImage.data.find(
    (coverItem) => coverItem.id === parseInt(coverImageId)
  )?.coverImage[objectImageColor];

  return coverImageURL;
};

export default getCoverImage;
