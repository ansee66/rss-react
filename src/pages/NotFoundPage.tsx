import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <h1>This page is not found</h1>
      <div>
        You can go <Link to="/">home</Link>
      </div>
    </>
  );
};

export default NotFoundPage;
