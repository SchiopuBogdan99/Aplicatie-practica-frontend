import "./Tile.css";
export default function Tile(props) {
  return (
    <div className="tile">
      {props.children}

      <button
        className="remove-button"
        onClick={() => props.handleRemove(props.countryId, props.userId)}
      >
        X
      </button>
    </div>
  );
}
