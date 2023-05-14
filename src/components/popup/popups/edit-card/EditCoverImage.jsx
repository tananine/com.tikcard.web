import PopupWrapper from '@/components/popup/PopupWrapper';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const EditCoverImage = ({
  open,
  openEditCoverHandler,
  closeEditCoverHandler,
}) => {
  const editProfileHeight = useSelector(
    (state) => state.layout.editProfileHeight
  );

  return (
    <PopupWrapper
      open={open}
      onOpen={openEditCoverHandler}
      onClose={closeEditCoverHandler}
    >
      <Box height={`calc(${editProfileHeight}px - 38px)`}>test</Box>
    </PopupWrapper>
  );
};

export default EditCoverImage;
