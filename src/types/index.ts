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
	GROUP_A = 'GROUP_A',
	GROUP_B = 'GROUP_B'
}

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
