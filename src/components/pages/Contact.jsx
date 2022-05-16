import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import icon_discord_small from "../../resources/icons/discord-16x16.png";
import icon_discord_big from "../../resources/icons/discord-120x120.png";
import icon_github_small from "../../resources/icons/github-16x16.png";
import icon_github_big from "../../resources/icons/github-120x120.png";

import icon_youtube_small from "../../resources/icons/youtube-16x16.png";
import icon_youtube_big from "../../resources/icons/youtube-120x120.png";

import icon_gmail_small from "../../resources/icons/gmail-16x16.png";
import icon_gmail_big from "../../resources/icons/gmail-120x120.png";

import icon_linkedin_small from "../../resources/icons/linkedin-16x16.png";
import icon_linkedin_big from "../../resources/icons/linkedin-120x120.png";
const dataLinks = {
  discord: {
    app: "Discord",
    title: "Scan the Qr to go directly to my Discord server",
    profile: "https://discord.gg/Twwx5Uf5dz",
    icon: icon_discord_big,
    referal: (
      <>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://icons8.com/icon/2mIgusGquJFz/discord"
        >
          Discord
        </a>{" "}
        icon by{" "}
        <a target="_blank" rel="noreferrer" href="https://icons8.com">
          Icons8
        </a>
      </>
    ),
    qr: (
      <QRCodeSVG
        value={"https://discord.gg/Twwx5Uf5dz"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        imageSettings={{
          src: icon_discord_small,
          x: null,
          y: null,
          height: 24,
          width: 24,
          excavate: true,
        }}
      />
    ),
  },
  github: {
    app: "GitHub",
    title: "Scan the Qr to go directly to my GitHub repositories",
    profile: "https://github.com/willis65260",
    icon: icon_github_big,
    referal: (
      <>
        <a
          target="_blank"
          href="https://icons8.com/icon/3tC9EQumUAuq/github"
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com" rel="noreferrer">
          Icons8
        </a>
      </>
    ),
    qr: (
      <QRCodeSVG
        value={"https://github.com/willis65260"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        imageSettings={{
          src: icon_github_small,
          x: null,
          y: null,
          height: 24,
          width: 24,
          excavate: true,
        }}
      />
    ),
  },
  youtube: {
    app: "Youtube",
    title: "Scan the Qr to go directly to my YouTube channel",
    profile: "https://www.youtube.com/channel/UCuIkjNn7ASW59f5gjMj0-dw",
    icon: icon_youtube_big,
    referal: (
      <>
        <a
          target="_blank"
          href="https://icons8.com/icon/19318/youtube"
          rel="noreferrer"
        >
          YouTube
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com" rel="noreferrer">
          Icons8
        </a>
      </>
    ),
    qr: (
      <QRCodeSVG
        value={"https://www.youtube.com/channel/UCuIkjNn7ASW59f5gjMj0-dw"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        imageSettings={{
          src: icon_youtube_small,
          x: null,
          y: null,
          height: 24,
          width: 24,
          excavate: true,
        }}
      />
    ),
  },
  gmail: {
    app: "Gmail",
    title: "Scan the Qr to send me an email automatically",
    profile: "mailto: lalop65260@gmail.com",
    icon: icon_gmail_big,
    referal: (
      <>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://icons8.com/icon/qyRpAggnV0zH/gmail"
        >
          Gmail
        </a>{" "}
        icon by{" "}
        <a target="_blank" rel="noreferrer" href="https://icons8.com">
          Icons8
        </a>
      </>
    ),
    qr: (
      <QRCodeSVG
        value={"mailto: lalop65260@gmail.com"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        imageSettings={{
          src: icon_gmail_small,
          x: null,
          y: null,
          height: 24,
          width: 24,
          excavate: true,
        }}
      />
    ),
  },
  linkedin: {
    app: "linkedin",
    title: "Scan the Qr to go to my linkedin profile",
    profile: "https://www.linkedin.com/in/joseeduardo6/",
    icon: icon_linkedin_big,
    referal: (
      <>
        <a
          target="_blank"
          href="https://icons8.com/icon/114445/linkedin-circled"
          rel="noreferrer"
        >
          LinkedIn Circled
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com" rel="noreferrer">
          Icons8
        </a>
      </>
    ),
    qr: (
      <QRCodeSVG
        value={"https://www.linkedin.com/in/joseeduardo6/"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        imageSettings={{
          src: icon_linkedin_small,
          x: null,
          y: null,
          height: 24,
          width: 24,
          excavate: true,
        }}
      />
    ),
  },
};

const Contact = () => {
  const [show, setShow] = useState(dataLinks.discord);
  return (
    <div className="page-contact">
      <div className="contact">
        <h5 className="texto-10">{show.title}</h5>
        <div className="qr-contact">{show.qr}</div>
        <p style={{ width: "100%", margin: "0px" }} className="texto">
          {show.referal}
        </p>
        <h5 className="texto-10">or just click the link below!</h5>
        <div className="link-contact">
          <h5>
            <a href={show.profile} className="texto-10 a-ref-color">
              {show.app}
            </a>
          </h5>
        </div>
        <div className="other-link-contact">
          <img
            src={icon_discord_big}
            alt="discord_icon_error"
            className="icon-contact"
            onClick={() => {
              setShow(dataLinks.discord);
            }}
          />
          <img
            src={icon_github_big}
            alt="discord_icon_error"
            className="icon-contact"
            onClick={() => {
              setShow(dataLinks.github);
            }}
          />
          <img
            src={icon_youtube_big}
            alt="discord_icon_error"
            className="icon-contact"
            onClick={() => {
              setShow(dataLinks.youtube);
            }}
          />
          <img
            src={icon_gmail_big}
            alt="discord_icon_error"
            className="icon-contact"
            onClick={() => {
              setShow(dataLinks.gmail);
            }}
          />
          <img
            src={icon_linkedin_big}
            alt="discord_icon_error"
            className="icon-contact"
            onClick={() => {
              setShow(dataLinks.linkedin);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
