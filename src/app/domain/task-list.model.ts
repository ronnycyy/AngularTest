export interface TaskList {
    id?: string;
    name: string;
    order: number;
    taskIds: string[];
    projectId: string;  //列表都有属于的项目
}