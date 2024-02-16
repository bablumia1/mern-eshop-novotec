import { toast } from "react-hot-toast";

const DeleteComfirmDialog =
  (title, deleteFunction, resetFunction, dispatch) => (id) => () => {
    return toast((t) => (
      <div>
        <p className="text-red-600">
          {`Are you sure you want to delete this ${title}?`}
        </p>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-md mt-2"
          onClick={() => {
            dispatch(deleteFunction(id)).then(() => {
              dispatch(resetFunction());
            });
            toast.dismiss(t.id);
          }}
        >
          Delete
        </button>
        <button
          className="bg-gray-400 text-white py-2 px-4 rounded-md ml-2 mt-2"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
      </div>
    ));
  };

export default DeleteComfirmDialog;
