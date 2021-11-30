import React, {useState} from 'react'
import './PostCard.scss'
import {Post} from '../type'
import {Utils} from '../../utils/Utils'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from '@material-ui/core'
import {Create, Delete} from '@material-ui/icons'
import {postService} from '../../services/PostService'
import {authenticationService} from '../../services/AuthenticationService'
import {PostDialog} from './PostDialog'

type PostCardType = {
    post: Post
    reload: () => void
}

export const PostCard = ({post, reload}: PostCardType) => {
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false)

    const handleDeleteConfirmationDialogOnOpen = () => {
        setOpenDeleteConfirmationDialog(true)
    }

    const handleDeleteConfirmationDialogOnClose = () => {
        setOpenDeleteConfirmationDialog(false)
    }

    const handleUpdateDialogOnOpen = () => {
        setOpenUpdateDialog(true)
    }

    const handleUpdateDialogOnClose = () => {
        setOpenUpdateDialog(false)
    }

    const deletePost = () => {
        postService.deletePost(post.id!).then(() => {
            alert('Successfully Deleted!')
            handleDeleteConfirmationDialogOnClose()
            reload()
        })
    }

    const DeleteConfirmationDialog = () => (
        <Dialog open={openDeleteConfirmationDialog} onClose={handleDeleteConfirmationDialogOnClose}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>Are you sure you want to delete this post?</DialogContent>
            <DialogActions>
                <Button onClick={deletePost}>Yes</Button>
                <Button onClick={handleDeleteConfirmationDialogOnClose}>No</Button>
            </DialogActions>
        </Dialog>
    )

    return (
        <div className={'post-card'}>
            <div className={'upper-container'}>
                <div className={'post-card-name-container'}>
                    <div className={'user-post-initial'}>{Utils.getInitial(post.user?.first_name!)}</div>
                    <div className={'user-full-name'}>{Utils.createFullName(post.user?.first_name!, post.user?.last_name!)}</div>
                </div>
                {authenticationService.getUserId() === post.user?.id && (
                    <div>
                        <IconButton onClick={handleUpdateDialogOnOpen}><Create /></IconButton>
                        <IconButton onClick={handleDeleteConfirmationDialogOnOpen}><Delete /></IconButton>
                    </div>
                )}
            </div>
            <div>{post.post}</div>
            {openDeleteConfirmationDialog && <DeleteConfirmationDialog />}
            {openUpdateDialog &&
                <PostDialog
                    mode={'update'}
                    open={openUpdateDialog}
                    handleClose={handleUpdateDialogOnClose}
                    post={post}
                    reload={reload}
                />
            }
        </div>
    )
}