'use client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Backend_URL } from '@/lib/Constants'
import Link from 'next/link'
import { useRef } from 'react'
import { toast, Toaster } from 'sonner'

type FormInputs = {
	name: string
	email: string
	password: string
}

const SignupPage = () => {
	const data = useRef<FormInputs>({
		name: '',
		email: '',
		password: '',
	})

	const register = async () => {
		const promise = fetch(Backend_URL + '/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				name: data.current.name,
				email: data.current.email,
				password: data.current.password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(async res => {
			if (!res.ok) {
				const errorText = await res.text()
				throw new Error(errorText)
			}
			const response = await res.json()
			return { name: 'User Registered!', data: response }
		})

		toast.promise(promise, {
			loading: 'Registering...',
			success: data => data.name,
			error: error => `Error: ${error.message}`,
		})
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
			</CardHeader>
			<CardContent>
				<Input
					autoComplete='off'
					name='name'
					placeholder='Name'
					required
					className='mb-5'
					onChange={e => (data.current.name = e.target.value)}
				/>
				<Input
					name='email'
					placeholder='Email'
					required
					className='mb-5'
					onChange={e => (data.current.email = e.target.value)}
				/>
				<Input
					name='password'
					placeholder='Password'
					type='password'
					required
					onChange={e => (data.current.password = e.target.value)}
				/>
			</CardContent>
			<CardFooter>
				<Button className='bg-black text-white mr-5' onClick={register}>
					Submit
				</Button>
				<Link className='' href={'/'}>
					Cancel
				</Link>
			</CardFooter>
			<Toaster />
		</Card>
	)
}

export default SignupPage
