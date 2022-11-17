interface AdminMainLayoutProps {
	title: string;
	tab: number;
	children: React.ReactNode;
}

const AdminMainLayout = ({ title, tab, children }: AdminMainLayoutProps) => {
	return (
		<main>
			<header>
				<h3>
					{title} {tab === 0 ? '유저' : '키워드'} 관리
				</h3>
			</header>
			<section>
				탭 내용
				{children}
			</section>
		</main>
	);
};

export default AdminMainLayout;
