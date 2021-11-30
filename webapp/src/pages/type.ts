export type DrawerList = {
    name: string
    icon: JSX.Element
    onClick?: () => void
    url: string
    headerTitle: string
}

export type AppUser = {
    id?: number
    first_name: string
    last_name: string
    username: string
    disabled?: boolean
    password?: string
}

export type Post = {
    id?: number
    owner_id?: number
    post: string
    created_at?: string
    is_public: boolean
    user?: AppUser,
}