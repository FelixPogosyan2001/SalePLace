import React from 'react';
import { connect } from 'react-redux';
import { currentDialog, deleteDialog } from '../../redux/actions/communication';
import { AppState } from '../../redux/reducers';
import { NotFound } from '../NotFound';
import Dialog from './Dialog';
import Chat from '../Chat';
import { Dialog as D} from '../../additional/interfaces';

interface MapDispatchToProps {
    currentDialog: (dialog: D) => void
    deleteDialog: (url: string) => void
}

interface MapStateToProps {
    dialogs: Array<D>
    id: string
    openedDialog: D | any
}

type DialogsProps = MapDispatchToProps & MapStateToProps

const Dialogs: React.FC<DialogsProps> = (props) => ( 
        <main>
            {
                props.openedDialog ? <Chat /> : !props.dialogs.length ? <NotFound /> : 
                props.dialogs.map(dialog => (
                    <Dialog 
                        key={dialog.url} 
                        id={props.id}
                        current={props.currentDialog}  
                        deleteDialog={props.deleteDialog}
                        {...dialog} />
                ))
            }
        </main>
)

const mapStateToProps = (state: AppState): MapStateToProps => ({
    dialogs : state.dialogs.dialogs,
    id : state.profile._id,
    openedDialog : state.dialogs.currentDialog
});

export default connect(mapStateToProps, { currentDialog, deleteDialog } as MapDispatchToProps)(Dialogs);