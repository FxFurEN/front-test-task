import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserCard from '@/components/user-card'
import { fetchUsers } from '@/lib/db'
import { getServerSession } from 'next-auth'

export const metadata = {
	title: 'Dashboard',
	description: 'User management dashboard',
}

const DashboardPage = async () => {
	const session = await getServerSession(authOptions)

	if (!session?.backendTokens.accessToken) {
		return <div>Error: No access token available</div>
	}

	try {
		const users = await fetchUsers(session.backendTokens.accessToken)

		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
				{users.map(user => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		)
	} catch (error) {
		return <div>Error fetching data: {error.message}</div>
	}
}

export default DashboardPage
