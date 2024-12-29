import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const foodsStore = createSlice({
  name: "foods",
  initialState: {
    foodsList: [],
    activeIndex: 0,
    cartList: [],
  },
  reducers: {
    setFoodsList(state, action) {
      state.foodsList = action.payload;
    },
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
    addCart(state, action) {
      const item = state.cartList.find((item) => item.id === action.payload.id);
      if (item) {
        item.count++;
      } else {
        state.cartList.push(action.payload);
      }
    },
    increCount(state, action) {
      const item = state.cartList.find((item) => item.id === action.payload.id);
      item.count++;
    },
    decreCount(state, action) {
      const item = state.cartList.find((item) => item.id === action.payload.id);
      if (item.count === 1) {
        // 删除item
        state.cartList.splice(state.cartList.indexOf(item), 1);
        return;
      }
      item.count--;
    },
    clearCart(state) {
      state.cartList = [];
    },
  },
});

// 异步获取部分

const {
  setFoodsList,
  changeActiveIndex,
  addCart,
  increCount,
  decreCount,
  clearCart,
} = foodsStore.actions;
const fetchFoodsList = () => {
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get("http://localhost:3004/takeaway");
    dispatch(setFoodsList(res.data));
  };
};

export {
  fetchFoodsList,
  changeActiveIndex,
  addCart,
  increCount,
  decreCount,
  clearCart,
};
const reducer = foodsStore.reducer;

export default reducer;
