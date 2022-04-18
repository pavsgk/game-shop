import Skeleton from '@mui/material/Skeleton';

function ProductPlaceholder() {
  return (
    <div style={{width: 190, height: 380}}>
      <Skeleton sx={{bgcolor: 'grey.900'}} variant="rectangular" width={190} height={240} />
      <Skeleton
        sx={{bgcolor: 'grey.900', marginTop: '14px', marginBottom: '8px'}}
        variant="text"
        width={120}
        height={20}
      />
      <Skeleton sx={{bgcolor: 'grey.900'}} variant="text" width={190} height={28} />
      <Skeleton
        sx={{bgcolor: 'grey.900', marginTop: '14px'}}
        variant="text"
        width={190}
        height={27.5}
      />
    </div>
  );
}

function ProductsPlaceholder() {
  return (
    <>
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
    </>
  );
}

export default ProductsPlaceholder;
