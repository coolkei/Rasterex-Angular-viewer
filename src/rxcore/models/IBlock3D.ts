export interface IBlock3D {
    globalid: string;
    name: string;
    index: number;
    state: boolean;
    level: number;
    position: number;
    selected: boolean;
    children: Array<IBlock3D>;
}