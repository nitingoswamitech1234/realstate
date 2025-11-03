// PropertyCard.jsx
import { Link } from "react-router-dom";

const PropertyCard = ({ project }) => {
  return (
    <Link
      to={`/projects/${project.slug}`}
      state={{ id: project._id }} // 👈 ID send ho rahi hai route ke state me
    >
      <div className="card">
        <h2>{project.title}</h2>
        <p>{project.shortDescription}</p>
      </div>
    </Link>
  );
};

export default PropertyCard;
