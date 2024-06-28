import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMobileChatSidebar, infoToggle, sendMessage, updateConversationMessageById } from "./store";
import useWidth from "@/hooks/useWidth";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import image1 from "@/assets/images/users/user-1.jpg";
import TLogo from "@/assets/images/logo/tumatar-logo.svg";
import Icons from "../../../components/ui/Icon";
import { sendMsg } from "../../../api/conversation";
import { set } from "react-hook-form";

const chatAction = [
  {
    label: "Remove",
    link: "#",
  },
  {
    label: "Forward",
    link: "#",
  },
];
const time = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12 || 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return hours12 + ":" + minutesStr + " " + ampm;
};

const Chat = () => {
  const { activechat, openinfo, mobileChatSidebar, messFeed, user } =
    useSelector((state) => state.chat);
  const { width, breakpoints } = useWidth();
  const [newMessage, setNewMessage] = React.useState("");
  const dispatch = useDispatch();

  const handleSendMessage = async (e) => {
    let _message = newMessage;
    if (_message) {
      setNewMessage("");
      dispatch(sendMessage({ role: "user", content: _message }));
      dispatch(sendMessage({ role: "assistant", content: 'Please wait...' }));
      const payload = {
        message: _message,
      };

      if (user?.title !== "New Chat") {
        payload.conversation_id = user?.conversation_id;
      }

      const resp = await sendMsg(user?.content_id, payload);

      if(resp.status === 201){
        dispatch(updateConversationMessageById({
          conversationId: resp.data.conversation_id,
          message: resp.data.messages
        }));
      }
    }

    setNewMessage("");
  };
  const chatheight = useRef(null);
  useEffect(() => {
    chatheight.current.scrollTop = chatheight.current.scrollHeight;
  }, [messFeed]);

  return (
    <div className="h-full">
      <header className="border-b border-slate-100 dark:border-slate-700">
        <div className="flex py-6 md:px-6 px-3 items-center justify-between">
          {/* <div className="flex-1">
            <div className="flex space-x-3 rtl:space-x-reverse">
              {width <= breakpoints.lg && (
                <span
                  onClick={() => dispatch(toggleMobileChatSidebar(true))}
                  className="text-slate-900 dark:text-white cursor-pointer text-xl self-center ltr:mr-3 rtl:ml-3"
                >
                  <Icon icon="heroicons-outline:menu-alt-1" />
                </span>
              )}
              <div className="flex-none">
                <div className="h-10 w-10 rounded-full relative">
                  <span
                    className={` status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0
                  ${
                    user.status === "active"
                      ? "bg-success-500"
                      : "bg-secondary-500"
                  }
                  `}
                  ></span>
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex-1 text-start">
                <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px] truncate">
                  {user.fullName}
                </span>
                <span className="block text-slate-500 dark:text-slate-300 text-xs font-normal">
                  Active now
                </span>
              </div>
            </div>
          </div> */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {width <= breakpoints.lg && (
                <span
                  onClick={() => dispatch(toggleMobileChatSidebar(true))}
                  className="text-slate-900 dark:text-white cursor-pointer text-xl self-center ltr:mr-3 rtl:ml-3"
                >
                  <img
                    src={require("../../../assets/images/logo/tumatar-logo.svg").default}
                    alt="menu"
                    className="w-6 h-6"
                  />
                </span>
              )}
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full relative">
                  <img
                    src={TLogo}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-center ml-3">
                  <h1 className="text-slate-800 dark:text-slate-300 text-lg font-medium truncate">
                    {user.title}
                  </h1>
                </div>
              </div>
            </div>

          </div>


          <div className="flex-none flex md:space-x-3 space-x-1 items-center rtl:space-x-reverse">
           {/* download icon */}
            <Icons
              icon={"heroicons-outline:download"}
              className="text-blue-600 dark:text-slate-400 text-xl"
            />
          </div>
        </div>
      </header>
      <div className="chat-content parent-height">
        <div
          className="msgs overflow-y-auto msg-height pt-6 space-y-6"
          ref={chatheight}
        >
          {messFeed.map((item, i) => (
            <div className="block md:px-6 px-4" key={i}>
              {item.role === "assistant" && (
                <div className="flex space-x-2 items-start group rtl:space-x-reverse">
                  <div className="flex-none">
                    <div className="h-8 w-8 rounded-full">
                      <img
                        src={TLogo}
                        alt="Tumatar"
                        className="block w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex space-x-4 rtl:space-x-reverse">
                    <div>
                      <div className="text-contrent p-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-600 text-sm font-normal mb-1 rounded-md flex-1 whitespace-pre-wrap break-all">
                        {item.content}
                      </div>
                      <span className="font-normal text-xs text-slate-400 dark:text-slate-400">
                        12:20 pm
                      </span>
                    </div>
                    <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                      <Dropdown
                        classMenuItems=" w-[100px] top-0"
                        items={chatAction}
                        label={
                          <div className="h-8 w-8 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-900 flex flex-col justify-center items-center text-xl rounded-full">
                            <Icon icon="heroicons-outline:dots-horizontal" />
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* sender */}
              {item.role === "user" && (
                <div className="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse">
                  <div className="no flex space-x-4 rtl:space-x-reverse">
                    <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                      <Dropdown
                        classMenuItems=" w-[100px] left-0 top-0  "
                        items={chatAction}
                        label={
                          <div className="h-8 w-8 bg-slate-300 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full text-slate-900">
                            <Icon icon="heroicons-outline:dots-horizontal" />
                          </div>
                        }
                      />
                    </div>

                    <div className="whitespace-pre-wrap break-all">
                      <div className="text-contrent p-3 bg-slate-300 dark:bg-slate-900 dark:text-slate-300 text-slate-800 text-sm font-normal rounded-md flex-1 mb-1">
                        {item.content}
                      </div>
                      <span className="font-normal text-xs text-slate-400">
                        {time()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-none">
                    <div className="h-8 w-8 rounded-full">
                      {/* <img
                        src={user.avatar}
                        alt=""
                        className="block w-full h-full object-cover rounded-full"
                      /> */}
                    </div>
                  </div>
                </div>
              )}
              {/* me */}
            </div>
          ))}
        </div>
      </div>
      <footer className="md:px-6 px-4 sm:flex md:space-x-4 sm:space-x-2 rtl:space-x-reverse border-t md:pt-6 pt-4 border-slate-100 dark:border-slate-700">
        {/* <div className="flex-none sm:flex hidden md:space-x-3 space-x-1 rtl:space-x-reverse">
          <div className="h-8 w-8 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full">
            <Icon icon="heroicons-outline:link" />
          </div>
          <div className="h-8 w-8 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full">
            <Icon icon="heroicons-outline:emoji-happy" />
          </div>
        </div> */}
        <div className="flex-1 relative flex space-x-3 rtl:space-x-reverse">
          <div className="flex-1">
            <textarea
              type="text"
              placeholder="Type Something..."
              className="focus:ring-0 focus:outline-0 block w-full bg-transparent dark:text-white resize-none"
              // v-model.trim="newMessage"
              // @keydown.enter.exact.prevent="sendMessage"
              // @keydown.enter.shift.exact.prevent="newMessage += '\n'"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
          </div>
          <div className="flex-none md:pr-0 pr-3">
            <button
              type="button"
              className="h-8 w-8 bg-slate-900 text-white flex flex-col justify-center items-center text-lg rounded-full"
              onClick={handleSendMessage}
            >
              <Icon
                icon="heroicons-outline:paper-airplane"
                className="transform rotate-[60deg]"
              />
             
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
