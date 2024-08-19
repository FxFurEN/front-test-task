import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { User } from '@/lib/types'
import Link from 'next/link'

type UserCardProps = {
	user: User
}

const UserCard = ({ user }: UserCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{user.name}</CardTitle>
				<CardDescription>Email: {user.email}</CardDescription>
			</CardHeader>
			<CardContent>
				<Link
					href={`/dashboard/user/${user.id}`}
					className='text-blue-500 hover:underline'
				>
					View to-do list
				</Link>
			</CardContent>
		</Card>
	)
}

export default UserCard
