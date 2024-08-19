'use client'
import { addFriend, removeFriend } from '@/lib/db'
import React from 'react'
import { Button } from './ui/button'

type FriendActionsProps = {
	userId: string
	friendId: string
	accessToken: string
}

const FriendActions: React.FC<FriendActionsProps> = ({
	userId,
	friendId,
	accessToken,
}) => {
	const handleAddFriend = async (friendId: string) => {
		try {
			await addFriend(userId, friendId, accessToken)
			alert('Friend added successfully!')
		} catch (error) {
			console.error('Failed to add friend:', error)
			alert('Failed to add friend')
		}
	}

	const handleRemoveFriend = async (friendId: string) => {
		try {
			await removeFriend(userId, friendId, accessToken)
			alert('Friend removed successfully!')
		} catch (error) {
			console.error('Failed to remove friend:', error)
			alert('Failed to remove friend')
		}
	}

	return (
		<div className='mt-4 p-2'>
			<Button
				onClick={() => handleAddFriend(friendId)}
				className='mt-2 text-blue-500'
			>
				Add Friend
			</Button>
			<Button
				onClick={() => handleRemoveFriend(friendId)}
				className='mt-2 text-red-500'
			>
				Remove Friend
			</Button>
		</div>
	)
}

export default FriendActions
