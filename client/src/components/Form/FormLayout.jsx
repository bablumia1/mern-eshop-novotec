const FormLayout = ({ children, title }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 capitalize">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
