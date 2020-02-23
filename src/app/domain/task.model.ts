export interface Task {
    id?: string;
    desc: string;
    completed: boolean;
    priority: number;
    dueDate?: Date;
    reminder?: Date;
    remark?: string;
    createDate: Date;
    ownerId?: string;  //执行者ID
    participantIds: string[];  //参与者ID
    taskListId: string;  //每个任务一定从属于一个列表
}