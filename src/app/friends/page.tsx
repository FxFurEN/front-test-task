import { fetchFriends } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import FriendsList from './page.client'

export default async function FriendsPage() {
	const session = await getServerSession(authOptions)
	const friends = session?.user.id
		? await fetchFriends(session.user.id, session.backendTokens.accessToken)
		: []

	return (
		<FriendsList
			userId={session?.user.id}
			friends={friends}
			accessToken={session.backendTokens.accessToken}
		/>
	)
}
