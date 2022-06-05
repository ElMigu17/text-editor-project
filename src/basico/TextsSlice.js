import { createSlice } from '@reduxjs/toolkit'

export const textsSlice = createSlice({
  name: 'texts',
  initialState: { 
    value: {
      1: {"color": "2A4036", 1553775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa ",
      1653765395554: "Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit.<br>Placerat tortor faucibus<br>mauris eu ut purus a, quam<br>quam. Risus vitae sed eget<br>amet. Laoreet enim interdum<br>mauris, dui est bibendum<br>volutpat. Eget at dolor sagittis<br>faucibus commodo. Arcu<br>quam egestas cras ipsum<br>aliquet aliquet. Est dolor at ",
      1653765395654: "Lorem ipsum dolor sit<br>amet, consectetur<br>adipiscing elit. Mi nunc<br>viverra cursus libero<br>est dictum. Eu, vitae<br>risus, facilisi diam<br>aenean viverra sed<br>ultrices mauris. Purus<br>a, arcu pretium dui sed<br>aenean vestibulu.",
      1653765495554: "Lorem ipsum<br>dolor sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui<br>ornare pharetra<br>vitae urna. Enim",
      1653775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa "},
      2: {"color": "2A4036", 1553775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa ",
      1653765395554: "Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit.<br>Placerat tortor faucibus<br>mauris eu ut purus a, quam<br>quam. Risus vitae sed eget<br>amet. Laoreet enim interdum<br>mauris, dui est bibendum<br>volutpat. Eget at dolor sagittis<br>faucibus commodo. Arcu<br>quam egestas cras ipsum<br>aliquet aliquet. Est dolor at ",
      1653765395654: "Lorem ipsum dolor sit<br>amet, consectetur<br>adipiscing elit. Mi nunc<br>viverra cursus libero<br>est dictum. Eu, vitae<br>risus, facilisi diam<br>aenean viverra sed<br>ultrices mauris. Purus<br>a, arcu pretium dui sed<br>aenean vestibulu.",
      1653765495554: "Lorem ipsum<br>dolor sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui<br>ornare pharetra<br>vitae urna. Enim",
      1653775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa "},
      3: {"color": "2A4036", 1553775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa ",
      1653765395554: "Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit.<br>Placerat tortor faucibus<br>mauris eu ut purus a, quam<br>quam. Risus vitae sed eget<br>amet. Laoreet enim interdum<br>mauris, dui est bibendum<br>volutpat. Eget at dolor sagittis<br>faucibus commodo. Arcu<br>quam egestas cras ipsum<br>aliquet aliquet. Est dolor at ",
      1653765395654: "Lorem ipsum dolor sit<br>amet, consectetur<br>adipiscing elit. Mi nunc<br>viverra cursus libero<br>est dictum. Eu, vitae<br>risus, facilisi diam<br>aenean viverra sed<br>ultrices mauris. Purus<br>a, arcu pretium dui sed<br>aenean vestibulu.",
      1653765495554: "Lorem ipsum<br>dolor sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui<br>ornare pharetra<br>vitae urna. Enim",
      1653775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa "}
      
    },
  },
  reducers: {
    reset: (state) => {
      state.value = {
        1: {"color": "3A4036", 1553775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa ",
        1653765395554: "Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit.<br>Placerat tortor faucibus<br>mauris eu ut purus a, quam<br>quam. Risus vitae sed eget<br>amet. Laoreet enim interdum<br>mauris, dui est bibendum<br>volutpat. Eget at dolor sagittis<br>faucibus commodo. Arcu<br>quam egestas cras ipsum<br>aliquet aliquet. Est dolor at ",
        1653765395654: "Lorem ipsum dolor sit<br>amet, consectetur<br>adipiscing elit. Mi nunc<br>viverra cursus libero<br>est dictum. Eu, vitae<br>risus, facilisi diam<br>aenean viverra sed<br>ultrices mauris. Purus<br>a, arcu pretium dui sed<br>aenean vestibulu.",
        1653765495554: "Lorem ipsum<br>dolor sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui<br>ornare pharetra<br>vitae urna. Enim",
        1653775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa "},
        2: {"color": "1A4036", 1553775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa ",
        1653765395554: "Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit.<br>Placerat tortor faucibus<br>mauris eu ut purus a, quam<br>quam. Risus vitae sed eget<br>amet. Laoreet enim interdum<br>mauris, dui est bibendum<br>volutpat. Eget at dolor sagittis<br>faucibus commodo. Arcu<br>quam egestas cras ipsum<br>aliquet aliquet. Est dolor at ",
        1653765395654: "Lorem ipsum dolor sit<br>amet, consectetur<br>adipiscing elit. Mi nunc<br>viverra cursus libero<br>est dictum. Eu, vitae<br>risus, facilisi diam<br>aenean viverra sed<br>ultrices mauris. Purus<br>a, arcu pretium dui sed<br>aenean vestibulu.",
        1653765495554: "Lorem ipsum<br>dolor sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui<br>ornare pharetra<br>vitae urna. Enim",
        1653775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa "},
        5: {"color": "204036", 1553775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa ",
        1653765395554: "Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit.<br>Placerat tortor faucibus<br>mauris eu ut purus a, quam<br>quam. Risus vitae sed eget<br>amet. Laoreet enim interdum<br>mauris, dui est bibendum<br>volutpat. Eget at dolor sagittis<br>faucibus commodo. Arcu<br>quam egestas cras ipsum<br>aliquet aliquet. Est dolor at ",
        1653765395654: "Lorem ipsum dolor sit<br>amet, consectetur<br>adipiscing elit. Mi nunc<br>viverra cursus libero<br>est dictum. Eu, vitae<br>risus, facilisi diam<br>aenean viverra sed<br>ultrices mauris. Purus<br>a, arcu pretium dui sed<br>aenean vestibulu.",
        1653765495554: "Lorem ipsum<br>dolor sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui<br>ornare pharetra<br>vitae urna. Enim",
        1653775495554: "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa "}
        
      }
    },
    addTexts: (state, action) => {
      if(undefined === state.value[action.payload["id"]]){
        state.value[action.payload["id"]] = {}
      }
      state.value[action.payload["id"]][action.payload["key"]] = action.payload["texts"];
    },
  },
});

export const { reset, addTexts } = textsSlice.actions;

export const selectTexts = (state) => state.texts.value;

export default textsSlice.reducer;