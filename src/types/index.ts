export interface Match {
	id: number;
	cupId: number;
	teamAId: number;
	teamBId: number;
	scoreA: null;
	scoreB: null;
	type: string;
	matchDate: string;
	bets: Bet[];
}

export interface Bet {
	id: number;
	userId: number;
	matchId: number;
	scoreA: number;
	scoreB: number;
	canEdit: boolean;
	totalPoints: number;
}

export interface MatchesData {
	matches: Match[];
}

export interface CustomLocals extends App.Locals {
	userId: string;
}
