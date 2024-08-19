'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addFriend, removeFriend } from '@/lib/db'
import { User } from '@/lib/types'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'

type FriendsListProps = {
	userId: string
	friends: User[]
	accessToken: string
}

const FriendsList: React.FC<FriendsListProps> = ({
	userId,
	accessToken,
	friends: initialFriends,
}) => {
	const [friends, setFriends] = useState<User[]>(initialFriends)

	const handleAddFriend = async (friendId: string) => {
		try {
			await addFriend(userId, friendId, accessToken)
			setFriends([...friends, { id: friendId }])
			toast.success('Friend added successfully')
		} catch (error) {
			console.error('Failed to add friend:', error)
			toast.error('Failed to add friend: ' + error.message)
		}
	}

	const handleRemoveFriend = async (friendId: string) => {
		try {
			await removeFriend(userId, friendId, accessToken)
			setFriends(friends.filter(friend => friend.id !== friendId))
			toast.success('Friend removed successfully')
		} catch (error) {
			toast.error('Failed to remove friend: ' + error.message)
		}
	}

	return (
		<div className='m-2 p-4 border rounded shadow'>
			<h2 className='text-lg font-bold mb-4'>Friends</h2>
			<ul className='space-y-2'>
				{friends.length > 0 ? (
					friends.map(friend => (
						<li
							key={friend.id}
							className='flex items-center justify-between p-2 border-b'
						>
							<span>{friend.name}</span>
							<Button
								className='bg-red-600 text-white'
								variant='destructive'
								onClick={() => handleRemoveFriend(friend.id)}
							>
								Remove
							</Button>
						</li>
					))
				) : (
					<p className='p-2 text-slate-500'>No friends available</p>
				)}
			</ul>
			<div className='mt-4'>
				<Input
					type='text'
					placeholder='Enter friend ID'
					className='border p-2 rounded mr-2'
					id='newFriendId'
				/>
				<Button
					className='bg-black text-white'
					onClick={() => {
						const friendId = (
							document.getElementById('newFriendId') as HTMLInputElement
						).value
						if (friendId) handleAddFriend(friendId)
					}}
				>
					Add Friend
				</Button>
			</div>
			<Toaster />
		</div>
	)
}

export default FriendsList
