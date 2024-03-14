import React, { useState } from "react";
import { Input, InputGroup } from "@chakra-ui/react";
import { Attach, Camera, Doc, Send, Video } from "../../images";
import "./chatFooter.css";

export default function ChatFooter() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="chatFooter">
      <InputGroup className="chatInput">
        <Input
          className="chatType"
          placeholder="Type a message..."
          focusBorderColor="transparent"
          _hover={{ borderColor: "transparent" }}
        />
        <div className="attachIcon" onClick={toggleMenu}>
          <Attach />
          {menuOpen && (
            <div className="menu">
              <div><Camera/></div>
              <div><Video/></div>
              <div><Doc/></div>
            </div>
          )}
        </div>
        <div style={{cursor:"pointer"}}>
          <Send />
        </div>
      </InputGroup>
    </div>
  );
}
