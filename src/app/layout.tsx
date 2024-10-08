import Navbar from '@/components/navbar'
import Providers from '@/components/Providers'
import './globals.css'

export const metadata = {
	title: 'Next-Auth Tutorial',
	description: 'Generated by Sakura Dev',
}

interface Props {
	children: React.ReactNode
}

export default function RootLayout(props: Props) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					<Navbar />
					{props.children}
				</Providers>
			</body>
		</html>
	)
}
