const initialState = {
  appName: [],
};

const CHANGE_APP_NAME = "CHANGE_APP_NAME";
const EMPTY_CART = "EMPTY_CART";

const changeAppNameAction = (appName, type) => {
  return { type: CHANGE_APP_NAME, payload: appName, incrementType: type };
};
const emptyCart = () => {
  return { type: EMPTY_CART };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_APP_NAME: {
      const selectedObj = state.appName?.find(
        (item) => item?.id === action?.payload?.id
      );
      return {
        ...state,
        appName:
          selectedObj && Object.keys(selectedObj).length > 0
            ? selectedObj?.count === 1 && action?.incrementType === "minus"
              ? state?.appName?.filter(
                (item) => item?.id !== selectedObj?.id && item
              )
              : state?.appName?.map((item) =>
                item.id === selectedObj.id
                  ? {
                    ...item,
                    count:
                      action?.incrementType === "minus"
                        ? item.count - 1
                        : item.count + 1,
                  }
                  : item
              )
            : [...state.appName, { ...action.payload, count: 1 }],
      };
    }
    case EMPTY_CART: {
      console.log('herer');
      return {
        ...state,
        appName: []
      };
    }
  }
  return state;
};

export { changeAppNameAction, emptyCart };
export default reducer;
