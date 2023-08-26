
export interface Monitor {
    id: number
    url: string
    name: string
    interval: number
    last_down?: Date
    down_since?: Date
    down: boolean
    recipient: string
    monitor_enabled: boolean
    scheduled: boolean
    user: User
    userId: number
  
}

export interface User {
    id: number
    username: string
    email: string
    password: string
    refresh_token?: String
    monitors: Monitor[]

}