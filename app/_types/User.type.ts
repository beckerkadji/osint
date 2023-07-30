export enum ROLE {
    ROOT = 1,
    ADMIN = 2,
    USER = 3,
    INTERN = 4,
    NOTHING = 0
}

export enum ROLE_HR {
    ROOT = "root",
    ADMIN = "admin",
    USER = "user",
    INTERN = "intern"
}

export enum PERMISSION {
    // User Management
    READ_USER = "read_user",
    ADD_USER = "add_user",
    EDIT_USER = "edit_user",
    DELETE_USER = "delete_user",
    BLOCK_USER = "block_user",
    INVITE_USER = "invite_user",

    // Permission Management
    ADD_PERMISSION = "add_permission",
    REMOVE_PERMISSION = "remove_permission",

    // Role Management
    CHANGE_ROLE = "change_role",

    // Session Management
    READ_SESSION = "read_session",
    LOGOUT_SESSION = "logout_session",

    // Manage Target
    ADD_TARGET = "add_target",
    EDIT_TARGET = "edit_target",
    REMOVE_TARGET = "remove_target",

    // Manage Supplement search information
    ADD_SUP_SEARCH = "add_sup_search"
}

namespace UserType{
    
    export interface createFields {
        firstname : string,
        lastname ?: string,
        username : string,
        email : string,
        role : ROLE,
        blocked_at : Date
    }

    export interface updateFields {
        firstname ?: string,
        lastname ?: string,
        username ?: string,
        password ?: string,
        email ?: string,
        role ?: ROLE,
        blocked_at ?: Date
    }

    export interface givePermissionFields {
        permissions : PERMISSION[]
    }

    export interface searchFields {
        key : string
    }
}

export default UserType