import React from "react";
import Chatbot from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import config from "./config";
import MessageParser from "./messageParser";

export default function ChatBot (){
    return (<>

        <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
        
        ></Chatbot>
    
    </>)
}