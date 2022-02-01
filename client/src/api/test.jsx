import {getCatalog} from './catalog.js';
import {getAllFilters, getFiltersTree, getFiltersByType} from './filters.js';
import {getCustomer, getToken, setAuthToken} from './login.js';
import {parseProductsKeys} from './parsers.js';
import {getProduct} from './products.js';

function TestPage() {
  const test = async () => {
    const token = await getToken('customer@gmail.com', '1111111');
    console.log(token);
    console.log(setAuthToken(token));
    console.log(await getCustomer());
  };

  test();

  return <>test page</>;
}

export default TestPage;
