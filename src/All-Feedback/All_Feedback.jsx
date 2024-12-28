import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { db } from "../Config-Files/firebase_Config";
import LoadingArrows from "../Loading/Loading_Arrows";
import {
  rejectMessage,
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script/index";
import { ClipLoader } from "react-spinners";
import { IoIosWarning } from "react-icons/io";

const All_Feedback = () => {
  const [feedBacksData, setFeedBacksData] = useState(null);
  const [feedBacksDataLoading, setFeedBacksDataLoading] = useState(false);
  const [feedBackDeleteLoading, setFeedBackDeleteLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setFeedBacksDataLoading(true);
        onSnapshot(collection(db, "FeedBack"), (querySnapshot) => {
          const response = querySnapshot.docs.map((e) => {
            return {
              id: e.id,
              ...e.data(),
            };
          });
          setFeedBacksData(response);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setFeedBacksDataLoading(false);
      }
    })();
  }, []);

  if (feedBacksDataLoading || feedBacksData === null) {
    return <LoadingArrows />;
  }

  const deleteHandler = async (id) => {
    try {
      setFeedBackDeleteLoading(true);
      await deleteDoc(doc(db, "FeedBack", id));
      resolveMessage("FeedBack Deleted");
    } catch (error) {
      console.log(error);
      rejectMessage(error.message);
    } finally {
      setFeedBackDeleteLoading(false);
    }
  };

  return (
    <div className={`w-full h-[90svh] ${ThemeLightToDark} mt-[10svh]`}>
      <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center">
        FeedBacks
      </h1>

      {feedBacksData.length === 0 && (
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
          No FeedBack
        </h1>
      )}

      <div className="flex flex-wrap justify-evenly items-center w-full mt-10 gap-y-5">
        {feedBacksData?.map((feedback, index) => {
          const {
            feedBackMessage,
            feedBackEmail,
            feedBackName,
            feedbackRatingStar,
            feedbackTime,
          } = feedback;

          const { nanoseconds, seconds } = feedbackTime;
          const feedBackTimeConverted = new Date(
            seconds * 1000 + nanoseconds / 1000000
          )?.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: "true",
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          });

          console.log(feedback.id);

          return (
            <React.Fragment key={index}>
              <div
                key={index}
                className="rounded-lg shadow-xl flex flex-col justify-between w-full xs:w-[400px] border-2 border-colorTwo dark:border-colorOne p-5 capitalize relative overflow-hidden"
              >
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${ThemeDarkToLight}`}
                  >
                    {feedBackName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg">{feedBackName}</h2>
                    <p className="text-sm">{feedBackTimeConverted}</p>
                  </div>
                </div>

                <span className="lowercase absolute top-5 right-6 text-[13px] opacity-35">
                  {feedBackEmail}
                </span>

                <p className="text-[15px] italic py-5 mb-5">
                  {feedBackMessage}
                </p>

                <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-y-4 sm:gap-0">
                  <span className="flex flex-row justify-center items-center gap-1">
                    {Array(feedbackRatingStar)
                      .fill(0)
                      .map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" size={18} />
                      ))}
                  </span>
                  <div className="flex flex-row justify-center items-center gap-5">
                    <button
                      // onClick={() => handleLikeUnlike(feedback.id)}
                      className={`
                        text-blue-500
                     flex items-center gap-1`}
                    >
                      {true ? "Unlike" : "Like"}
                    </button>

                    <button
                      className="bg-[#a63232] text-colorOne cursor-pointer border-0 relative text-[13px] flex flex-row hover:rounded-xl transition-all justify-center items-center gap-1 px-3 py-2 sm:px-6"
                      disabled={feedBackDeleteLoading && true}
                      onClick={() => {
                        deleteHandler(feedback.id);
                      }}
                    >
                      {feedBackDeleteLoading ? (
                        <ClipLoader color="white" size={15} />
                      ) : (
                        <IoIosWarning size={15} />
                      )}{" "}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default All_Feedback;
