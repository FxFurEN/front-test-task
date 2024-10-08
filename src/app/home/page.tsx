import { fetchCases } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Home from './page.client'

export default async function HomePage() {
	const session = await getServerSession(authOptions)
	const cases = session?.user.id ? await fetchCases(session.user.id) : []

	return <Home userId={session?.user.id} cases={cases} />
}
