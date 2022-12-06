const BIG_USER_NAME_SIZE = 26;

export function isABigUserName(userName: string) {
	return userName && userName?.length >= BIG_USER_NAME_SIZE;
}
