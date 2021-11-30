import React, {useState} from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core"
import './PostDialog.scss'
import {UserInitial} from './HomePage'
import {authenticationService} from '../../services/AuthenticationService'
import {Post} from '../type'
import {postService} from '../../services/PostService'

type PostDialogType = {
    mode: 'add' | 'update'
    open: boolean
    handleClose: () => void
    reload: () => void
    post?: Post
}

export const PostDialog = ({mode, open, handleClose, reload, post}: PostDialogType) => {
    const [selectedPrivacyDetails, setSelectedPrivacyDetails] = useState<string>(post?.is_public ? 'public' : 'private')
    const [postContent, setPostContent] = useState<string>(post ? post.post : '')

    const handleSelectedPrivacyDetails = (event: any) => {
        setSelectedPrivacyDetails(event.target.value)
    }

    const handlePostOnChange = (event: any) => {
        setPostContent(event.target.value)
    }

    const addPost = (event: any) => {
        event.preventDefault()

        const data: Post = {
            owner_id: authenticationService.getUserId(),
            post: postContent,
            is_public: selectedPrivacyDetails === 'public'
        }

        if (mode === 'add') {
            postService.addPost(data).then(() => {
                alert('Successfully Posted!')
                handleClose()
                reload()
            })
        } else {
            postService.updatePost(post?.id!, data).then(() => {
                alert('Successfully Updated!')
                handleClose()
                reload()
            })
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={addPost}>
                <DialogTitle>{`${mode === 'add' ? 'Add New' : 'Update'} Post`}</DialogTitle>
                <DialogContent>
                    <div className={'post-info-container'}>
                        <UserInitial />
                        <div className={'name-privacy-container'}>
                            <span className={'user-full-name'}>{authenticationService.getUserFullName()}</span>
                            <Select
                                className={'privacy-select'}
                                value={selectedPrivacyDetails}
                                onChange={handleSelectedPrivacyDetails}
                                variant={'outlined'}
                            >
                                <MenuItem value={'public'}>Public</MenuItem>
                                <MenuItem value={'private'}>Private</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <TextField
                        value={postContent}
                        className={'add-post-text'}
                        placeholder={'Add New Post'}
                        variant={'outlined'}
                        multiline
                        maxRows={5}
                        onChange={handlePostOnChange}
                    />
                </DialogContent>
                <DialogActions>
                    {mode === 'add' ? (
                        <Button type={'submit'}>Post</Button>
                    ) : (
                        <Button type={'submit'}>Update</Button>
                    )}
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}