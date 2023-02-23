import { useCallback } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Divider, Typography } from '@mui/material';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import ContactList from 'pages/profile/body/ContactList';

const items = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
];

const ProfileBody = () => {
  const handleDragEnd = useCallback(() => {}, []);

  const handleDragOver = useCallback(() => {}, []);

  return (
    <>
      <Typography variant="caption">ทั้งหมด 6</Typography>
      <Divider sx={{ width: '60px', margin: 'auto' }} />
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext items={items}>
          {items.map((item) => (
            <ContactList key={item.id} id={item.id} />
          ))}
        </SortableContext>
      </DndContext>
      <Divider sx={{ width: '60px', margin: 'auto' }} />
      <Typography variant="caption" textAlign="end">
        6 / 25
      </Typography>
    </>
  );
};

export default ProfileBody;
