(function (Scratch) {
  "use strict";

    if (!Scratch.extensions.unsandboxed) {
    throw new Error('The mobile keyboard extension mut run unsandboxed');
    }

  class mobilekeyboard {
    constructor() {
      this.typedText = "";
      this.keyboardOpen = false;
      this.waitCallback = null;
      this.deafultvalue = " ";
      this.inputElement = null;
    }

    getInfo() {
      return {
        id: "mobilekeyboard0419",
        color1: "#999999",
        color2: "#666666",
        color3: "#333333",
        name: "mobile keyboard",
        blocks: [
          {
            opcode: "ShowKeyboardBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: "show [TYPE] keyboard",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.MENU,
                menu: "keyboardtypes",
                defaultValue: "alphabetical",
              },
            },
          },
          {
            opcode: "ShowKeyboardAndWaitBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: "show [TYPE] keyboard and wait",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.MENU,
                menu: "keyboardtypes",
                defaultValue: "alphabetical",
              },
            },
          },
          {
            opcode: "ShowKeyboardBlockAllowNewlineBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: "show alphabetical keyboard (allows newlines)",
          },
          {
            opcode: "ShowKeyboardBlockAllowNewlineWaitBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: "show alphabetical keyboard (allows newlines) and wait",
          },
          {
            opcode: "typedTextSinceKeyboardOpened",
            blockType: Scratch.BlockType.REPORTER,
            text: "typed text",
          },
          {
            opcode: "isKeyboardOpen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is keyboard open?",
          },
          {
            opcode: "SetDeafultValue",
            blockType: Scratch.BlockType.COMMAND,
            text: "set text box's default value to [VALUE]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "You typed: ",
              },
            },
          },
          {
            opcode: "CloseKeyboardBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: "close keyboard",
          },
        ],
        menus: {
          keyboardtypes: {
            acceptReporters: true,
            items: [
              {
                text: "alphabetical",
                value: "text",
              },
              {
                text: "numerical",
                value: "number",
              },
              {
                text: "email",
                value: "email",
              },
              {
                text: "website",
                value: "url",
              },
              {
                text: "search",
                value: "search",
              },
            ],
          },
        },
      };
    }

    showKeyboard(type) {
      const self = this;
      const input = document.createElement("input");
      input.type = type;
      input.style.position = "absolute";
      input.style.top = "0";
      input.style.left = "0";
      input.style.width = "1px";
      input.style.height = "1px";
      input.style.fontSize = "1px";
      input.style.padding = "0px";
      input.style.border = "none";
      input.style.backgroundColor = "#fff";
      input.value = self.deafultvalue;
      const keydownListener = function (event) {
        if (event.keyCode === 13) {
          self.keyboardOpen = false;
          input.style.display = "none";
          input.removeEventListener("keydown", keydownListener);
          if (self.waitCallback) {
            self.waitCallback();
            self.waitCallback = null;
          }
        } else {
          setTimeout(function () {
            self.typedText = event.target.value;
          }, 0);
        }
      };
      input.addEventListener("keydown", keydownListener);
      document.body.appendChild(input);
      input.focus();
      input.click();
      self.typedText = self.deafultvalue;
      this.keyboardOpen = true;
      input.addEventListener("blur", function () {
        self.keyboardOpen = false;
        if (self.waitCallback) {
          self.waitCallback();
          self.waitCallback = null;
        }
      });
      this.inputElement = input;
    }

    showKeyboardAllowNewline() {
      const self = this;
      const input = document.createElement("textarea");
      input.style.position = "absolute";
      input.style.top = "0";
      input.style.left = "0";
      input.style.width = "1px";
      input.style.height = "1px";
      input.style.fontSize = "1px";
      input.style.padding = "0px";
      input.style.border = "none";
      input.style.backgroundColor = "#fff";
      input.value = self.deafultvalue;
      const keydownListener = function (event) {
        setTimeout(function () {
          self.typedText = event.target.value;
        }, 0);
      };
      input.addEventListener("keydown", keydownListener);
      document.body.appendChild(input);
      input.focus();
      input.click();
      self.typedText = self.deafultvalue;
      this.keyboardOpen = true;
      input.addEventListener("blur", function () {
        self.keyboardOpen = false;
        if (self.waitCallback) {
          self.waitCallback();
          self.waitCallback = null;
        }
      });
      this.inputElement = input;
    }

    ShowKeyboardBlock(args) {
      this.showKeyboard(args.TYPE);
    }

    ShowKeyboardAndWaitBlock(args) {
      const self = this;
      return new Promise(function (resolve) {
        self.waitCallback = resolve;
        self.showKeyboard(args.TYPE);
      });
    }

    ShowKeyboardBlockAllowNewlineBlock() {
      this.showKeyboardAllowNewline();
    }

    ShowKeyboardBlockAllowNewlineWaitBlock() {
      const self = this;
      return new Promise(function (resolve) {
        self.waitCallback = resolve;
        self.showKeyboardAllowNewline();
      });
    }

    typedTextSinceKeyboardOpened() {
      return this.typedText;
    }

    isKeyboardOpen() {
      return this.keyboardOpen;
    }

    SetDeafultValue(args) {
      this.deafultvalue = args.VALUE;
    }

    CloseKeyboardBlock() {
      if (this.inputElement) {
        this.inputElement.blur();
      }
    }
  }

  Scratch.extensions.register(new mobilekeyboard());
})(Scratch);
