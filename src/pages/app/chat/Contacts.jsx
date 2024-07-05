import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openChat } from "./store";
import Icons from "../../../components/ui/Icon";

const Contacts = ({ contact, index }) => {
  const { title, avatar, status, lastmessage, unredmessage, conversation_title } = contact;

  const dispatch = useDispatch();

  return (
    <div
      className="block w-full py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
      onClick={() => {
        dispatch(
          openChat({
            contact,
            activechat: true,
          })
        );
      }}
    >
      <div className="flex space-x-3 px-6 rtl:space-x-reverse">
        {/* <div className="flex-none">
          <div className="h-10 w-10 rounded-full relative">
            <span
              className={`  status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0
                ${status === "active" ? "bg-success-500" : "bg-secondary-500"}
              `}
            ></span>
            <img
              src={avatar}
              alt=""
              className="block w-full h-full object-cover rounded-full"
            />
          </div>
        </div> */}
        <div className="flex items-center justify-between w-full">
          <span className="text-blue-600 dark:text-slate-300 text-sm font-semibold mb-[2px]">
            {conversation_title}
          </span>
          <Icons
            icon={"heroicons-outline:pencil"}
            className="text-slate-400 dark:text-slate-400 ml-2"
          />
          <span className="text-xs text-slate-400 dark:text-slate-400 font-normal ml-auto">
            12:20 pm
          </span>
        </div>

      </div>
    </div>
  );
};

export default Contacts;
