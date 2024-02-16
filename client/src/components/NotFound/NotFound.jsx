import notFoundImage from "../../assets/images/not-found.jpg";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src={notFoundImage} alt="Not Found" className="w-2/4  mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">404 - Not Found</h1>
      <p className="text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
