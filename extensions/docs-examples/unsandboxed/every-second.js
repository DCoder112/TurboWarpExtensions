(function (Scratch) {
  'use strict';
  class EverySecond {
    getInfo() {
      return {
        id: 'everysecondexample',
        name: 'Every Second',
        blocks: [
          {
            opcode: 'everySecond',
            blockType: Scratch.BlockType.HAT,
            text: 'every second',
            isEdgeActivated: false,
            arguments: {
              EVENT_OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'EVENT_FIELD',
              },
            },
          },
        ],
      };
    }
  }
  // highlight-start
  setInterval(() => {
    const startedThreads = Scratch.vm.runtime.startHats(
      'everysecondexample_everySecond'
    );
  }, 1000);
  // highlight-end
  Scratch.extensions.register(new EverySecond());
})(Scratch);
