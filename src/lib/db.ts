import { Backend_URL } from './Constants'

export type Case = {
	id: string
	name: string
}

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
