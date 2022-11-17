import { ADMIN_PAGE_TAB } from '../../constants/constants';

interface AdminMainProps {
	title: string;
	tab: number;
	children: React.ReactNode;
}

const AdminMain = ({ title, tab, children }: AdminMainProps) => {
	return (
		<main>
			<header>
				<h3>
					{title} {tab === ADMIN_PAGE_TAB.USER_CONTROL ? '유저' : '키워드'} 관리
				</h3>
			</header>
			<section>{children}</section>
		</main>
	);
};

export default AdminMain;
