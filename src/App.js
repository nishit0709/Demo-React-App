import { useEffect, useRef, useState } from "react";
import "./App.css";
import ListItem from "./components/Product_List/ProductList";
import Popup from "./components/Popup/Popup";

const emptyPopup = {
  id: null,
  name: "",
  description: "",
  cost: "",
  rating: 0,
  image_link: "",
};

function App() {
  const productIDs = useRef(1);
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState({ ...emptyPopup });

  useEffect(() => {
    fetch("https://dummyjson.com/product")
      .then((res) => res.json())
      .then((data) => data.products)
      .then((products) => {
        return products.map((product) => {
          return {
            id: product.id,
            name: product.title,
            description: product.description,
            cost: product.price,
            rating: product.rating,
            image_link: product.images[0],
          };
        });
      })
      .then((filteredData) => {
        setProducts(filteredData);
        productIDs.current = filteredData.length + 1;
      })
      .catch((error) => console.log(error));
  }, []);

  const showPopup = (data) => {
    setPopupData({ ...data });
    setPopup(true);
  };

  const hidePopup = () => {
    setPopupData({ ...emptyPopup });
    setPopup(false);
  };

  const removeItem = (product_ID) => {
    setProducts(products.filter((x) => x.id !== product_ID));
  };

  const addItem = (data) => {
    data.id = productIDs.current;
    setProducts([...products, { ...data }]);
    productIDs.current += 1;
  };

  const editItem = (data) => {
    const index = products.findIndex((x) => x.id === data.id);
    products[index] = data;
    setProducts([...products]);
  };

  const popupUtils = {
    hidePopup,
    removeItem,
    addItem,
    editItem,
  };

  return (
    <>
      {popup ? (
        <Popup popupData={popupData} popupUtils={popupUtils} />
      ) : (
        <div className="App">
          <div className="header">
            <h1>Product List</h1>
          </div>

          <div className="gallery">
            {products.map((product) => (
              <ListItem
                key={product.id}
                listData={product}
                showPopup={showPopup}
              />
            ))}
          </div>

          <button className="add-product" onClick={setPopup}>
            Add Product
          </button>
        </div>
      )}
    </>
  );
}
export default App;
