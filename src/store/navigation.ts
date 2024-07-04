import { IUser } from "@/api/users/types";
import { createSlice } from "@reduxjs/toolkit";

export interface INavigationState {
	selectedUser: IUser | null;
	showUpdateModal: boolean;
	showDeleteModal: boolean;
}

const initialState: INavigationState = {
	selectedUser: null,
	showUpdateModal: false,
	showDeleteModal: false,
};

export const navigationSlide = createSlice({
	name: "navigation",
	initialState,
	reducers: {
		openUpdateModal: (state, action) => {
			state.selectedUser = action.payload;
			state.showUpdateModal = true;
			state.showDeleteModal = false;
		},
		openDeleteModal: (state, action) => {
			state.selectedUser = action.payload;
			state.showUpdateModal = false;
			state.showDeleteModal = true;
		},
		closeAllModals: (state) => {
			state.selectedUser = null;
			state.showUpdateModal = false;
			state.showDeleteModal = false;
		},
	},
});

export const navigationActions = navigationSlide.actions;
export default navigationSlide.reducer;
