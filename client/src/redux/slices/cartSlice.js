import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    itemCount: 0,
};

// Khôi phục trạng thái giỏ hàng từ localStorage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return initialState;
        }
        const parsedCart = JSON.parse(serializedCart);
        return {
            ...parsedCart,
            items: Array.isArray(parsedCart.items) ? parsedCart.items : [],
        };
    } catch (e) {
        console.error("Could not load cart from localStorage", e);
        return initialState;
    }
};

const saveCartToLocalStorage = (state) => {
    try {
        const serializedCart = JSON.stringify(state);
        localStorage.setItem('cart', serializedCart);
    } catch (e) {
        console.error("Could not save cart to localStorage", e);
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromLocalStorage(),
    reducers: {
        addToCart: (state, action) => {
            state.items = state.items || [];
            const existingProductIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (existingProductIndex >= 0) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                state.items[existingProductIndex].quantity += action.payload.quantity;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm vào mảng items
                state.items.push({ ...action.payload, quantity: action.payload.quantity });
            }

            // Tính lại itemCount bằng cách tính tổng số lượng các sản phẩm trong giỏ hàng
            state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

            // Lưu trạng thái giỏ hàng vào localStorage
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items || [];
            const updatedItems = state.items?.filter(item => item.id !== action.payload.id);
            state.items = updatedItems;

            // Tính lại itemCount sau khi xóa sản phẩm
            state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.itemCount = 0;

            saveCartToLocalStorage(state);
        },
        setAllCart: (state, action) => {
            console.info("===========[] ===========[action.payload] : ", action.payload);
            // state.items = action.payload;
            let items =  action.payload || [];
            state.itemCount = items.reduce((count, item) => count + item.quantity, 0);
        },
    },
});

export const { addToCart, removeFromCart, clearCart, setAllCart } = cartSlice.actions;
export default cartSlice.reducer;
