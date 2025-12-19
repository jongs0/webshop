type Props = {
  sortOrder: "newest" | "oldest";
  onSortChange: (order: "newest" | "oldest") => void;
};

const ProductFilterComponent = ({ sortOrder, onSortChange }: Props) => {
  return (
    <div className="dropdown mb-4">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Sort by: {sortOrder === "newest" ? "Newest first" : "Oldest first"}
      </button>

      <ul className="dropdown-menu">
        <li>
          <button
            className="dropdown-item"
            onClick={() => onSortChange("newest")}
          >
            Newest first
          </button>
        </li>

        <li>
          <button
            className="dropdown-item"
            onClick={() => onSortChange("oldest")}
          >
            Oldest first
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProductFilterComponent;
