import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { db } from "../Config-Files/firebase_Config";
import LoadingArrows from "../Loading/Loading_Arrows";
import {
  dismissLoadingMessage,
  loadingMessage,
  rejectMessage,
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script/index";
import { MdDelete } from "react-icons/md";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { Link } from "react-router-dom";

const All_Feedback = () => {
  const { isAdminLogged, isUserLogged } = AuthUseContext();
  const [feedBacksData, setFeedBacksData] = useState(null);
  const [feedBacksDataLoading, setFeedBacksDataLoading] = useState(false);
  const [feedBackDeleteLoading, setFeedBackDeleteLoading] = useState(false);
  const [isFeebackLikedLoading, setIsFeebackLikedLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setFeedBacksDataLoading(true);
        onSnapshot(collection(db, "Feedback"), (querySnapshot) => {
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

  const feedbackDeleteHandler = async (id) => {
    try {
      setFeedBackDeleteLoading(true);
      await deleteDoc(doc(db, "Feedback", id));
      resolveMessage("FeedBack Deleted");
    } catch (error) {
      console.log(error);
      rejectMessage(error.message);
    } finally {
      setFeedBackDeleteLoading(false);
    }
  };

  const feedbackUnlikeHandler = async (id) => {
    setIsFeebackLikedLoading(true);
    try {
      await updateDoc(doc(db, "Feedback", id), {
        feedbackLiked: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsFeebackLikedLoading(false);
    }
  };

  const feedbackLikeHandler = async (id) => {
    setIsFeebackLikedLoading(true);
    loadingMessage("Wait.....");
    try {
      await updateDoc(doc(db, "Feedback", id), {
        feedbackLiked: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dismissLoadingMessage();
      setIsFeebackLikedLoading(false);
    }
  };

  return (
    <div
      className={`w-full h-[90svh] ${ThemeLightToDark} mt-[10svh] flex flex-col justify-start items-center`}
    >
      <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center">
        FeedBacks
      </h1>

      {feedBacksData.length === 0 && (
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
          No FeedBack
        </h1>
      )}
      <div className="flex flex-wrap justify-evenly items-center w-full mt-10 gap-y-8 p-2">
        {feedBacksData?.map((feedback, index) => {
          const {
            feedBackMessage,
            feedBackEmail,
            feedBackName,
            feedbackRatingStar,
            feedbackTime,
            feedbackLiked,
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
                <div className="text-[15px] italic py-5 mb-5 overflow-hidden text-ellipsis whitespace-normal break-words max-w-full">
                  {feedBackMessage}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-y-4 sm:gap-0">
                  <span className="flex flex-row justify-center items-center gap-1">
                    {feedbackRatingStar === 0 ? (
                      <h4>No Star</h4>
                    ) : (
                      Array(feedbackRatingStar)
                        .fill(0)
                        .map((_, i) => (
                          <FaStar
                            key={i}
                            className="text-yellow-400"
                            size={18}
                          />
                        ))
                    )}
                  </span>
                  <div className="flex flex-row justify-center items-center gap-5">
                    <button
                      className={`px-6 py-1 text-sm rounded-lg text-white ${
                        feedbackLiked ? "bg-blue-800" : "bg-blue-400"
                      }`}
                      disabled={isFeebackLikedLoading && true}
                      onClick={() => {
                        feedbackLiked
                          ? feedbackUnlikeHandler(feedback.id)
                          : feedbackLikeHandler(feedback.id);
                      }}
                    >
                      {feedbackLiked ? "Liked" : "Like"}
                    </button>

                    {isUserLogged && (
                      <button
                        className="text-red-500 flex flex-row items-center justify-center"
                        disabled={feedBackDeleteLoading && true}
                        onClick={() => {
                          feedbackDeleteHandler(feedback.id);
                        }}
                      >
                        <MdDelete size={25} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {isUserLogged && (
        <Link
          to={"/feedback"}
          className="underline underline-offset-4 hover:scale-105 transition-all mt-5 pb-5"
        >
          Back To Feedback
        </Link>
      )}
    </div>
  );
};

export default All_Feedback;
