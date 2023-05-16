import coverImage from '@/data/jsons/cover-image.json';

const splitCoverImage = (data, typeReturn) => {
  const arr = data ? data.split('$') : ['json', 1, 1];
  const type = arr[0];
  const coverId = arr[1];
  const colorId = arr[2];

  if (typeReturn === 'url') {
    const objectImageColor = coverImage.colors.find(
      (color) => color.id === parseInt(colorId)
    ).objectImage;
    const coverImageURL = coverImage.data.find(
      (coverItem) => coverItem.id === parseInt(coverId)
    ).coverImage[objectImageColor];
    return coverImageURL;
  }

  return {
    type: type,
    coverId: coverId,
    colorId: colorId,
  };
};

export default splitCoverImage;
