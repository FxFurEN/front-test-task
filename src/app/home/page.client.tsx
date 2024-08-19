'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Case, createCase, deleteCase, updateCase } from '@/lib/db'
import { useRef, useState } from 'react'
import { Toaster, toast } from 'sonner'

type HomeProps = {
	userId: string
	cases: Case[]
}

const Home = ({ userId, cases: initialCases }: HomeProps) => {
	const [cases, setCases] = useState<Case[]>(initialCases)
	const newCaseRef = useRef<string>('')

	const handleCreateCase = async () => {
		if (!userId) {
			toast.error('User not authenticated')
			return
		}

		const promise = createCase(newCaseRef.current, userId).then(newCase => {
			setCases([...cases, newCase])
			return { name: 'Task created successfully' }
		})

		toast.promise(promise, {
			loading: 'Creating task...',
			success: data => data.name,
			error: 'Failed to create task',
		})
	}

	const handleDeleteCase = async (id: string) => {
		const promise = deleteCase(id).then(() => {
			setCases(cases.filter(c => c.id !== id))
			return { name: 'Task deleted successfully' }
		})

		toast.promise(promise, {
			loading: 'Deleting task...',
			success: data => data.name,
			error: 'Failed to delete task',
		})
	}

	const handleUpdateCase = async (id: string, name: string) => {
		const promise = updateCase(id, name).then(() => {
			setCases(cases.map(c => (c.id === id ? { ...c, name } : c)))
			return { name: 'Task updated successfully' }
		})

		toast.promise(promise, {
			loading: 'Updating task...',
			success: data => data.name,
			error: 'Failed to update task',
		})
	}

	return (
		<div className='m-2 p-4 border rounded shadow'>
			<div className='text-lg font-bold mb-4'>To-do list</div>
			<div className='flex items-center gap-4 mb-4'>
				<Input
					autoComplete='off'
					name='newCase'
					placeholder='Enter task name'
					onChange={e => (newCaseRef.current = e.target.value)}
				/>
				<Button
					className='flex gap-4 ml-auto bg-black text-white'
					onClick={handleCreateCase}
				>
					Add Task
				</Button>
			</div>
			<div className='space-y-4'>
				{cases.map(c => (
					<div key={c.id} className='flex items-center gap-4'>
						<Input
							type='text'
							defaultValue={c.name}
							onBlur={e => handleUpdateCase(c.id, e.target.value)}
							className='border p-2 rounded'
						/>
						<Button
							className='flex gap-4 ml-auto bg-red-600 text-white'
							variant='destructive'
							onClick={() => handleDeleteCase(c.id)}
						>
							Delete
						</Button>
					</div>
				))}
			</div>
			<Toaster />
		</div>
	)
}

export default Home
