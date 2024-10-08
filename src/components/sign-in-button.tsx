import { CircleUser } from 'lucide-react'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

const SignInButton = async () => {
	const session = await getServerSession(authOptions)
	if (session && session.user)
		return (
			<div className='flex gap-4 ml-auto'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='secondary' size='icon' className='rounded-full'>
							<CircleUser className='h-5 w-5' />
							<span className='sr-only'>Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>{session.user.name}</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href={'/friends'} className='text-blue-600'>
								Friends{' '}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href={'/api/auth/signout'} className='text-red-600'>
								Logout
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		)

	return (
		<div className='flex gap-4 ml-auto items-center'>
			<Button variant='outline'>
				<Link href={'/api/auth/signin'}>Sign In</Link>
			</Button>

			<Button className='flex gap-4 ml-auto bg-black text-white'>
				<Link href={'/api/auth/signup'}>Sign Up</Link>
			</Button>
		</div>
	)
}

export default SignInButton
