import MapLayout from '@/components/layoutContact/spacials/MapLayout';

const LayoutPreviewSpacial = ({ title, imageIcon, component, getValues }) => {
  if (component === 'googleMap') {
    return (
      <MapLayout
        title={title}
        name={getValues('name')}
        note={getValues('note')}
        lat={getValues('lat')}
        lng={getValues('lng')}
      />
    );
  }
};

export default LayoutPreviewSpacial;
