import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

/*
* create Local storage
* for set User Details & userStatus
*/
const storage = localStorage.getItem('userMovieDetails') !== null ? JSON.parse(localStorage.getItem('userMovieDetails')) : [];
const userExit = localStorage.getItem('userMovieDetails') !== null ? JSON.parse(localStorage.getItem('userExit')) : false;

const initialState = {
    userMovieDetails: storage,
    userExit: userExit,
}

const userDetailsSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

        logIn: (state, action) => {

            const user = action.payload;
            const IsLoggin = state.userMovieDetails.find((i) => (i.user.username === user.username) && (i.user.password === user.password));

            // Check user have acc. or not
            if (IsLoggin) {

                toast.success(`Logging is successfully`);
                IsLoggin.isUser = true;
                state.userExit = IsLoggin.isUser;

                // reset storage
                localStorage.setItem('userExit', JSON.stringify(state.userExit));
                localStorage.setItem('userMovieDetails', JSON.stringify(state.userMovieDetails));

            } else {
                toast.error('user not found');
                state.userExit = false;
            }

        },

        logOut: (state) => {
            const currentUser = state.userMovieDetails.find((i) => i.isUser === true);
            currentUser.isUser = false;
            state.userExit = false;

            // reset storage
            localStorage.setItem('userExit', JSON.stringify(state.userExit));
            localStorage.setItem('userMovieDetails', JSON.stringify(state.userMovieDetails))
        },

        sigIn: (state, action) => {

            const user = action.payload;
            const IsLoggin = state.userMovieDetails.find((i) => (i.user.username === user.username) && (i.user.password === user.password));

            if (IsLoggin) {
                toast.error('User already exit');
            } else {
                toast.success(`SignIn successful, 🙂`);
                state.userMovieDetails.push({
                    user,
                    isUser: false,
                    userOrder: [],
                    total: 0,
                    subTotal: 0
                });
                // set storage
                localStorage.setItem('userMovieDetails', JSON.stringify(state.userMovieDetails))
            }
        },

        calculatePrice: (state, action) => {
            const qu = action.payload;
            let sum = 0;
            const currentUser = state.userMovieDetails.find((i) => i.isUser === true);
            if (currentUser) {
                (sum += Number(Math.ceil(300)) * Number(qu))
            }
            currentUser.subTotal = sum;
            currentUser.total = currentUser.subTotal;
            // reset storage
            localStorage.setItem('userMovieDetails', JSON.stringify(state.userMovieDetails))
        },

        userOrderList: (state, action) => {
            const cartItem = action.payload;
            const currentUser = state.userMovieDetails.find((i) => i.isUser === true);
            if (currentUser) {
                currentUser.userOrder.push(cartItem);
                toast.success('Show Bocket')

            }
            // reset storage
            localStorage.setItem('userMovieDetails', JSON.stringify(state.userMovieDetails));
        },

    }
});

export const {
    sigIn,
    logIn,
    logOut,
    calculatePrice,
    userOrderList,
} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
