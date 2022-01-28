import {parseProductsKeys} from './parsers.js';

function TestPage() {
  const test = async () => {
    console.log(await parseProductsKeys());
  };

  test();

  return <>test page</>;
}

export default TestPage;
