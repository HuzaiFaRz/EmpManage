import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  ThemeLightToDark,
  rejectMessage,
  resolveMessage,
} from "../Script/index";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { auth, db } from "../Config-Files/firebase_Config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { IoIosWarning } from "react-icons/io";
import { RiFeedbackFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import LoadingArrows from "../Loading/Loading_Arrows";
import { MdDelete } from "react-icons/md";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const Feedback_Form = () => {
  const [feedBackLoading, setFeedBackLoadingLoading] = useState(false);
  const [isFeedBackExist, setIsFeedBackExist] = useState(undefined);
  const feedBackStarCount = useRef(0);
  const [feedBackDeleteLoading, setFeedBackDeleteLoading] = useState(false);
  const [isFeedBackExistLoading, setIsFeedBackExistLoading] =
    useState(undefined);
  const feedBackInputs = [
    { ID: "feedBackName", Placeholder: "Name", Type: "text" },
    { ID: "feedBackEmail", Placeholder: "Email", Type: "email" },
    { ID: "feedBackMessage", Placeholder: "Message", Type: "text" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "EmpManage | | FeedBack";
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsFeedBackExistLoading(true);
        onSnapshot(
          query(
            collection(db, "Feedback"),
            where("feedBackEmail", "==", auth.currentUser.email)
          ),
          (doc) => {
            const data = doc.docs.map((e) => {
              return { data: e.data(), id: e.id };
            });
            setIsFeedBackExist(data);
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsFeedBackExistLoading(false);
      }
    })();
  }, []);

  const feedBackStarHandler = (event) => {
    event.currentTarget.classList.toggle("starActive");
    if (event.currentTarget.classList.contains("starActive")) {
      event.currentTarget.style.color = "#FFDF00";
      feedBackStarCount.current = feedBackStarCount.current + 1;
      console.log(feedBackStarCount.current);
    } else {
      feedBackStarCount.current = feedBackStarCount.current - 1;
      event.currentTarget.style.color = "#fff";
      console.log(feedBackStarCount.current);
    }
  };

  const feedback_Form_Handler = async (feedback_Data) => {
    try {
      event.preventDefault();
      if (feedback_Data.feedBackEmail !== auth.currentUser.email) {
        rejectMessage(
          "You are not authorized to provide feedback. Check email"
        );
        return;
      }
      setFeedBackLoadingLoading(true);
      feedback_Data.feedbackRatingStar = feedBackStarCount.current;
      feedback_Data.feedbackTime = serverTimestamp();
      feedback_Data.feedbackLiked = false;
      await addDoc(collection(db, "Feedback"), feedback_Data);
      resolveMessage("Thank You 😉 For Your Feedback");
      reset();
    } catch (error) {
      console.log(error);
      rejectMessage("Failed to give Feedback try Again");
    } finally {
      setFeedBackLoadingLoading(false);
    }
  };

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

  if (isFeedBackExistLoading) {
    return <LoadingArrows />;
  }

  return (
    <Fragment>
      <div
        className={`FeedBack_Page w-full h-[90svh] flex gap-y-16 ${
          isFeedBackExist
            ? "flex-wrap justify-evenly"
            : "flex-col justify-center"
        } items-center p-2 mt-[10svh] ${ThemeLightToDark}`}
      >
        {isFeedBackExist?.length !== 0 && isFeedBackExist !== undefined ? (
          <>
            {isFeedBackExist?.map((element, index) => {
              const {
                feedbackRatingStar,
                feedbackLiked,
                feedBackMessage,
                feedbackTime,
              } = element.data;
              const { id } = element;
              const feedBackTimeConverted = new Date(
                feedbackTime?.seconds * 1000 +
                  feedbackTime?.nanoseconds / 1000000
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
                  <div className="rounded-lg shadow-2xl flex flex-col justify-evenly items-center w-full sm:w-[400px] px-2 h-[400px]">
                    <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                    <p className="text-sm capitalize w-full text-center">
                      Thank you for your feedback! We value your input. <br />{" "}
                      Here’s what you shared:
                    </p>

                    <div className="flex flex-row justify-center items-center gap-3">
                      {feedbackRatingStar === 0 ? (
                        <h4>No Star</h4>
                      ) : (
                        Array.from({ length: feedbackRatingStar }).map(
                          (_, idx) => (
                            <FaStar key={idx} size={18} color="#FFDF00" />
                          )
                        )
                      )}
                    </div>
                    <div className="text-[15px] italic py-2 overflow-hidden text-ellipsis whitespace-normal break-words px-2 max-w-full">
                      {feedBackMessage}
                    </div>
                    <div className="w-full flex justify-between items-center px-3">
                      <button>
                        {feedbackLiked ? (
                          <>
                            <AiFillLike
                              color="lightblue"
                              size={25}
                              className="cursor-pointer"
                            />
                            <span>Liked</span>
                          </>
                        ) : (
                          <AiFillDislike
                            color="red"
                            size={25}
                            className="cursor-pointer"
                          />
                        )}
                      </button>
                      <div className="text-sm mb-2">
                        {feedBackTimeConverted}
                      </div>

                      <button
                        className="text-red-500 flex flex-row items-center justify-center"
                        disabled={feedBackDeleteLoading && true}
                        onClick={() => {
                          feedbackDeleteHandler(id);
                        }}
                      >
                        <MdDelete size={25} />
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div className="w-full flex justify-center mt-16 mb-16">
              <h5
                to={"/dashboard"}
                className="bg-[#5cb85c]  text-colorOne cursor-pointer border-0 px-[15px] py-[10px] text-[13px] sm:text-[15px] hover:rounded-xl transition-all"
                onClick={() => setIsFeedBackExist(undefined)}
              >
                Submit Another Feedback
              </h5>
            </div>
          </>
        ) : (
          <>
            <form
              className={`FeedBack_Form flex flex-col py-5 items-center justify-evenly gap-4 w-[700px] max-w-full border border-colorTwo dark:border-colorOne
            
            ${feedBackLoading && "select-none cursor-not-allowed"}`}
              onSubmit={handleSubmit(feedback_Form_Handler)}
            >
              <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
                FeedBack
              </h1>
              <div className="flex flex-wrap justify-between items-center w-full p-6 gap-5">
                {feedBackInputs.map((elem, index) => {
                  const { ID, Placeholder, Type } = elem;
                  return (
                    <React.Fragment key={index}>
                      <label
                        htmlFor={ID}
                        className={`flex flex-col items-start justify-center gap-2 font-normal text-colorTwo dark:text-colorOne  ${
                          feedBackLoading && "cursor-not-allowed"
                        } ${ID === "feedBackMessage" && "w-full"}`}
                      >
                        {Placeholder}

                        {ID === "feedBackMessage" ? (
                          <textarea
                            disabled={feedBackLoading && true}
                            placeholder="Message"
                            name=""
                            id="feedBackMessage"
                            className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo max-h-[200px] min-h-[100px] dark:placeholder:text-colorOne focus:outline-0 w-full ${
                              feedBackLoading && "cursor-not-allowed"
                            }`}
                            {...register("feedBackMessage", {
                              required: `${Placeholder} is required.`,
                            })}
                          ></textarea>
                        ) : (
                          <input
                            disabled={feedBackLoading && true}
                            type={Type}
                            placeholder={Placeholder}
                            id={ID}
                            className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-[300px] ${
                              feedBackLoading && "cursor-not-allowed"
                            }`}
                            {...register(ID, {
                              required: `${Placeholder} is required.`,
                              pattern: {
                                value: /^[^\s]+(?:$|.*[^\s]+$)/,
                                message: "Remove Blank Space",
                              },
                            })}
                          />
                        )}

                        <p
                          className={`text-[#a63232] text-[13px] tracking-wider py-2 w-full h-[20px] flex items-center font-normal ${
                            errors[ID]?.message &&
                            "z-50 cursor-not-allowed select-none"
                          }`}
                          id="Error_Para"
                        >
                          {errors[ID] && (
                            <span className="flex flex-row justify-center items-center gap-2">
                              {" "}
                              <IoIosWarning />
                              {errors[ID]?.message}{" "}
                            </span>
                          )}
                        </p>
                      </label>
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="flex flex-row justify-around items-center gap-0 w-full py-5 cursor-pointer p-5">
                {Array.from({ length: 5 }).map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={30}
                      onClick={(event) => {
                        feedBackStarHandler(event, index);
                      }}
                    />
                  );
                })}
              </div>

              <button
                type="submit"
                className={`bg-[#5cb85c] text-colorOne cursor-pointer border-0 py-2 text-[13px] mt-4 sm:text-[15px] hover:rounded-xl transition-all px-5 flex items-center justify-center gap-3 m-5 ${
                  feedBackLoading && "cursor-not-allowed"
                }`}
                id="Employee_Form_Submit_Button"
                disabled={feedBackLoading && true}
              >
                <span>FeedBack</span>

                {feedBackLoading ? (
                  <ClipLoader
                    loading={feedBackLoading}
                    size={20}
                    color="white"
                  />
                ) : (
                  <RiFeedbackFill size={15} />
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Feedback_Form;
