import styles from './ProductItem.module.scss';

const ProductItem = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mobileProductTitle}>
        <h2 className={styles.mobileProductTitle_Text}>STAR WARS JEDI: FALLEN ORDER</h2>
        <span className={styles.mobileProductTitle_Code}>W42234</span>
      </div>
      <div className={styles.productIMGWrapper}>
        <div className={styles.productIMGWrapper_Main}>
          <img
            src="https://steampay.com/product/star-wars-jedi-fallen-order.jpg?1640617604"
            alt="some product pic"
          />
        </div>
        <div className={styles.productIMGWrapper_Secondary}>
          <div className={styles.productIMGWrapper_Secondary_item}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKLKEMM-cAWDGgG3czBjYCDrRVTwthbwePg&usqp=CAU"
              alt=""
            />
          </div>
          <div className={styles.productIMGWrapper_Secondary_item}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA7ht4HJnJRDGli8aSQwEKs05-oui3Cbio-w&usqp=CAU"
              alt=""
            />
          </div>
          <div className={styles.productIMGWrapper_Secondary_item}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu3ffrOJjoFNqhTm4Ph6cMSMoINP__Upn8YQ&usqp=CAU"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.content_Title}>
          <h2 className={styles.content_Title_Text}>STAR WARS JEDI: FALLEN ORDER</h2>
          <span className={styles.content_Title_Code}>W42234</span>
        </div>
        <div className={styles.content_Price}>
          <div className={styles.content_Price_Item}> $ 80.00 </div>
          <button className={styles.content_Price_Button}> add to cart </button>
        </div>
        <div className={styles.content_Wrapper}>
          <div>
            <div className={styles.content_Description_Title}>
              <svg
                width="19"
                height="2"
                viewBox="0 0 19 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="0.144531" width="18.5771" height="1.25" fill="white" />
              </svg>
              <h3 className={styles.content_Description_Title_Item}>Description</h3>
            </div>
            <div className={styles.content_Description_Text}>
              <p className={styles.content_Description_Text_Item}>
                The Star Wars® Saga continues with Star Wars®: The Force Unleashed™ II, the highly
                anticipated sequel to the fastest-selling Star Wars game ever created. In Star Wars:
                The Force Unleashed, the world was introduced to Darth Vader’s now fugitive
                apprentice, Starkiller—the unlikely hero who would ignite the flames of rebellion in
                a galaxy so desperately in need of a champion.
              </p>
              <p className={styles.content_Description_Text_Item}>
                In the sequel, Starkiller returns with over-the-top Force powers and embarks on a
                journey to discover his own identity and to reunite with his one true love, Juno
                Eclipse. In Star Wars: The Force Unleashed II, Starkiller is once again the pawn of
                Darth Vader—but instead of training his protégé as a ruthless assassin, the dark
                lord is attempting to clone his former apprentice in an attempt to create the
                Ultimate Sith warrior. The chase is on – Starkiller is in pursuit of Juno and Darth
                Vader is hunting for Starkiller.
              </p>
              <p className={styles.content_Description_Text_Item}>
                With all-new devastating Force powers and the ability to dual-wield lightsabers,
                Starkiller cuts a swath through deadly new enemies across exciting worlds from the
                Star Wars films - all in his desperate search for answers to his past.
              </p>
            </div>
          </div>
          <div>
            <div className={styles.content_Details_Title}>
              <svg
                width="19"
                height="2"
                viewBox="0 0 19 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="0.144531" width="18.5771" height="1.25" fill="white" />
              </svg>
              <h3 className={styles.content_Details_Title_Item}>Product details</h3>
            </div>
            <div className={styles.content_Details_Wrapper}>
              <div className={styles.content_Details_Wrapper_Item}>
                <p>Genre:</p>
                <span>Action - TPP - Sci-fi</span>
              </div>
              <div className={styles.content_Details_Wrapper_Item}>
                <p>Works on:</p>
                <span>Windows (7, 8, 10, 11)</span>
              </div>
              <div className={styles.content_Details_Wrapper_Item}>
                <p>Release date:</p>
                <span>October 26, 2010</span>
              </div>
              <div className={styles.content_Details_Wrapper_Item}>
                <p>Company:</p>
                <span>LucasArts / Disney</span>
              </div>
              <div className={styles.content_Details_Wrapper_Item}>
                <p>Size:</p>
                <span> 6.2 GB</span>
              </div>
              <div className={styles.content_Details_Wrapper_Item}>
                <p>Rating:</p>
                <span>16+ </span>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.content_Delivery_Title}>
              <svg
                width="19"
                height="2"
                viewBox="0 0 19 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="0.144531" width="18.5771" height="1.25" fill="white" />
              </svg>
              <h3 className={styles.content_Delivery_Title_Item}>Shipping & delivery</h3>
            </div>
            <div className={styles.content_Delivery_Text}>
              <p className={styles.content_Delivery_Text_item}>
                Product Delivery generally takes 1-6 business days, depending on location and
                delivery method.
              </p>
              <p className={styles.content_Delivery_Text_item}>
                Courier delivery in Kyiv. When ordering, our managers clarify all the necessary
                information. Specialists check the address, find out when it is convenient for you
                to meet the courier.
              </p>
              <p className={styles.content_Delivery_Text_item}>
                You can also order delivery with Nova Posta. There are express (1-3 business days)
                and standard (4-5 business days) delivery methods.
              </p>
              <p className={styles.content_Delivery_Text_item}>
                Prices: courier - $16,95, express - $10,95, standard - $7,95.
              </p>
            </div>
          </div>
          <div className={styles.content_Reviews}>
            <div className={styles.content_Reviews_Title}>
              <svg
                width="14"
                height="34"
                viewBox="0 0 14 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.99805 14.6055H13.6221V16.0273H7.99805V22.1465H6.46191V16.0273H0.952148V14.6055H6.46191V8.68945H7.99805V14.6055Z"
                  fill="#7D7D78"
                />
              </svg>
              <p className={styles.content_Reviews_Title_Item}>Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
