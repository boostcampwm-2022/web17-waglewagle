import { useRouter } from 'next/router';
import { useState } from 'react';
import { ADMIN_PAGE_TAB } from '../../constants/constants';

const UserControl = () => {
	return (
		<>
			<h4>유저 관리</h4>
		</>
	);
};

const KeywordControl = () => {
	return (
		<>
			<h4>키워드 관리</h4>
		</>
	);
};

interface AdminContentProps {
	tab: number;
}

const AdminContent = ({ tab }: AdminContentProps) => {
	if (tab === ADMIN_PAGE_TAB.USER_CONTROL) {
		return <UserControl />;
	}

	if (tab === ADMIN_PAGE_TAB.KEYWORD_CONTROL) {
		return <KeywordControl />;
	}
};

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

const Admin = () => {
	const router = useRouter();
	const { id } = router.query;
	const [tab, setTab] = useState(0);
	const [title, setTitle] = useState('부스트캠프 7기 커뮤니티');
	const [userList, setUserList] = useState([]);
	const [keywordList, setKeywordList] = useState([]);

	const handleClickTab = (tabData: number) => {
		setTab(tabData);
	};

	return (
		<div>
			<aside>
				<h2>{title}</h2>
				<ul>
					<li
						onClick={() => {
							handleClickTab(ADMIN_PAGE_TAB.USER_CONTROL);
						}}
					>
						유저 관리
					</li>
					<li
						onClick={() => {
							handleClickTab(ADMIN_PAGE_TAB.KEYWORD_CONTROL);
						}}
					>
						키워드 관리
					</li>
				</ul>
			</aside>
			<AdminMainLayout title={title} tab={tab}>
				{tab === 0 ? <UserControl /> : <KeywordControl />}
			</AdminMainLayout>
		</div>
	);
};

export default Admin;
