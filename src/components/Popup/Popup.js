import { useState } from "react";
import "./Popup.css";

const Popup = ({ popupData, popupUtils }) => {
  const [currentProduct, setCurrentProduct] = useState({ ...popupData });

  return (
    <div className="popup-container">
      <h5>{currentProduct.id ? "Edit Product" : "Add Product"}</h5>
      <div className="grid-container">
        <label>Product Name</label>
        <input
        required
          type="text"
          placeholder="Product name"
          value={currentProduct.name}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, name: e.target.value })
          }
        />

        <label>Description</label>
        <input
        required
          type="text"
          placeholder="Product description"
          value={currentProduct.description}
          onChange={(e) =>
            setCurrentProduct({
              ...currentProduct,
              description: e.target.value,
            })
          }
        />

        <label>Cost</label>
        <input
        required
          type="number"
          placeholder="Product cost"
          value={currentProduct.cost}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, cost: e.target.value })
          }
        />

        <label>Rating</label>
        <input
        required
          type="range"
          min="1"
          max="5"
          value={currentProduct.rating}
          onChange={(e) =>
            setCurrentProduct({
              ...currentProduct,
              rating: e.target.value - "0",
            })
          }
        />

        <label>Image Link</label>
        <input
        required
          type="text"
          placeholder="Link to product image"
          value={currentProduct.image_link}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, image_link: e.target.value })
          }
          pattern="https://.*"
        />
      </div>
      <div className="popup-footer">
        <button
          id="removeBtn"
          onClick={() => {
            popupUtils.removeItem(currentProduct.id);
            popupUtils.hidePopup();
          }}
          disabled={currentProduct.id ? false : true}
        >
          Remove
        </button>
        <div className="rightBtn">
          <p id="cancelBtn" onClick={popupUtils.hidePopup}>
            Cancel
          </p>
          <button
            id="saveBtn"
            onClick={() => {
              if (currentProduct.id === null) {
                popupUtils.addItem(currentProduct);
              } else {
                popupUtils.editItem(currentProduct);
              }
              popupUtils.hidePopup();
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
