import "./ProductList.css";

function ListItem({ listData, showPopup }) {
  return (
    <div className="list-container" onClick={() => showPopup(listData)}>
      <img src={listData.image_link} alt="product_image"></img>
      <h3>{listData.name}</h3>
      <p>{listData.description}</p>
      <h6>${listData.cost}</h6>

      <ul>
        {[...Array(Math.round(listData.rating))].map((_, i) => (
          <li key={i}>
            <i className="fa fa-star checked"></i>
          </li>
        ))}
      </ul>
      <button className="buy-1">Buy</button>
    </div>
  );
}
export default ListItem;
