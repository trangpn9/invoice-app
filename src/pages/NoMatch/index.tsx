import bg_404 from './../../assets/img/bg_404.png';
import ErrorBoundary from './../../utils/ErrorBoundary';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className="d-flex justify-content-center">
      <ErrorBoundary>
        <Link to="/dashboard">
          <img alt="bg_404" src={bg_404} />
        </Link>
      </ErrorBoundary>
    </div>
  );
};

export default NoMatch;
