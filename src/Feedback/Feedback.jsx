import React, { Fragment, useEffect, useState } from "react";
import {
  dismissLoadingMessage,
  loadingMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script/index";
import { useForm } from "react-hook-form";

import { rejectMessage, resolveMessage } from "../Script/index";
import { ClipLoader } from "react-spinners";
import { BiArrowFromLeft } from "react-icons/bi";
import { cloudinaryConfig } from "../ConfigFiles/Cloudinary_Config";
import { db } from "../ConfigFiles/firebase_Config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import uuid from "react-uuid";
import { IoIosWarning } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

import { Tooltip } from "react-tooltip";
import { RiFeedbackFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

const Feedback = () => {
  const [feedbackLoading, setFeedbackLoadingLoading] = useState(false);
  const employeeAddInputs = [
    { ID: "feedBackName", Placeholder: "Name", Type: "text" },
    { ID: "feedBackEmail", Placeholder: "Email", Type: "email" },
    { ID: "feedBackMessage", Placeholder: "Message", Type: "text" },
  ];
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "EmpManage | | FeedBack";
  }, []);

  const feedback_Form_Handler = async (feedback_Data) => {
    try {
      event.preventDefault();
      setFeedbackLoadingLoading(true);
      feedback_Data.employeeAddingTime = serverTimestamp();
      feedback_Data.role = "Employee";
      const randomNumber = Math.floor(Math.random() * 2);
      feedback_Data.status = randomNumber === 1 ? "active" : "Unactive";
      await addDoc(collection(db, "FeedBack"), feedback_Data);
      resolveMessage("Employee Added");
      // reset();
    } catch (error) {
      console.log(error);
      rejectMessage("Failed to give Feedback try Again");
    } finally {
      setFeedbackLoadingLoading(false);
    }
  };

  return (
    <Fragment>
      <div
        className={`Employee_Add_Page w-full h-full flex flex-col justify-center items-center p-2 mt-[10svh] ${ThemeLightToDark}`}
      >
        <form
          className={`Employee_Add_Form flex flex-col items-center justify-evenly gap-4 w-[500px] max-w-full p-8 border border-colorTwo dark:border-colorOne
            
            ${feedbackLoading && "select-none cursor-not-allowed"}`}
          onSubmit={handleSubmit(feedback_Form_Handler)}
        >
          <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
            FeedBack
          </h1>
          {employeeAddInputs.map((elem, index) => {
            const { ID, Placeholder, Type } = elem;
            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={ID}
                  className={`flex flex-col items-start justify-center gap-2 font-normal text-colorTwo dark:text-colorOne w-full ${
                    feedbackLoading && "cursor-not-allowed"
                  }`}
                >
                  {Placeholder}

                  {ID === "feedBackMessage" ? (
                    <textarea
                      disabled={feedbackLoading && true}
                      placeholder="Message"
                      name=""
                      id="feedBackMessage"
                      rows={10}
                      className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-full ${
                        feedbackLoading && "cursor-not-allowed"
                      }`}
                      {...register("feedBackMessage", {
                        required: `${Placeholder} is required.`,
                        pattern: {
                          value: /^[^\s]+(?:$|.*[^\s]+$)/,
                          message: "Remove Blank Space",
                        },
                      })}
                    ></textarea>
                  ) : (
                    <input
                      disabled={feedbackLoading && true}
                      type={Type}
                      placeholder={Placeholder}
                      id={ID}
                      className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-full ${
                        feedbackLoading && "cursor-not-allowed"
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
          <div className="flex flex-row justify-around items-center gap-0 w-full py-5 cursor-pointer">
            Rate
            {[1, 2, 3, 4, 5].map((number, index) => {
              console.log(number, index);
              return (
                <React.Fragment key={index}>
                  <FaStar
                    size={30}
                    onClick={(e) => {
                      e.currentTarget.style.color = "#FFDF00";
                    }}
                  />
                </React.Fragment>
              );
            })}{" "}
          </div>

          <button
            type="submit"
            className={`bg-[#5cb85c] text-colorOne cursor-pointer border-0 py-2 text-[13px] mt-4 sm:text-[15px] hover:rounded-xl transition-all px-5 flex items-center justify-center gap-3 ${
              feedbackLoading && "cursor-not-allowed"
            }`}
            id="Employee_Form_Submit_Button"
            disabled={feedbackLoading && true}
          >
            <span>FeedBack</span>

            {feedbackLoading ? (
              <ClipLoader
                loading={feedbackLoading}
                size={20}
                className="LoadingLoader"
              />
            ) : (
              <RiFeedbackFill size={15} />
            )}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Feedback;
