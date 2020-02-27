import { AppActions } from "../../additional/actions";
import {
    ADD_VIEW,
    ADD_VIEW_IN_RECOMMENDATION,
    LIKE_PRODUCT,
    LIKE_PRODUCT_RECOMMENDATION,
    DELETE_LIKE,
    DELETE_LIKE_RECOMMENDATION
} from './products';

export type TLike = typeof LIKE_PRODUCT_RECOMMENDATION | typeof LIKE_PRODUCT
export type TView = typeof ADD_VIEW_IN_RECOMMENDATION | typeof ADD_VIEW
export type TDel = typeof DELETE_LIKE_RECOMMENDATION | typeof DELETE_LIKE

export const toggleLoader = <S, L>(status: S, loader: L): {type: L, payload: S} => ({ type: loader, payload: status });
export const like = (productId: string, actionType: TLike = LIKE_PRODUCT): AppActions => ({ type: actionType, payload: productId });
export const withoutLike = (productId: string, actionType: TDel = DELETE_LIKE): AppActions => ({ type: actionType, payload : productId });
export const incrementView = (views: string, actionType: TView = ADD_VIEW): AppActions => ({ type: actionType, payload: views });