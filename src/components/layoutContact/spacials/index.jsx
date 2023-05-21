import MapLayout from '@/components/layoutContact/spacials/MapLayout';

const SpacialLayout = ({ data }) => {
  switch (data.ContactItem.component) {
    case 'MapLayout':
      return (
        <MapLayout
          title={data.ContactItem.name}
          name={data.name}
          note={data.note}
          latitude={data.latitude}
          longitude={data.longitude}
          onClick={() => {}}
        />
      );
    default:
      return <></>;
  }
};

export default SpacialLayout;
