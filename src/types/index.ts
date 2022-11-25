export interface Match {
	matchId: number;
	matchScoreA: number;
	matchScoreB: number;
	matchType: string;
	matchDate: string;
	teamIdA: number;
	teamNameA: string;
	teamTagA: string;
	teamAvatarA: string;
	teamIdB: number;
	teamNameB: string;
	teamTagB: string;
	teamAvatarB: string;
	betId: number;
	betScoreA: number;
	betScoreB: number;
	totalPoints: number;
	canEdit: boolean;
}

export enum Groups {
	GROUP_A = 'Grupo A',
	GROUP_B = 'Grupo B',
	GROUP_C = 'Grupo C',
	GROUP_D = 'Grupo D',
	GROUP_E = 'Grupo E',
	GROUP_F = 'Grupo F',
	GROUP_G = 'Grupo G',
	GROUP_H = 'Grupo H'
}

export type GroupIndex = keyof typeof Groups;

export type MatchesData = { [key: string]: Match[] };

export interface Bet {
	userId: string;
	matchId: number;
	scoreA: number;
	scoreB: number;
	id?: number;
}

export interface CustomLocals extends App.Locals {
	userId: string;
	userName: string;
}
export interface CustomUser {
	name: string;
	googleUserId: string;
	avatar: null;
}

export interface RankingUser {
	userId: number;
	userName: string;
	total: number;
	isMine: boolean;
}

export type PageLoadData<T> = { locals: CustomLocals; response: T };
