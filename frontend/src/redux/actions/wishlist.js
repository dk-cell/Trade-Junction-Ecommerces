// add to wishlist
export const addToWishlist = (data) => async (dispatch, getState) => {
    dispatch({
      type: "addToWishlist",
      payload: data,
    });
  
    localStorage.setItem("wishlist", JSON.stringify(getState().wishlists.wishlist));
    return data;
  };
  
  // remove from wishlist
  export const removeFromWishlist = (data) => async (dispatch, getState) => {
    dispatch({
      type: "removeFromWishlist",
      payload: data._id,
    });
    localStorage.setItem("wishlist", JSON.stringify(getState().wishlists.wishlist));
    return data;
  };
  