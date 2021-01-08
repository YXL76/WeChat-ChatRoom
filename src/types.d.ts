declare namespace Chat {
  interface Settings {
    systemIn: boolean;
    systemOut: boolean;
    systemNum: boolean;
    anonymous: boolean;
    anonymousName: string;
  }

  interface Message {
    type: "text" | "system" | "systemIn" | "systemOut";
    avatarUrl: string;
    nickName: string;
    content: string;
  }
}
