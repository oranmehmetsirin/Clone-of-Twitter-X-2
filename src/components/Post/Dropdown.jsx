import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "../Modal";

const Dropdown = ({ tweet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEdit = () => {
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    deleteDoc(tweetRef)
      .then(() => toast.info("Tweet removed from feed"))
      .catch(() => toast.error("Something went wrong."));
  };
  return (
    <>
      <label className="popup">
        <input type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Actions</legend>
          <ul>
            <li>
              <button onClick={handleEdit}>
                <MdEdit />
                <span>Edit</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <FaTrashAlt />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
      {isModalOpen && (
        <Modal tweet={tweet} close={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Dropdown;
