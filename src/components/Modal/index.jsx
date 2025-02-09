import { doc, updateDoc } from "firebase/firestore";
import { IoMdClose } from "react-icons/io";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import upload from "../../utils/upload";

const Modal = ({ tweet, close }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.title.value;
    const file = e.target.file.files[0];
    const tweetRef = doc(db, "tweets", tweet.id);
    try {
      if (!file && !file?.type.startsWith("image")) {
        await updateDoc(tweetRef, {
          textContent: text,
          isEdited: true,
        });
      } else {
        const newUrl = await upload(file);
        await updateDoc(tweetRef, {
          textContent: text,
          imageContent: newUrl,
          isEdited: true,
        });
      }
      toast.success("Tweet successfully updated.");
    } catch (err) {
      toast.error("Something went wrong");
    }
    close();
  };
  return (
    <div className="fixed inset-0 w-full h-full grid place-items-center bg-gray-500 bg-opacity-40">
      <div className="bg-black rounded-md py-10 px-8 w-3/4 min-h-[60vh] max-h-[80vh] flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Edit Tweet</h1>
          <button onClick={close}>
            <IoMdClose className="text-3xl transition hover:text-gray-500" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex-1 mt-10 flex flex-col justify-between"
        >
          <div className="flex flex-col">
            <label className="mb-5">Change Content</label>
            <input
              name="title"
              defaultValue={tweet.textContent}
              className="border rounded-md p-1 text-black"
              type="text"
            />
            <label className="mt-10 mb-5">Change/Add Photo</label>
            <input name="file" type="file" />
          </div>
          <div className="flex justify-end gap-5">
            <button
              onClick={close}
              type="button"
              className="bg-gray-500 py-2 px-4 rounded-full hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 py-2 px-4 rounded-full hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
