import Skeleton from '@mui/material/Skeleton';

function ProductPlaceholder() {
  return (
    <div style={{width: 250}}>
      <Skeleton sx={{bgcolor: 'grey.900'}} variant="rectangular" width={252} height={286} />
      <Skeleton
        sx={{bgcolor: 'grey.900', marginTop: '14px', marginBottom: '8px'}}
        variant="text"
        width={250}
        height={20}
      />
      <Skeleton sx={{bgcolor: 'grey.900'}} variant="text" width={80} height={24} />
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
