import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import FriendActions from '@/components/friend-actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchUserWithTasks } from '@/lib/db'
import { getServerSession } from 'next-auth'

type Props = {
	params: {
		id: string
	}
}

const ProfilePage = async (props: Props) => {
	const session = await getServerSession(authOptions)

	if (!session?.backendTokens.accessToken) {
		return <div>Error: No access token available</div>
	}
	const userId = session.user.id
	const friendId = props.params.id

	try {
		const { user, tasks } = await fetchUserWithTasks(
			friendId,
			session.backendTokens.accessToken
		)

		return (
			<Card>
				<CardHeader>
					<CardTitle>User Profile</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-2 p-2 gap-2'>
						<p className='p-2 text-slate-400'>Name:</p>
						<p className='p-2 text-slate-950'>{user.name}</p>
						<p className='p-2 text-slate-400'>Email:</p>
						<p className='p-2 text-slate-950'>{user.email}</p>
					</div>
				</CardContent>
				<CardContent>
					<div className='mt-4 p-2'>
						<CardTitle>To-do list</CardTitle>
						<ul>
							{tasks.length > 0 ? (
								tasks.map((task: { id: string; name: string }) => (
									<li key={task.id} className='p-2 border-b'>
										{task.name}
									</li>
								))
							) : (
								<p className='p-2 text-slate-500'>No tasks available</p>
							)}
						</ul>
					</div>
				</CardContent>
				<CardContent>
					<FriendActions
						userId={userId}
						friendId={friendId}
						accessToken={session.backendTokens.accessToken}
					/>
				</CardContent>
			</Card>
		)
	} catch (error) {
		return <div>Error fetching data: {error.message}</div>
	}
}

export default ProfilePage
