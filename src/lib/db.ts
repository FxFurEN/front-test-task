import { Backend_URL } from './Constants'
import { Case, User } from './types'

export const fetchCases = async (authorId: string): Promise<Case[]> => {
	const res = await fetch(`${Backend_URL}/cases?authorId=${authorId}`, {
		method: 'GET',
	})

	if (!res.ok) {
		throw new Error('Failed to fetch cases')
	}

	return res.json()
}

export const createCase = async (
	name: string,
	authorId: string
): Promise<Case> => {
	const res = await fetch(`${Backend_URL}/cases`, {
		method: 'POST',
		body: JSON.stringify({
			name,
			authorId,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok) {
		throw new Error('Failed to create case')
	}

	return res.json()
}

export const deleteCase = async (id: string): Promise<void> => {
	const res = await fetch(`${Backend_URL}/cases/${id}`, {
		method: 'DELETE',
	})

	if (!res.ok) {
		throw new Error('Failed to delete case')
	}
}

export const updateCase = async (id: string, name: string): Promise<void> => {
	const res = await fetch(`${Backend_URL}/cases/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({ name }),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok) {
		throw new Error('Failed to update case')
	}
}

export const fetchUsers = async (accessToken: string): Promise<User[]> => {
	const response = await fetch(`${Backend_URL}/user`, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		throw new Error('Failed to fetch users')
	}

	return response.json()
}

export const fetchUserWithTasks = async (
	userId: string,
	accessToken: string
): Promise<{ user: User; tasks: Case[] }> => {
	const [userResponse, tasksResponse] = await Promise.all([
		fetch(`${Backend_URL}/user/${userId}`, {
			method: 'GET',
			headers: {
				authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		}),
		fetch(`${Backend_URL}/cases?authorId=${userId}`, {
			method: 'GET',
			headers: {
				authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		}),
	])

	if (!userResponse.ok) {
		throw new Error('Failed to fetch user')
	}

	if (!tasksResponse.ok) {
		throw new Error('Failed to fetch user tasks')
	}

	const user = await userResponse.json()
	const tasks = await tasksResponse.json()

	return { user, tasks }
}
