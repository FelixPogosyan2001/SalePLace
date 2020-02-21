import { Actions as ProfileActions } from '../redux/reducers/profile';
import { Actions as ProductsActions } from '../redux/reducers/products'
import { Actions as AuthActions } from '../redux/reducers/auth';
import { Actions as CartActions } from '../redux/reducers/cart';
import { Actions as DialogsActions } from '../redux/reducers/dialogs';
import { Actions as FavActions } from '../redux/reducers/favorites';
import { Actions as RecActions } from '../redux/reducers/recommendations';

export type AppActions = (
    | ProfileActions 
    | ProductsActions 
    | AuthActions 
    | CartActions 
    | DialogsActions 
    | FavActions 
    | RecActions
)