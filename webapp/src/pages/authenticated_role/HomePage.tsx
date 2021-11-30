import React, {useEffect, useState} from 'react'
import {Button, Container, LinearProgress, TextField} from '@material-ui/core'
import {Post} from '../type'
import {authenticationService} from '../../services/AuthenticationService'
import {postService} from '../../services/PostService'
import './HomePage.scss'
import {PostCard} from './PostCard'
import {Utils} from '../../utils/Utils'
import {PostDialog} from './PostDialog'

export const UserInitial = () => (
    <span className={'user-initial'}>
        {Utils.getInitial(authenticationService.getUserFirstName())}
    </span>
)

export const HomePage = () => {
    const ownerId = authenticationService.getUserId()

    const [publicPosts, setPublicPosts] = useState<Post[]>()

    const [openAddPostDialog, setOpenAddPostDialog] = useState<boolean>(false)

    useEffect(() => {
        reloadData()
    }, [])

    const reloadData = () => {
        postService.getAllPosts(ownerId).then(setPublicPosts)
    }

    const handleAddPostDialogOnOpen = () => {
        setOpenAddPostDialog(true)
    }

    const handleAddPostDialogOnClose = () => {
        setOpenAddPostDialog(false)
    }

    return (
        <Container className={'homepage-container'}>
            <Button onClick={() => authenticationService.logout()}>Logout</Button>
            <div className={'post-container'}>
                <UserInitial />
                <TextField
                    className={'add-post-text'}
                    label={'Add New Post'}
                    variant={'outlined'}
                    disabled
                    onClick={handleAddPostDialogOnOpen}
                />
            </div>
            {publicPosts === undefined && <LinearProgress />}
            {publicPosts !== undefined && publicPosts.length === 0 && (
                <div className={'no-posts-container'}>No Posts Yet</div>
            )}
            {publicPosts !== undefined && publicPosts.length !== 0 && publicPosts.map(post => (
                <PostCard key={post.id} post={post} reload={reloadData} />
            ))}
            {openAddPostDialog &&
                <PostDialog
                    mode={'add'}
                    open={openAddPostDialog}
                    handleClose={handleAddPostDialogOnClose}
                    reload={reloadData}
                />
            }
        </Container>
    )
}