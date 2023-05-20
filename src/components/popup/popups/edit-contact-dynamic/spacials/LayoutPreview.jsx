import MapLayout from '@/components/layoutContact/spacials/MapLayout';

const LayoutPreviewSpacial = ({ title, imageIcon, component, getValues }) => {
  if (component === 'MapLayout') {
    return (
      <MapLayout
        title={title}
        name={getValues('name')}
        note={getValues('note')}
        latitude={getValues('latitude')}
        longitude={getValues('longitude')}
      />
    );
  }
};

export default LayoutPreviewSpacial;
